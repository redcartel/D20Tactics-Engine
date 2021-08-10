using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using UnityEngine;
using UnityEditor;

#if (UNITY_EDITOR) 

/// <summary>
/// A tool used to create a color grading palette.
/// 
/// The generated texture operates in rgb space and is used to map colors to their nearest similar color on the palette.
/// </summary>
public class PaletteBuilder : EditorWindow
{
    [MenuItem("Window/ProPixelizer/Palette Builder")]
    public static void ShowWindow()
    {
        GetWindow(typeof(PaletteBuilder));
    }

    public Texture2D Sample;
    public bool UseSamplePalette = true;
    public Vector3 HSVWeights = new Vector3(3.0f, 2.0f, 1.0f);

    public DitherType Dither = DitherType.None;

    public enum DitherType
    {
        None,
        OrderedDither_2x2,
        OrderedDither_4x4
    }

    public const int DITHER_PATTERN_SIZE = 16;

    public enum ColorMethod
    {
        RGB_Nearest,
        HSV_Nearest,
        HSV_Weighted,
        V_Nearest
    }

    public ColorMethod Method = ColorMethod.HSV_Weighted;

    void OnGUI()
    {
        //GUILayout.Label("TextureIndexer", EditorStyles.largeLabel);
        EditorGUILayout.LabelField("ProPixelizer | Palette Builder", EditorStyles.boldLabel);
        EditorGUILayout.LabelField("This tool generates look-up-textures (LUTs) used for color grading in ProPixelizer.");
        EditorGUILayout.LabelField("");
        Sample = EditorGUILayout.ObjectField("Sample palette", Sample, typeof(Texture2D), false) as Texture2D;
        UseSamplePalette = EditorGUILayout.Toggle("Use palette?", UseSamplePalette);
        Method = (ColorMethod)EditorGUILayout.EnumPopup("Method", Method);
        HSVWeights = EditorGUILayout.Vector3Field("HSV Weights", HSVWeights);
        Dither = (DitherType)EditorGUILayout.EnumPopup("Dither Pattern", Dither);
        if (Sample != null && Sample.width * Sample.height > MAX_SAMPLE_SIZE)
            EditorGUILayout.HelpBox(string.Format("Sample palette has resolution of {0}x{1}, corresponding to {2} pixel values. Palette generation will be slow! It is recommended to use a smaller texture resolution.", Sample.width, Sample.height, Sample.width * Sample.height), MessageType.Warning);
        if (Sample != null && !Sample.isReadable)
            EditorGUILayout.HelpBox("Sample palette texture not marked as readable. Please tick the 'Read/Write Enabled' box in the inspector.", MessageType.Error);
        if (GUILayout.Button("Generate", EditorStyles.miniButton))
        {
            Generate();
        }
    }

    public const int RESOLUTION = 16;
    public const int MAX_SAMPLE_SIZE = 128*128;

    void Generate()
    {
        palette = new IndexedColorPalette(Sample);

        Texture2D generated = new Texture2D(RESOLUTION * RESOLUTION, RESOLUTION * DITHER_PATTERN_SIZE);

        //Make texture pixels readable if they are not already.
        TextureImporter ti = AssetImporter.GetAtPath(AssetDatabase.GetAssetPath(Sample)) as TextureImporter;
        bool isReadable = ti.isReadable;
        ti.isReadable = true;
        ti.SaveAndReimport();
        
        Color[] gPixels = generated.GetPixels(); //pixel array to generate

        Debug.Log("Generating palette texture.");
        for (int ditherOrder = 0; ditherOrder < DITHER_PATTERN_SIZE; ditherOrder++)
        {
            for (int b = 0; b < RESOLUTION; b++)
            {
                Debug.Log(string.Format("Generating dither order {0}, band {1}...", ditherOrder, b));
                int offset = b * RESOLUTION;
                for (int r = 0; r < RESOLUTION; r++)
                    for (int g = 0; g < RESOLUTION; g++)
                    {
                        int u = r + offset;
                        int v = g;
                        int index = u + v * RESOLUTION * RESOLUTION + ditherOrder * RESOLUTION * RESOLUTION * RESOLUTION;
                        var originalColor = new Color((float)r / RESOLUTION, (float)g / RESOLUTION, (float)b / RESOLUTION, 1.0f);

                        if (!UseSamplePalette)
                        {
                            // If not using palette, just return original color
                            gPixels[index] = originalColor;
                            continue;
                        }

                        // Get the first and second closest colors. 
                        gPixels[index] = palette.Match(originalColor, Method, HSVWeights, Dither, ditherOrder);
                            
                    }
            }
        }
        generated.SetPixels(gPixels);

        //Set texture importer back to original setting
        if (!isReadable)
        {
            ti.isReadable = false;
            ti.SaveAndReimport();
        }

        SaveGeneratedTexture(Sample, generated);
    }

    public string GetPathForGeneratedAsset(Texture2D originalDiffuse)
    {
        string path = AssetDatabase.GetAssetPath(originalDiffuse);
        path = path.Substring(0, path.LastIndexOf('.'));
        return string.Concat(path, DitherPatternToString(Dither), "_lookup.png");
    }

    public string DitherPatternToString(DitherType pattern)
    {
        switch (pattern)
        {
            default:
                return "";
            case DitherType.OrderedDither_2x2:
                return "_dither2x2";
            case DitherType.OrderedDither_4x4:
                return "_dither4x4";
        }
    }

    public void SaveGeneratedTexture(Texture2D diffuse, Texture2D generated)
    {
        string path = GetPathForGeneratedAsset(diffuse);
        File.WriteAllBytes(path, generated.EncodeToPNG());

        //Create assets for these textures
        AssetDatabase.ImportAsset(path, ImportAssetOptions.ForceUpdate);

        //Configure generated texture asset
        TextureImporter ti = AssetImporter.GetAtPath(path) as TextureImporter;
        ti.mipmapEnabled = false;
        ti.filterMode = FilterMode.Point;
        ti.wrapMode = TextureWrapMode.Clamp;
        ti.textureCompression = TextureImporterCompression.Uncompressed;
        AssetDatabase.SetLabels(ti, new string[] { "Palette" });

        EditorUtility.SetDirty(ti);
        ti.SaveAndReimport();
    }

    #region Palette

    private IndexedColorPalette palette;

    /// <summary>
    /// Represents an indexed color palette
    /// </summary>
    public class IndexedColorPalette
    {
        public IndexedColorPalette(Texture2D paletteTexture)
        {
            if (paletteTexture == null)
                throw new ArgumentException("paletteTexture is null");
            _Colors = new List<Color>();
            _Colors.AddRange(paletteTexture.GetPixels());
            _Colors = new List<Color>(_Colors.Distinct());
        }

        private List<Color> _Colors;

        /// <summary>
        /// Gets the color in the palette that most closely resembles the input color.
        /// </summary>
        public Color GetMostSimilar(Color input, ColorMethod method, Vector3 weights)
        {
            //Find color in palette that is nearest
            return _Colors.Distinct().OrderBy(c => Dissimilarity(input, c, method, weights)).First();
        }

        /// <summary>
        /// Gets the color in the palette that second-most closely resembles the input color.
        /// </summary>
        public Color GetSecondMostSimilar(Color input, ColorMethod method, Vector3 weights)
        {
            return _Colors.Distinct().OrderBy(c => Dissimilarity(input, c, method, weights)).Skip(1).First();
        }

        public Color Match(Color input, ColorMethod method, Vector3 weights, DitherType pattern, int ditherOrder)
        {
            var closest = GetMostSimilar(input, method, weights);
            var secondClosest = GetSecondMostSimilar(input, method, weights);

            // Given two colors, find a way to consistently label them 'A' and 'B'.
            var closestAsA = (closest.r + closest.g + closest.b) < (secondClosest.r + secondClosest.g + secondClosest.b);
            var cA = closestAsA ? closest : secondClosest;
            var cB = closestAsA ? secondClosest : closest;

            if (pattern == DitherType.None)
                return closest;

            // Find which dither fraction works best.
            float bestScore = float.PositiveInfinity;
            float bestFraction = 0.0f;
            for (int i = 0; i < 16; i++)
            {
                float fraction = i / 15.0f;
                var newColor = Color.Lerp(cA, cB, fraction);
                float score = Mathf.Abs(Dissimilarity(input, newColor, method, weights));
                if (score < bestScore)
                {
                    bestFraction = fraction;
                    bestScore = score;
                }
            }

            return Dithered(pattern, cA, cB, ditherOrder, bestFraction);
        }

        public Color Dithered(DitherType pattern, Color A, Color B, int order, float fraction)
        {
            if (pattern == DitherType.None)
                return fraction < 0.5 ? A : B;

            var thresholds = GetDitherPattern(pattern);

            if (thresholds[order] < fraction)
                return B;
            else
                return A;
        }

        public float[] GetDitherPattern(DitherType pattern)
        {
            switch (pattern)
            {
                default: return new float[0];
                case DitherType.OrderedDither_2x2:
                    return new float[16]
                    {
                        1.0f / 5.0f, 4.0f / 5.0f, 1.0f / 5.0f, 4.0f / 5.0f,
                        3.0f / 5.0f, 2.0f / 5.0f, 3.0f / 5.0f, 2.0f / 5.0f,
                        1.0f / 5.0f, 4.0f / 5.0f, 1.0f / 5.0f, 4.0f / 5.0f,
                        3.0f / 5.0f, 2.0f / 5.0f, 3.0f / 5.0f, 2.0f / 5.0f
                    };
                case DitherType.OrderedDither_4x4:
                    return new float[16]     {
                        1.0f / 17.0f,  9.0f / 17.0f,  3.0f / 17.0f, 11.0f / 17.0f,
                        13.0f / 17.0f,  5.0f / 17.0f, 15.0f / 17.0f,  7.0f / 17.0f,
                        4.0f / 17.0f, 12.0f / 17.0f,  2.0f / 17.0f, 10.0f / 17.0f,
                        16.0f / 17.0f,  8.0f / 17.0f, 14.0f / 17.0f,  6.0f / 17.0f
                    };
            }
        }

        /// <summary>
        /// Gets the dissimilarity between two colors, given the specified methods and weights.
        /// </summary>
        public float Dissimilarity(Color a, Color b, ColorMethod method, Vector3 weights)
        {
            float hue_a, sat_a, val_a, hue_b, sat_b, val_b;
            Color.RGBToHSV(a, out hue_a, out sat_a, out val_a);
            Color.RGBToHSV(b, out hue_b, out sat_b, out val_b);

            float hueDiff = Math.Abs(hue_a - hue_b);
            //hue wraps in range [0,1], therefore difference in range [0,0.5]
            hueDiff = hueDiff > 0.5 ? 1 - hueDiff : hueDiff;

            float bright_a = (float)(a.r * 0.3 + a.g * 0.59 + a.b * 0.11);
            float bright_b = (float)(b.r * 0.3 + b.g * 0.59 + b.b * 0.11);

            // Weight hue, sat, brightness
            switch (method) {
                case ColorMethod.HSV_Nearest:
                    return (Mathf.Pow(hueDiff, 2f) + Mathf.Pow(bright_a - bright_b, 2f) + Mathf.Pow(sat_a - sat_b, 2f));
                case ColorMethod.HSV_Weighted:
                    return weights.x * hueDiff + weights.y * Mathf.Abs(bright_a - bright_b) + weights.z * Mathf.Abs(sat_a - sat_b);
                case ColorMethod.RGB_Nearest:
                    return (new Vector3(a.r, a.g, a.b) - new Vector3(b.r, b.g, b.b)).sqrMagnitude;
                case ColorMethod.V_Nearest:
                    return Mathf.Abs(bright_a - bright_b);
                default:
                    return 0f;
            }
        }
    }

    //Useful article:
    // https://stackoverflow.com/questions/27374550/how-to-compare-color-object-and-get-closest-color-in-an-color

    #endregion Palette
}

#endif
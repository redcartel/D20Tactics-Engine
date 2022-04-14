using System.Collections;
using System.Collections.Generic;
using System.IO;
using System;
using UnityEngine;

// repository of visual and audio elements
public class AssetLibrary : MonoBehaviour
{
    public static AssetLibrary inst;

    private void Start()
    {
        inst = this;
        AddBlockTexture("textures/__default__", defaultTexture);
        AddSprite("sprites/__default__", defaultSprite);
        AddVoxelDefinition("voxels/__default__", new string[] { "textures/__default__" });
    }

    //public struct HighlightKey
    //{
    //    public string name;
    //    public Color32 color;
    //}

    public Material basePixelMaterial;
    public Material baseOutlineMaterial;
    public Material baseNoOutlineMaterial;
    public Material baseSpriteMaterial;
    public Material baseDecalMaterial;
    public Material baseLitDecalMaterial;
    public Material baseHighlightMaterial;
    public Texture2D defaultTexture;
    public Sprite defaultSprite;
    public AudioLoader audioLoaderPrefab;

    public Dictionary<string, Texture2D> textures = new Dictionary<string, Texture2D>();
    public Dictionary<string, Sprite> sprites = new Dictionary<string, Sprite>();
    public Dictionary<string, Material> materials = new Dictionary<string, Material>();
    public Dictionary<string, Material> highlights = new Dictionary<string, Material>();
    public Dictionary<string, AudioClip> sounds = new Dictionary<string, AudioClip>();
    public Dictionary<string, bool> awaitingSounds = new Dictionary<string, bool>();
    public Dictionary<string, AnimationGroup> animationGroups = new Dictionary<string, AnimationGroup>();

    public Dictionary<string, VoxelDefinition> voxelDefinitions = new Dictionary<string, VoxelDefinition>();

    public Dictionary<string, SimpleAnimation> animations = new Dictionary<string, SimpleAnimation>();

    public void CreateSpriteFromSheet(string name, Texture2D texture, Vector2Int? pivot = null, Rect? rect = null)
    {
        Vector2 _pivot;
        Rect _rect;
        // TODO: make default pivot always on a whole pixel
        if (pivot == null) _pivot = new Vector2(0.5f, 0);
        else _pivot = new Vector2(((Vector2)pivot).x / ((Rect)rect).width, ((Rect)rect).height - ((Vector2)pivot).y / ((Rect)rect).height);
        if (rect == null) _rect = new Rect(0, 0, texture.width, texture.height);
        else _rect = (Rect)rect;
        var newSprite = Sprite.Create(texture, _rect, _pivot, 32f);
        textures[name] = texture;
        sprites[name] = newSprite;
    }

    public void CreateAnimation(string name, bool loop = true)
    {
        GameObject gameObject = new GameObject("anm_" + name);
        gameObject.transform.parent = this.transform;
        SimpleAnimation newAnimation = gameObject.AddComponent<SimpleAnimation>();
        animations[name] = newAnimation;
        newAnimation.loop = loop;
    }

    public void CreateAnimationGroup(string name)
    {
        GameObject gameObject = new GameObject("anmg_" + name);
        gameObject.transform.parent = this.transform;
        AnimationGroup animationGroup = gameObject.AddComponent<AnimationGroup>();
        animationGroups[name] = animationGroup;
    }

    // TODO: Optimize with RawImage
    public void AddBlockTexture(string name, Texture2D texture)
    {
        Material newMat = Instantiate(basePixelMaterial);
        Material highlightMat = Instantiate(baseHighlightMaterial);
        newMat.SetTexture("Texture2D_FBC26130", texture);
        highlightMat.SetTexture("Texture2D_9A2EA9A0", texture);
        highlightMat.SetFloat("USE_EMISSION", 1024);
        textures[name] = texture;
        materials[name] = newMat;
        highlights[name] = highlightMat;
    }

    public void AddSprite(string name, Texture2D texture, Rect? sheetRect)
    {
        if (sheetRect == null) sheetRect = new Rect(0, 0, texture.width, texture.height);
        var newSprite = Sprite.Create(texture, (Rect)sheetRect, new Vector2(0.5f, 0), 64f);
        texture.filterMode = FilterMode.Point;
        textures[name] = texture;
        sprites[name] = newSprite;
    }

    public void AddSprite(string name, Sprite sprite)
    {
        textures[name] = sprite.texture;
        sprites[name] = sprite;
    }

    public void AddFlatTexture(string name, Texture2D texture, bool lit = false)
    {
        texture.filterMode = FilterMode.Point;
        textures[name] = texture;
        Material pixelMaterial;
        if (lit)
        {
            pixelMaterial = Instantiate(baseLitDecalMaterial);
            pixelMaterial.SetTexture("Texture2D_FBC26130", texture);
            pixelMaterial.SetTexture("Texture2D_9A2EA9A0", texture);
        }
        else
        {
            pixelMaterial = Instantiate(baseDecalMaterial);
            pixelMaterial.SetTexture("Texture2D_FBC26130", texture);
        }
        materials[name] = pixelMaterial;
    }

    public void AddVoxelDefinition(string name, string[] faceMaterials, string outlineMaterial = null)
    {
        // TODO: not using outline definition yet
        if (outlineMaterial == null) outlineMaterial = "__default_outline__";
        VoxelDefinition voxDef = new VoxelDefinition(faceMaterials, outlineMaterial);
        voxelDefinitions[name] = voxDef;
        voxDef.name = name;
    }

    // AddAlphaTexture

    // AddAudioClip

    public Texture2D LoadTexture(string path)
    {
        var fileData = File.ReadAllBytes(path);
        var tex = new Texture2D(2, 2, TextureFormat.ARGB32, false);
        tex.filterMode = FilterMode.Point;
        tex.LoadImage(fileData);
        return tex;
    }

    public void LoadAudio(string name, string path)
    {
        try
        {
            AudioLoader loader = Instantiate(audioLoaderPrefab, this.transform);
            loader.LoadAudio(name, path);
        }
        catch (Exception e)
        {
            Debug.LogError("Exception in LoadAudio: " + e.Message);
            Debug.Log(name + " : " + path);
        }
    }

    //public AudioImporter importer;

    //public AudioClip LoadAudio(string path)
    //{
    //    GameObject 
    //    //var array = File.ReadAllBytes(path);
    //    //float[] floatArr = new float[array.Length / 4];
    //    //for (int i = 0; i < floatArr.Length; i++)
    //    //{
    //    //    if (BitConverter.IsLittleEndian)
    //    //        Array.Reverse(array, i * 4, 4);
    //    //    floatArr[i] = BitConverter.ToSingle(array, i * 4) / 0x80000000;
    //    //}

    //    //AudioClip audioClip = AudioClip.Create(path, floatArr.Length, 1, 44100, false);
    //    //audioClip.SetData(floatArr, 0);
    //    //return audioClip;
    //}

    //public void AddAudio(string name, AudioClip clip)
    //{
    //    sounds[name] = clip;
    //}
}
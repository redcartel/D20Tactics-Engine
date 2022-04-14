using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using System.IO;
using System;

public class Interop : MonoBehaviour
{
    public static Interop inst;
    public TMP_Text outputTextMesh;
    // Start is called before the first frame update
    void Start()
    {
        inst = this;
    }

    public int screenWidth()
    {
        return Screen.width;
    }

    public int screenHeight()
    {
        return Screen.height;
    }


    public void dummy(string arg = null)
    {

    }

    // Update is called once per frame
    public void print(string line)
    {
        outputTextMesh.text += "\n" + line;
    }

    public void log(string line)
    {
        Debug.Log(line);
        outputTextMesh.text += "\n" + line;
    }

    public void error(string line)
    {
        // TODO: Red text
        Debug.LogError(line);
        outputTextMesh.text += "\nERR:" + line;
    }

    // FIXME
    public void loadMod(string path)
    {
        ScriptEngine.inst.LoadModAtPath(path);
    }

    /**
     * getPathInMod
     * 
     * Produce a file system path from a base mod directory and a local path
     * modPath is usually provided by window.modPath in a script.
     * 
     * TODO: Test & support Windows paths
     */
    public string getPathInMod(string modPath, string localPath = "")
    {
        try
        {
            var parts = new List<string>(localPath.Split('/'));
            parts.Insert(0, modPath);
            return Path.Combine(parts.ToArray());
        }
        catch (Exception ex)
        {
            Interop.inst.error("getPathInMod failed " + ex.Message);
            throw ex;
        }
    }

    // TODO:
    public void changeScene(string name)
    {
        Director.inst.SetCurrentScene(name);
    }

    public void newScene(string name, bool activate = true, bool destroyOld = false)
    {
        Director.inst.NewScene(name, activate, destroyOld);
    }

    public void destroyScene(string name)
    {
        Director.inst.DestroyScene(name);
    }

    public void destroyAllScenes()
    {
        Director.inst.DestroyAllScenes();
    }

    public string getCurrentSceneName()
    {
        return Director.inst.currentScene.gameObject.name;
    }

    /**
     * loadBlockTexture
     * 
     * Load a texture for a Voxel face
     */
    public void loadBlockTexture(string name, string modPath, string localPath)
    {
        var path = getPathInMod(modPath, localPath);
        try
        {
            Texture2D newTex = AssetLibrary.inst.LoadTexture(path);
            AssetLibrary.inst.AddBlockTexture(name, newTex);
        }
        catch (Exception e)
        {
            Debug.LogError("Error in loadBlockTexture:" + e.Message);
            Debug.Log(name);
        }
    }

    /**
     * loadFlatTexture
     * 
     * Load a texture and create a material for a flat image
     */
    public void loadFlatTexture(string name, string modPath, string localPath, bool lit = false)
    {
        var path = getPathInMod(modPath, localPath);
        try
        {
            Texture2D newTex = AssetLibrary.inst.LoadTexture(path);
            AssetLibrary.inst.AddFlatTexture(name, newTex, lit);
        }
        catch (Exception e)
        {
            Debug.LogError("Error in loadFlatTexture:" + e.Message);
            Debug.Log(name);
        }
    }

    /**
     * loadSprite
     * 
     * loads a sprite from an image path.
     * pivot is a two element int array, specifying the pixel offset (relative to the sprite rectangle)
     *  of the image's pivot.
     * rect is a four element int array, specifying the rect coordinates of a sprite on its sheet
     */
    public void loadSprite(string name, string modPath, string localPath, int[] pivot = null, int[] rect = null)
    {
        try
        {
            Vector2Int? _pivot = null;
            Rect? _rect = null;
            if (pivot != null) _pivot = new Vector2Int(pivot[0], pivot[1]);
            if (rect != null) _rect = new Rect(rect[0], rect[1], rect[2], rect[3]);
            var path = getPathInMod(modPath, localPath);
            AssetLibrary.inst.CreateSpriteFromSheet(name, AssetLibrary.inst.LoadTexture(path), _pivot, _rect);
        }
        catch (Exception e)
        {
            Debug.LogError("Error in loadSprite:" + e.Message);
            Debug.Log(name);
        }
    }

    /**
     * loadSound
     * 
     * Loads an AudioClip
     */
    public void loadSound(string name, string modPath, string localPath)
    {
        var path = getPathInMod(modPath, localPath);
        AssetLibrary.inst.LoadAudio(name, path);
    }

    /**
     * create a new Character GameObject, indexed by a name and set scaling (default 1.0, 1.0)
     */
    public void createCharacter(string name, string spriteName = "", float[] scale = null, bool revealsMap = true)
    {
        float scaleX;
        float scaleY;
        if (scale == null)
        {
            scaleX = 1.0f;
            scaleY = 1.0f;
        }
        else
        {
            scaleX = scale[0];
            scaleY = scale[1];
        }
        try
        {
            Director.inst.currentScene.castController.CreateCharacter(name, new Vector2(scaleX, scaleY), revealsMap);
            if (revealsMap)
            {
                Director.inst.currentScene.castController.dict[name].isVisible = true;
            }
            if (spriteName != null && spriteName != "")
            {
                setCharSprite(name, spriteName);
            }
        }
        catch (Exception e)
        {
            Debug.LogError("Error in createCharacter:" + e.Message);
            Debug.Log(name + ", spriteName: " + spriteName);
        }
    }

    public void destroyCharacter(string name)
    {
        Director.inst.currentScene.castController.DestroyCharacter(name);
        Debug.Log($"destroyed ${name}");
    }

    public void setCharacterVisible(string name, bool visible)
    {
        Director.inst.currentScene.castController.dict[name].isVisible = visible;
    }

    public void setCharacterWorldCoords(string name, int[] coords)
    {
        Director.inst.currentScene.castController.dict[name].worldCoordinates = new Vector3Int(coords[0], coords[1], coords[2]);
    }

    /**
     * setCharSprite
     * 
     * sets a character's current still sprite. overridden by animations.
     */
    public void setCharSprite(string name, string spriteName)
    {
        Director.inst.currentScene.castController.SetCharacterSprite(name, AssetLibrary.inst.sprites[spriteName]);
    }

    /**
     * placeCharacer
     * 
     * places a character on the map.
     */
    public void placeCharacter(string name, int[] position, float[] offset = null)
    {
        if (offset == null) offset = new float[] { 0, 0, 0 };
        Director.inst.currentScene.castController.PositionCharacterOnMap(name, new Vector3Int(position[0], position[1], position[2]), new Vector3(offset[0], offset[1], offset[2]));
        
    }

    public void setCharacterFacing(string name, int facing)
    {
        Director.inst.currentScene.castController.setCharacterFacing(name, facing);
    }

    /**
     * createAnimation
     * 
     * initialize an animation sequence & set whether or not it is a loop
     */
    public void createAnimation(string name, bool loop = true)
    {
        AssetLibrary.inst.CreateAnimation(name, loop);
    }

    public void createAnimationGroup(string name)
    {
        AssetLibrary.inst.CreateAnimationGroup(name);
    }

    public void setGroupAnimations(string name, string[] animations)
    {
        if (animations.Length > 0 && animations[0] != null)
        {
            AssetLibrary.inst.animationGroups[name].upLeft = AssetLibrary.inst.animations[animations[0]];
        }
        if (animations.Length > 1 && animations[1] != null)
        {
            AssetLibrary.inst.animationGroups[name].upRight = AssetLibrary.inst.animations[animations[1]];
        }
        if (animations.Length > 2 && animations[2] != null)
        {
            AssetLibrary.inst.animationGroups[name].downRight = AssetLibrary.inst.animations[animations[2]];
        }
        if (animations.Length > 3 && animations[3] != null)
        {
            AssetLibrary.inst.animationGroups[name].downLeft = AssetLibrary.inst.animations[animations[3]];
        }
    }

    public void setCharacterAnimationGroup(string name, string groupName, bool? resetAnimations = null)
    {
        var character = Director.inst.currentScene.castController.dict[name];
        var animGroup = AssetLibrary.inst.animationGroups[groupName];
        if (animGroup.getAnimation(-1, 0).loop == true && resetAnimations == null)
        {
            resetAnimations = false;
        }
        else if (animGroup.getAnimation(-1, 0).loop == false && resetAnimations == null)
        {
            resetAnimations = true;
        }
        Director.inst.currentScene.castController.dict[name].animationGroup = AssetLibrary.inst.animationGroups[groupName];
        if ((bool)resetAnimations)
        {
            Director.inst.currentScene.castController.dict[name].resetCurrentAnimation = true;
        }
    }

    /**
     * addFrame
     * 
     * add a sprite frame to an animation sequence
     */
    public void addFrame(string name, string spriteName, int? ticks = null, bool? flip = null, float[] spacePosition = null)
    {
        Vector3? offset;
        if (spacePosition == null) offset = null;
        else offset = new Vector3((float)spacePosition[0], (float)spacePosition[1], (float)spacePosition[2]);
        AssetLibrary.inst.animations[name].AddFrame(AssetLibrary.inst.sprites[spriteName], ticks, flip, offset);
    }

    ///**
    // * attachAnimation
    // * 
    // * begin animating a Character
    // */
    //public void attachAnimation(string charName, string animationName)
    //{
    //    if (!Director.inst.currentScene.castController.dict.ContainsKey(charName)) throw new Exception("" + charName + " not found in castController");
    //    if (!AssetLibrary.inst.animations.ContainsKey(animationName)) throw new Exception("" + animationName + " not found in AssetLibrary");
    //    Director.inst.currentScene.castController.dict[charName].AttachAnimation(AssetLibrary.inst.animations[animationName]);
    //}

    ///**
    // * detachAnimation
    // * 
    // * stop animating a character
    // */
    //public void detachAnimation(string charName)
    //{
    //    Director.inst.currentScene.castController.dict[charName].DetachAnimation();
    //}

    public void createPath(string name = null)
    {
        if (name == null) name = "__default__";
        Director.inst.currentScene.castController.DeletePath(name);
        Director.inst.currentScene.castController.CreatePathHead(name);
    }

    public void addPathNode(string name, float[] spacePosition, int ticks = 15, string animationGroupName = null, float? sinMult = null)
    {
        if (name == null) name = "__default__";
        AnimationGroup animationGroup = null;
        if (animationGroupName != null) animationGroup = AssetLibrary.inst.animationGroups[animationGroupName];
        Debug.Log(animationGroup);
        // DON'T NEED OFFSET ANYMORE, HANDLED WITH PIVOT
        Director.inst.currentScene.castController.AddPathNode(name, new Vector3(spacePosition[0], spacePosition[1], spacePosition[2]), animationGroup, ticks, sinMult);
    }

    public void addScriptedPathNode(string name, string script, float[] spacePosition, int ticks = 15, string animationGroupName = null, float? sinMult = null)
    {
        if (name == null) name = "__default__";
        AnimationGroup animationGroup = null;
        if (animationGroupName != null) animationGroup = AssetLibrary.inst.animationGroups[animationGroupName];
        Director.inst.currentScene.castController.AddPathNode(name, new Vector3(spacePosition[0], spacePosition[1], spacePosition[2]), animationGroup, ticks, sinMult, script);
    }
    public void attachPath(string charName, string pathName = null)
    {
        if (pathName == null) pathName = "__default__";
        Director.inst.currentScene.castController.AttachPath(charName, pathName);
    }

    public void deletePath(string pathName = null)
    {
        if (pathName == null) pathName = "__default__";
        Director.inst.currentScene.castController.DeletePath(pathName);
    }

    public void delayedEval(float seconds, string script)
    {
        ScriptEngine.inst.DelayedCall(seconds, script);
    }

    public void createDialog(string name = null, string text = null, string portrait = null, bool rightSide = false)
    {
        int spot = 0;
        try
        {
            if (name == null) name = "__default__";
            Director.inst.currentScene.dialogController.CreateDialog(name, text);
        }
        catch (Exception e)
        {
            Debug.LogError("Error in createDialog:" + e.Message);
            Debug.Log($"{name} {text}");
        }
    }

    public void destroyDialog(string name = null)
    {
        if (name == null) name = "__default__";
        Director.inst.currentScene.dialogController.DestroyDialog(name);
    }

    // TODO: Position relative to screen size
    public void placeDialog(string name, int[] position = null, int[] size = null)
    {
        int x = 500;
        int y = 500;
        int w = 300;
        int h = 180;
        if (position != null)
        {
            x = position[0];
            y = position[1];
        }
        if (size != null)
        {
            w = size[0];
            h = size[1];
        }
        if (name == null) name = "__default__";
        Director.inst.currentScene.dialogController.dict[name].SetPosition(x, y);
        Director.inst.currentScene.dialogController.dict[name].SetSize(w, h);
    }

    public void setDialogText(string name, string text, float? seconds = null)
    {
        if (name == null) name = "__default__";
        if (seconds == null)
        {
            Director.inst.currentScene.dialogController.dict[name].SetText(text);
        }
        else
        {
            Director.inst.currentScene.dialogController.dict[name].SpellOut(text, (float)seconds);
        }
    }

    public void addButtonToDialog(string name, string text, int[] position, int[] size, string script = "")
    {
        int x = 32;
        int y = 16;
        int w = 100;
        int h = 32;
        if (position != null)
        {
            x = position[0];
            y = position[1];
        }
        if (size != null)
        {
            w = size[0];
            h = size[1];
        }
        if (name == null) name = "__default__";
        Director.inst.currentScene.dialogController.AddButtonToDialog(name, text, new Vector2(x, y), new Vector2(w, h), script);
    }

    public void createUIImage(string name, string spriteName)
    {
        Director.inst.currentScene.dialogController.CreateUIImage(name, AssetLibrary.inst.sprites[spriteName]);
    }

    public void placeUIImage(string name, int[] rect)
    {
        Director.inst.currentScene.dialogController.PlaceUIImage(name, new Rect(rect[0], rect[1], rect[2], rect[3]));
    }

    public void destroyUIImage(string name)
    {
        Director.inst.currentScene.dialogController.DestroyImage(name);
    }

    /**
     * defineVoxel
     * 
     * faceMaterials : 1 (all sides the same), 2 (top and sides), or 5 (top and each side) texture names
     *      from loadBlockTexture
     * borderMaterial : leave null for now. TODO
     * ebb : define shorter than average voxel TODO
     */
    public void defineVoxel(string name, string[] faceMaterials, string borderMaterial = null, float ebb = 1.0f)
    {
        try
        {
            AssetLibrary.inst.AddVoxelDefinition(name, faceMaterials, borderMaterial);
        }
        catch (Exception e)
        {
            Debug.LogError("Error in defineVoxel:" + e.Message);
            Debug.Log($"{name} {faceMaterials} {borderMaterial} {ebb}");
        }
    }

    private string _lastVoxel = "voxels/__default__";

    public void placeVoxel(int[] coords, string definitionName = null)
    {
        if (definitionName == null) definitionName = _lastVoxel;
        else _lastVoxel = definitionName;
        try
        {
            Director.inst.currentScene.voxelController.PlaceVoxel(new Vector3Int(coords[0], coords[1], coords[2]), AssetLibrary.inst.voxelDefinitions[definitionName]);
        }
        catch (Exception e)
        {
            Debug.LogError("Error in placeVoxel:" + e.Message);
            Debug.Log($"{coords[0]}, {coords[1]}, {coords[2]} {definitionName}");
        }
    }

    public void genAllQuads()
    {
        try
        {
            Director.inst.currentScene.voxelController.GenAllQuads();
        }
        catch (Exception e)
        {
            Debug.LogError("Error in genAllQuads:" + e.Message);
        }
    }

    public void clearQuads()
    {
        try
        {
            Director.inst.currentScene.voxelController.ClearQuads();
        }
        catch (Exception e)
        {
            Debug.LogError("Error in clearQuads:" + e.Message);
        }
    }

    public void clearVoxels()
    {
        try
        {
            Director.inst.currentScene.voxelController.ClearVoxels();
        }
        catch (Exception e)
        {
            Debug.LogError("Error in clearVoxels:" + e.Message);
        }
    }

    public void placeVoxelsOfDefinition(string name, int[][] tuples)
    {
        VoxelDefinition def = name != null ? AssetLibrary.inst.voxelDefinitions[name] : null;
        try
        {
            Director.inst.currentScene.voxelController.PlaceVoxelsOfDefinition(def, tuples);
        }
        catch (Exception e)
        {
            Debug.LogError("Error in placeVoxelsOfDefinition:" + e.Message);
            Debug.Log(name);
        }
    }

    public void focusCameraOnCharacter(string name)
    {
        try
        {
            Director.inst.cameraTarget.follow = Director.inst.currentScene.castController.dict[name].gameObject;
        }
        catch (Exception e)
        {
            Debug.LogError("Error in focusCameraOnCharacter:" + e.Message);
            Debug.Log(name);
        }
    }

    public void unfocusCamera()
    {
        Director.inst.cameraTarget.follow = null;
    }

    public void moveCameraToCharacter(string name)
    {
        Director.inst.cameraTarget.transform.position = Director.inst.currentScene.castController.dict[name].transform.position;
    }

    public void animateMaterial(string name, string[] textures, float interval = .5f)
    {
        try
        {
            List<Texture2D> _textures = new List<Texture2D>();
            foreach (string texture in textures)
            {
                _textures.Add(AssetLibrary.inst.textures[texture]);
            }
            Material mat = AssetLibrary.inst.materials[name];
            GameObject go = new GameObject();
            VoxelAnimation anm = go.AddComponent<VoxelAnimation>();
            anm.textures = _textures;
            anm.mat = mat;
            anm.interval = interval;
            anm.Init();
        }
        catch (Exception e)
        {
            Debug.LogError("Error in animateMaterial:" + e.Message);
            Debug.Log(name + textures.ToString());
        }
    }

    public void createDecal(string name, string texture = null, bool outline = false)
    {
        try
        {
            Material[] mats = null;
            if (texture != null)
            {
                if (outline) mats = new Material[] { AssetLibrary.inst.materials[texture], Director.inst.currentScene.setController.outlineMaterial };
                else mats = new Material[] { AssetLibrary.inst.materials[texture], Director.inst.currentScene.setController.noOutlineMaterial };
            }
            GameObject go = Director.inst.currentScene.setController.CreateDecal(name, mats);
            Director.inst.currentScene.setController.decals[name] = go;
        }
        catch (Exception e)
        {
            Debug.LogError("Error in createDecal:" + e.Message);
            Debug.Log(name + " " + texture.ToString() + " " + outline.ToString());
        }
    }

    public void placeDecal(string name, float[] pos = null, float[] rot = null, float[] scale = null)
    {
        try
        {
            Vector3? position;
            if (pos == null) position = null;
            else position = new Vector3(pos[0], pos[1], pos[2]);
            Vector3? rotation;
            if (rot == null) rotation = null;
            else rotation = new Vector3(rot[0], rot[1], rot[2]);
            Vector2? decalScale;
            if (scale == null) decalScale = null;
            else decalScale = new Vector2(scale[0], scale[1]);
            Director.inst.currentScene.setController.PlaceDecal(name, position, rotation, decalScale);
        }
        catch (Exception e)
        {
            Debug.LogError("Error in placeDecal:" + e.Message);
            Debug.Log(name);
        }
    }

    public void removeDecal(string name)
    {
        try
        {
            Director.inst.currentScene.setController.RemoveDecal(name);
        }
        catch (Exception e)
        {
            Debug.LogError("Error in removeDecal:" + e.Message);
            Debug.Log(name);
        }
    }

    public void setDecalActive(string name, bool active)
    {
        try
        {
            Director.inst.currentScene.setController.SetDecalActive(name, active);
        }
        catch (Exception e)
        {
            Debug.LogError("Error in setActiveDecal:" + e.Message);
            Debug.Log(name);
        }
    }

    public void highlightFaces(int[][] positions, int[][] faces = null)
    {
        try
        {
            if (positions == null) positions = new int[][] { };
            if (faces == null) faces = new int[][] { };
            for (int i = 0; i < positions.Length; i++)
            {
                int[] _faces;
                if (faces.Length <= i) _faces = null;
                else _faces = faces[i];
                if (_faces == null) _faces = new int[] { 0, 1, 2, 3, 4 };
                Vector3Int position = positions[i] == null ? Vector3Int.zero : new Vector3Int(positions[i][0], positions[i][1], positions[i][2]);
                if (!Director.inst.currentScene.voxelController.voxels.ContainsKey(position))
                {
                    //error($"highlightFaces: no voxel at {position}");
                }
                else
                {
                    try
                    {
                        Director.inst.currentScene.voxelController
                            .voxels[position]
                            .HighlightFaces(_faces);
                    }
                    catch (Exception e)
                    {
                        Debug.LogError($"Error highlighting ${position} faces ${_faces}");
                    }
                }
            }
        }
        catch (Exception e)
        {
            //TODO: Use a damn string builder, lazy
            Debug.LogError("Error in e.highlightFaces:" + e.Message);
            string output = "[";
            foreach (int[] position in positions)
            {
                if (position == null) output = output + "null, ";
                else
                {
                    output = output + "[";
                    foreach (int coord in position)
                    {
                        output += coord.ToString() + ", ";
                    }
                    output = output + "]";
                }
            }
            output = output + "]";
            Debug.Log(output);
            output = "[";
            foreach (int[] face in faces)
            {
                if (face == null) output = output + "null, ";
                else
                {
                    output = output + "[";
                    foreach (int coord in face)
                    {
                        output += coord.ToString() + ", ";
                    }
                    output = output + "]";
                }
            }
            output = output + "]";
            Debug.Log(output);
        }
    }

    public void clearHighlights(int[][] positions, int[][] faces = null)
    {
        if (positions == null) positions = new int[][] { };
        if (faces == null) faces = new int[][] { };
        for (var i = 0; i < positions.Length; i++)
        {
            Vector3Int pos = new Vector3Int(positions[i][0], positions[i][1], positions[i][2]);
            if (Director.inst.currentScene.voxelController.voxels.ContainsKey(pos))
            {
                int[] faceSet;
                if (faces.Length > i) faceSet = faces[i];
                else faceSet = new int[] { 0, 1, 2, 3, 4 };
                foreach (int face in faceSet)
                {
                    if (Director.inst.currentScene.voxelController.voxels[pos].quads[face] != null)
                    {
                        try
                        {
                            Director.inst.currentScene.voxelController.voxels[pos].RefreshFace(face);
                        }
                        catch (Exception e)
                        {
                            Debug.LogError($"Error calling RefreshFace on Voxel at {pos}");
                            Debug.LogError($"quads: {Director.inst.currentScene.voxelController.voxels[pos].quads}");
                            Debug.LogError(e.Message);
                        }
                    }
                }
            }
        }
    }

    public string createDirectionalLight(string name = null, float[] rotation = null, float intensity = 1.0f, int[] color = null)
    {
        LightsController lc = Director.inst.currentScene.lightsController;
        int num = lc.lights.Count;
        if (name == null) name = "__light__" + num.ToString();
        Vector3 _rotation;
        if (rotation == null || rotation.Length < 3) _rotation = new Vector3(90, 0, 0);
        else _rotation = new Vector3(rotation[0], rotation[1], rotation[2]);
        Color32 _color;
        if (color == null || color.Length == 0) _color = Color.white;
        else if (color.Length < 3) _color = new Color32((byte)color[0], (byte)color[0], (byte)color[0], 255);
        else if (color.Length < 4) _color = new Color32((byte)color[0], (byte)color[1], (byte)color[2], 255);
        else _color = new Color32((byte)color[0], (byte)color[1], (byte)color[2], (byte)color[3]);
        lc.CreateDirectionalLight(name, _rotation, intensity, _color);
        return name;
    }

    public string createPointLight(string name = null, float[] position = null, float intensity = 1.0f, float range = 10.0f, float[] color = null)
    {
        LightsController lc = Director.inst.currentScene.lightsController;
        int num = lc.lights.Count;
        if (name == null) name = "__light__" + num.ToString();
        Vector3 _position;
        if (position == null || position.Length < 3) _position = new Vector3(0, 0, 0);
        else _position = new Vector3(position[0], position[1], position[2]);
        Color32 _color;
        if (color == null || color.Length == 0) _color = Color.white;
        else if (color.Length < 3) _color = new Color32((byte)color[0], (byte)color[0], (byte)color[0], 255);
        else if (color.Length < 4) _color = new Color32((byte)color[0], (byte)color[1], (byte)color[2], 255);
        else _color = new Color32((byte)color[0], (byte)color[1], (byte)color[2], (byte)color[3]);
        lc.CreatePointLight(name, _position, intensity, range, _color);
        return name;
    }

    public string createSpotLight(string name = null, float[] position = null, float[] rotation = null, float intensity = 1.0f, float range = 10.0f, float angle = 20.0f, float[] color = null)
    {
        LightsController lc = Director.inst.currentScene.lightsController;
        int num = lc.lights.Count;
        if (name == null) name = "__light__" + num.ToString();
        Vector3 _position;
        if (position == null || position.Length < 3) _position = new Vector3(0, 0, 0);
        else _position = new Vector3(position[0], position[1], position[2]);
        Vector3 _rotation;
        if (rotation == null || rotation.Length < 3) _rotation = new Vector3(90, 0, 0);
        else _rotation = new Vector3(rotation[0], rotation[1], rotation[2]);
        Color32 _color;
        if (color == null || color.Length == 0) _color = Color.white;
        else if (color.Length < 3) _color = new Color32((byte)color[0], (byte)color[0], (byte)color[0], 255);
        else if (color.Length < 4) _color = new Color32((byte)color[0], (byte)color[1], (byte)color[2], 255);
        else _color = new Color32((byte)color[0], (byte)color[1], (byte)color[2], (byte)color[3]);
        lc.CreateSpotlight(name, _position, _rotation, intensity, range, angle, _color);
        return name;
    }

    public void setLightActive(string name, bool active)
    {
        Director.inst.currentScene.lightsController.lights[name].gameObject.SetActive(active);
    }

    public void killTheLights()
    {
        Director.inst.currentScene.lightsController.KillTheLights();
    }



    public void playSound(string name = null, string playerName = null, bool? loop = null)
    {
        try
        {
            Director.inst.currentScene.audioController.Play(playerName, name, loop);
        }
        catch (Exception e)
        {
            Debug.LogError("Error in playSound: " + e.Message);
            Debug.Log(name);
        }
    }

    public dynamic[] getSpriteDetails(string name)
    {
        if (!AssetLibrary.inst.sprites.ContainsKey(name))
        {
            return new dynamic[] { };
        }
        return new dynamic[]
        {
            name
        };
    }

    public dynamic[] getAnimationDetails(string name)
    {
        if (!AssetLibrary.inst.animations.ContainsKey(name))
        {
            return new dynamic[] { };
        }
        return new dynamic[]
        {
            name
        };
    }

    public dynamic[] getAnimationGroupDetails(string name)
    {
        if (!AssetLibrary.inst.animationGroups.ContainsKey(name))
        {
            return new dynamic[] { };
        }
        return new dynamic[]
        {
            name
        };
    }

    public dynamic[] getTextureDetails(string name)
    {
        if (!AssetLibrary.inst.textures.ContainsKey(name))
        {
            return new dynamic[] { };
        }
        return new dynamic[]
        {
            name
        };
    }

    public dynamic[] getSoundDetails(string name)
    {
        if (!AssetLibrary.inst.sounds.ContainsKey(name))
        {
            return new dynamic[] { };
        }
        return new dynamic[]
        {
            name
        };
    }

    public int[][] mapSurfaces()
    {
        return Director.inst.currentScene.voxelController.SurfaceVoxels();
    }

    public string voxelNameAt(int[] coords)
    {
        return Director.inst.currentScene.voxelController.voxels[new Vector3Int(coords[0], coords[1], coords[2])].voxDef.name;
    }

    public void onScreenControls(bool active)
    {
        OnScreenControls.setActive(active);
    }
}
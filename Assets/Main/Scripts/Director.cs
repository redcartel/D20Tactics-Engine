using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

public class Director : MonoBehaviour
{
    public Scene currentScene;
    public Dictionary<string, Scene> scenes = new Dictionary<string, Scene>();
    public static Director inst;
    public CameraTarget cameraTarget;
    public Scene scenePrefab;

    public List<string> streamingAssetMods;
    public List<string> pathMods;

    public bool resetMe = false;
    void Start()
    {
        Camera.main.eventMask = inputLayerMask;
        inst = this;
    }

    bool started = false;
    public void Update()
    {
        if (resetMe)
        {
            DestroyAllScenes();
            Start();
            started = false;
            resetMe = false;
        }
        if (!started)
        {
            started = true;
            DestroyAllScenes();
            ScriptEngine.inst.NewEngine();
            NewScene();
            foreach (string modPath in streamingAssetMods)
            {
                ScriptEngine.inst.LoadModAtPath(Path.Combine(Application.streamingAssetsPath, modPath));
            }
            foreach (string modPath in pathMods)
            {
                ScriptEngine.inst.LoadModAtPath(Path.Combine(Application.streamingAssetsPath, modPath));
            }
        }
    }

    public void NewScene(string newName = null, bool activate = true, bool destroyOld = false)
    {
        if (newName == null) newName = "__default__";
        if (scenes.ContainsKey(newName)) DestroyScene(newName);
        else if (destroyOld == true)
        {
            DestroyScene(currentScene.gameObject.name);
        }
        scenes[newName] = Instantiate(scenePrefab, this.transform);
        scenes[newName].gameObject.name = newName;
        scenes[newName].InstantiateComponents();
        if (activate)
        {
            if (currentScene != null) currentScene.gameObject.SetActiveRecursively(false);
            scenes[newName].gameObject.SetActiveRecursively(true);
            currentScene = scenes[newName];
            currentScene.Init();
        }
        else
        {
            scenes[newName].gameObject.SetActiveRecursively(false);
        }
    }

    public void DestroyAllScenes()
    {
        List<string> names = new List<string>();
        foreach (Scene scene in scenes.Values)
        {
            names.Add(scene.gameObject.name);
        }
        foreach (string sceneName in names)
        {
            DestroyScene(sceneName);
        }
    }

    public void SetCurrentScene(string name, bool init = false)
    {
        currentScene?.gameObject.SetActive(false);
        currentScene = scenes[name];
        currentScene.gameObject.SetActive(true);
    }

    public void DestroyScene(string name)
    {
        Debug.Log("DestroyScene " + name);
        Destroy(scenes[name].gameObject);
        scenes.Remove(name);
    }

    public bool blockClicks = false;

    public void BlockClicks(float timeToWait)
    {
        blockClicks = true;
        StartCoroutine(TemporaryBlock(timeToWait));
    }

    public IEnumerator TemporaryBlock(float timeToWait)
    {
        yield return 0;
        yield return new WaitForSeconds(timeToWait);
        blockClicks = false;
    }

    public bool revealAll = false;

    public bool shouldReveal
    {
        get
        {
            if (revealAll == true) return true;
            return false;
        }
    }

    [SerializeField] public LayerMask inputLayerMask;

}
using UnityEngine;
using Jint;
using System;
using System.IO;
using Jint.Runtime;
using Jint.Runtime.Interop;
using Jint.Native;
using System.Collections;
using System.Linq;
using ICSharpCode.SharpZipLib.Zip;

public class ScriptEngine : MonoBehaviour
{
    public static ScriptEngine inst;

    public Engine engine;

    public string streamingAssetMod = "";

    void Start()
    {
        inst = this;
        NewEngine();
    }

    public void NewEngine()
    {
        engine = new Engine();

        engine.SetValue("Interop", TypeReference.CreateTypeReference(engine, typeof(Interop)));

        engine.Execute(@"
        const _i = Interop.inst;");

        engine.Execute(@"
        const window = this;
        const console = {   
            log: (obj) => Interop.inst.log(String(obj)),
            error: (obj) => Interop.inst.error(String(obj))
        };

        window._faceClick = (voxelPos, face) => {
            console.log(`faceClick: (${voxelPos[0]}, ${voxelPos[1]}, ${voxelPos[2]}), face: ${face}`);
        };

        window._spriteClick = (name) => {
            console.log(`spriteClick: ${name}`);
        };

        window._buttonClick = (dialogName, buttonName) => {
            console.log(`button: ${dialogName}, ${buttonName}`);
        }
        ");
    }



    public void FaceClick(Vector3Int voxelPos, int face)
    {
        int x = voxelPos.x;
        int y = voxelPos.y;
        int z = voxelPos.z;
        engine.Execute($"window.faceClick([{x}, {y}, {z}], {face});");
    }

    public void CharacterClick(string name)
    {
        engine.Execute($"window.characterClick('{name}')");
    }

    public void CharacterMove(string name)
    {
        engine.Execute($"window.characterMoved('{name}')");
    }

    public void CharacterSeen(string name)
    {
        engine.Execute($"window.characterSeen('{name}'");
    }

    public void ExecuteScript(string script)
    {
        //Debug.Log("Execute " + script);
        try
        {
            engine.Execute(script);
        }
        catch (JavaScriptException ex)
        {
            Interop.inst.error(ex.ToString());
            Debug.LogError(ex);
        }
    }

    public void SetModPath(string modPath)
    {
        engine.Execute($"window.modPath = \"{modPath}\";");
    }

    public void LoadModAtPath(string path)
    {
        FileAttributes attr = File.GetAttributes(path);

        if ((attr & FileAttributes.Directory) == FileAttributes.Directory)
        {
            LoadJSMod(System.IO.Path.Combine(path, "index.js"));
        }
        else
        {
            if (path.EndsWith(".js"))
            {
                LoadJSMod(path);
            }
            else
            {
                string subdir = "_udk" + System.IO.Path.GetFileName(path);
                string unzippath = System.IO.Path.Combine(Application.temporaryCachePath, subdir);

                FastZip fastZip = new FastZip();

                // Will always overwrite if target filenames already exist
                fastZip.ExtractZip(path, unzippath, null);
                LoadJSMod(System.IO.Path.Combine(path, "index.js"));
            }
        }
    }

    public void LoadJSMod(string path)
    {
        var modPath = Path.GetDirectoryName(path);
        Interop.inst.print("loading mod at " + path);
        StreamReader reader = new StreamReader(path);
        string body = reader.ReadToEnd();
        reader.Close();
        try
        {
            engine.Execute($"window.modPath = \"{modPath}\";");
            engine.Execute(body);
        }
        catch (JavaScriptException ex)
        {
            var location = engine.GetLastSyntaxNode().Location;
            string err = $"Jint loadJSMod JavaScript error on {path} at {location}: {ex.Error}";
            UnityEngine.Debug.LogError(err);
            Interop.inst.error(err);
        }
        catch (Exception ex)
        {
            var location = engine.GetLastSyntaxNode().Location;
            string err = $"Jint loadJSMod C# error on {path} at {location}: {ex.Message}";
            UnityEngine.Debug.LogError(err);
            Interop.inst.error(err);
        }

        try
        {
            //engine.Execute("window.launchStagedMod('" + path + "')");
        }
        catch (JavaScriptException ex)
        {
            var location = engine.GetLastSyntaxNode().Location;
            string err = $"Jint loadJSMod error on {path} at {location}: {ex.Error}";
            UnityEngine.Debug.LogError(err);
            Interop.inst.error(err);
        }
        catch (Exception ex)
        {
            var location = engine.GetLastSyntaxNode().Location;
            string err = $"Jint loadJSMod error on {path} at {location}: {ex.Message}";
            UnityEngine.Debug.LogError(err);
            Interop.inst.error(err);
        }
    }

    public void DelayedCall(float seconds, string script)
    {
        StartCoroutine(DelayCall(seconds, script));
    }

    public IEnumerator DelayCall(float timeToWait, string script)
    {
        //Debug.Log("delayed call called");
        yield return 0;
        yield return 0;
        yield return new WaitForSeconds(timeToWait);
        ExecuteScript(script);
        yield return 0;
    }

    public void BackButton()
    {
        ExecuteScript("window.backButton()");
    }

    //public void LoadAssetBundle(string dir, string filename, string objectName)
    //{
    //    Debug.Log($"Loading Asset Bundle from {dir}/{filename} with gameObject {objectName}");
    //    string path = Path.Combine(dir, filename);
    //    var myLoadedAssetBundle
    //        = AssetBundle.LoadFromFile(path);
    //    if (myLoadedAssetBundle == null)
    //    {
    //        Debug.LogError($"Failed to load AssetBundle {filename}");
    //        return;
    //    }
    //    else
    //    {
    //        Debug.Log($"AssetBundle {filename} loaded.");
    //    }
    //    var prefab = myLoadedAssetBundle.LoadAsset<GameObject>(objectName);
    //    if (objectName != null)
    //    {
    //        var go = Instantiate(prefab);
    //        if (go != null)
    //        {
    //            try
    //            {
    //                Debug.Log(ResourceLibrary.instance);
    //                ResourceLibrary.instance.ProcessBundle(filename, go);
    //                Debug.Log($"AssetBundle {filename} processed");
    //            }
    //            catch (Exception e)
    //            {
    //                Debug.LogError($"Failed to process AssetBundle {filename}: {e.Message}");
    //            }
    //        }
    //        else
    //        {
    //            Debug.LogError($"Instantiating {objectName} in AssetBundle {filename} yielded null");
    //        }
    //    }
    //    else
    //    {
    //        Debug.LogError($"{objectName} null processing AssetBundle ${filename}");
    //    }
    //}

    //public dynamic exFun(string function, string argsJson = null)
    //{
    //    dynamic result = null;
    //    if (argsJson == null || argsJson.Trim() != "") {
    //        try
    //        {
    //            result = engine.Execute($"window.exFun('{function}')");
    //        }
    //        catch (JavaScriptException ex)
    //        {
    //            var location = engine.GetLastSyntaxNode().Location;
    //            string err = $"Jint exFun runtime {ex.Error} in {function} line {location}";
    //            UnityEngine.Debug.LogError(err);
    //            Interop.instance.error(err);
    //        }
    //        catch (Exception ex)
    //        {
    //            var location = engine.GetLastSyntaxNode().Location;
    //            string err = $"Jint exFun runtime {ex.Message} in {function} line {location}";
    //            UnityEngine.Debug.LogError(err);
    //            Interop.instance.error(err);
    //        }

    //    }
    //    else {
    //        try
    //        {
    //            result = engine.Execute($"window.exFun('{function}', {argsJson})");
    //        }
    //        catch (JavaScriptException ex)
    //        {
    //            var location = engine.GetLastSyntaxNode().Location;
    //            string err = $"Jint exFun runtime {ex.Error} in {function} with args {argsJson} line {location}";
    //            UnityEngine.Debug.LogError(err);
    //            Interop.instance.error(err);
    //        }
    //        catch (Exception ex)
    //        {
    //            var location = engine.GetLastSyntaxNode().Location;
    //            string err = $"Jint exFun runtime {ex.Message} in {function} with args {argsJson} line {location}";
    //            UnityEngine.Debug.LogError(err);
    //            Interop.instance.error(err);
    //        }

    //    }

    //    return result;
    //}

    //public dynamic exFun(FunctionReference reference)
    //{
    //    return exFun(reference.function, reference.argsJson);
    //}
}
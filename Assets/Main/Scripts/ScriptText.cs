using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using System.IO;

public class ScriptText : MonoBehaviour
{
    TMP_Text inputText;
    public static ScriptText inst;
    // Start is called before the first frame update
    void Start()
    {
        inputText = GetComponent<TMP_Text>();
        inst = this;
    }

    public void Execute()
    {
        string text = inputText.text.Trim();
        // mysterious illegal character at end of string.
        text = text.Substring(0, text.Length - 1);
        ScriptEngine.inst.SetModPath(Path.Combine(Application.streamingAssetsPath, ScriptEngine.inst.streamingAssetMod));
        ScriptEngine.inst.ExecuteScript(text);
    }
}

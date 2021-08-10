using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ButtonScript : MonoBehaviour
{
    [TextArea]
    public string onExecute;
    public bool selected = false;

    // Start is called before the first frame update
    void Start()
    {
        GetComponent<Button>().onClick.AddListener(Execute);
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void Execute()
    {
        Dialog dialog = GetComponentInParent<Dialog>();
        if (onExecute != null && onExecute.Trim() != "")
        {
            ScriptEngine.inst.ExecuteScript(onExecute);
        }
    }
}

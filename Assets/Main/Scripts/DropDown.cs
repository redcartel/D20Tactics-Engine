using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class DropDown : MonoBehaviour
{
    public float yDestination;
    public float speed = 20.0f;
    private RectTransform rt;
    public TMP_Text output;
    public static DropDown inst;

    // Start is called before the first frame update
    void Start()
    {
        inst = this;
        rt = GetComponent<RectTransform>();
        output.gameObject.SetActive(false);
        yDestination = rt.sizeDelta.y;
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        if (Mathf.Abs(rt.anchoredPosition3D.y - yDestination) < speed * 1.9f)
        {
            rt.anchoredPosition3D = new Vector3(rt.anchoredPosition3D.x, yDestination, rt.anchoredPosition3D.z);
        }
        else if (rt.anchoredPosition3D.y > yDestination)
        {
            rt.anchoredPosition3D = new Vector3(rt.anchoredPosition3D.x, rt.anchoredPosition3D.y - speed, rt.anchoredPosition3D.z);
        }
        else
        {
            rt.anchoredPosition3D = new Vector3(rt.anchoredPosition3D.x, rt.anchoredPosition3D.y + speed, rt.anchoredPosition3D.z);
        }
    }

    private void Update()
    {
        if ((Input.GetKey(KeyCode.RightControl) || Input.GetKey(KeyCode.LeftControl)) && Input.GetKeyDown(KeyCode.BackQuote))
        {
            if (yDestination > 0)
            {
                output.gameObject.SetActive(true);
                yDestination = 0;
            }
            else
            {
                output.gameObject.SetActive(false);
                yDestination = rt.sizeDelta.y;
            }
        }
        else if ((Input.GetKey(KeyCode.RightControl) || Input.GetKey(KeyCode.LeftControl)) && (Input.GetKeyDown(KeyCode.Return) || Input.GetKeyDown(KeyCode.KeypadEnter)))
        {
            if (yDestination == 0)
            {
                Execute();
            }
        }
    }

    private void Execute()
    {
        GetComponentInChildren<ScriptText>().Execute();
    }
}

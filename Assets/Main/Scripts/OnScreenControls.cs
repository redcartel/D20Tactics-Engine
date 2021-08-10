using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OnScreenControls : MonoBehaviour
{
    public static OnScreenControls inst;
    // Start is called before the first frame update
    void Start()
    {
        inst = this;
        inst.gameObject.SetActive(false);
    }

    public static void setActive(bool active)
    {
        inst.gameObject.SetActive(active);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
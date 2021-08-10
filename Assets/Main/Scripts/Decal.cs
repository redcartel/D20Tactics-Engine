using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Decal : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {

    }

    bool seen = false;

    // Update is called once per frame
    void Update()
    {
        if (seen == true) return;
        //Debug.Log(seen);
        if (Director.inst.shouldReveal)
        {
            Reveal();
        }
        foreach (var character in Director.inst.currentScene.castController.dict.Values)
        {
            if (!character.moved || !character.revealsMap) continue;
            if ((character.transform.position - transform.position).magnitude > 25) continue;
            Vector3[] faceOffsets = {
                Vector3.zero
            };
            foreach (var offset in faceOffsets)
            {
                var target = this.transform.position + offset;
                var charLoc = character.transform.position;
                var eyes = charLoc + new Vector3(0, 1.25f, 0);
                RaycastHit hit;
                var rayConnects = Physics.Raycast(eyes, (target - eyes).normalized, out hit);
                if (rayConnects)
                {
                    
                    var decal = hit.collider.GetComponent<Decal>();
                    Debug.Log("decal connect " + decal.ToString());
                    if (decal == this)
                    {
                        //Debug.DrawRay(eyes, (target - eyes).normalized, Color.green, 1);
                        Reveal();
                    }
                    else
                    {
                        //Debug.DrawRay(eyes, (target - eyes).normalized, Color.red, 100);
                    }
                }
            }
        }

    }

    void Reveal()
    {
        Debug.Log(this.name + " reveal");
        var renderer = GetComponent<Renderer>();
        renderer.enabled = true;
        seen = true;
    }
}

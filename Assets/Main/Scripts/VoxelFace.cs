using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(MeshCollider))]
class VoxelFace : MonoBehaviour
{
    public int face;
    public bool seen = false;
    //public Vector3Int position;

    void OnMouseDown()
    {
        if (!Director.inst.blockClicks)
        {
            Voxel voxel = GetComponentInParent<Voxel>();
            voxel.ReceiveClick(face);
        }
    }

    private void Update()
    {
        if (seen == true) return;
        //Debug.Log(seen);
        if (Director.inst.shouldReveal)
        {
            GetComponentInParent<Voxel>().RevealQuads();
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
                    //Debug.Log("connect");
                    var vox = hit.collider.GetComponent<VoxelFace>();
                    if (vox == this)
                    {
                        //Debug.DrawRay(eyes, (target - eyes).normalized, Color.green, 1);
                        GetComponentInParent<Voxel>().RevealQuads();
                        seen = true;
                    }
                    else
                    {
                        //Debug.DrawRay(eyes, (target - eyes).normalized, Color.red, 100);
                    }
                }
            }
        }
    }
}

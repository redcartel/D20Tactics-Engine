using System.Collections;
using System.Collections.Generic;
using System;
using UnityEngine;

public class Voxel : MonoBehaviour
{
    public Vector3Int position;
    public VoxelController controller;
    public VoxelDefinition voxDef;
    public MeshRenderer[] quads = new MeshRenderer[5] { null, null, null, null, null };
    public Material[][] mats = new Material[5][] { new Material[2] { null, null }, new Material[2] { null, null }, new Material[2] { null, null }, new Material[2] { null, null }, new Material[2] { null, null } };
    public Material[][] highlightMats = new Material[5][] { new Material[2] { null, null }, new Material[2] { null, null }, new Material[2] { null, null }, new Material[2] { null, null }, new Material[2] { null, null } };
    public bool[] hasHighlight = new bool[] { false, false, false, false, false };
    public Vector3 blockDimensions = new Vector3(1, .5f, 1);
    public bool seen = false;

    public void Start()
    {
        controller = GetComponentInParent<VoxelController>();
    }

    Vector3Int upPos
    {
        get
        {
            return new Vector3Int(position.x, position.y + 1, position.z);
        }
    }

    Vector3Int southPos
    {
        get
        {
            return new Vector3Int(position.x, position.y, position.z - 1);
        }
    }

    Vector3Int westPos
    {
        get
        {
            return new Vector3Int(position.x - 1, position.y, position.z);
        }
    }

    Vector3Int northPos
    {
        get
        {
            return new Vector3Int(position.x, position.y, position.z + 1);
        }
    }

    Vector3Int eastPos
    {
        get
        {
            return new Vector3Int(position.x + 1, position.y, position.z);
        }
    }

    Vector3Int downPos
    {
        get
        {
            return new Vector3Int(position.x, position.y - 1, position.z);
        }
    }

    /**
     * Call AFTER all Voxels have been placed in a scene.
     */

    bool deleteme_reported = false;

    // TODO sometimes south facing quads that shouldn't generate generate
    public void GenerateQuads()
    {
        if (!deleteme_reported)
        {
            deleteme_reported = true;
        }
        if (controller?.voxels?.ContainsKey(upPos) == false)
        {
            controller.ground[position] = true;
            GameObject quad = MakeQuad(mats[0]);
            quad.transform.localPosition = new Vector3(0, 0, 0);
            quad.transform.rotation = Quaternion.Euler(90, 0, 0);
            quad.GetComponent<VoxelFace>().face = 0;
            quads[0] = quad.GetComponent<MeshRenderer>();
        }
        if (controller?.voxels?.ContainsKey(northPos) == false)
        {
            GameObject quad = MakeQuad(mats[1], false);
            quad.transform.localPosition = new Vector3(0, -.25f, .5f);
            quad.transform.rotation = Quaternion.Euler(0, 0, 0);
            quad.GetComponent<VoxelFace>().face = 1;
            quads[1] = quad.GetComponent<MeshRenderer>();
        }
        if (controller?.voxels?.ContainsKey(eastPos) == false)
        {
            GameObject quad = MakeQuad(mats[2], false);
            quad.transform.localPosition = new Vector3(.5f, -.25f, 0);
            quad.transform.rotation = Quaternion.Euler(0, -90, 0);
            quad.GetComponent<VoxelFace>().face = 2;
            quads[2] = quad.GetComponent<MeshRenderer>();
        }
        if (controller?.voxels?.ContainsKey(southPos) == false)
        {
            GameObject quad = MakeQuad(mats[3], false);
            quad.transform.localPosition = new Vector3(0, -.25f, -.5f);
            quad.transform.rotation = Quaternion.Euler(0, 0, 0);
            quad.GetComponent<VoxelFace>().face = 3;
            quads[3] = quad.GetComponent<MeshRenderer>();
        }
        if (controller?.voxels?.ContainsKey(westPos) == false)
        {
            GameObject quad = MakeQuad(mats[4], false);
            quad.transform.localPosition = new Vector3(-.5f, -.25f, 0);
            quad.transform.rotation = Quaternion.Euler(0, 90, 0);
            quad.GetComponent<VoxelFace>().face = 4;
            quads[4] = quad.GetComponent<MeshRenderer>();
        }
    }


    public void RefreshFace(int face)
    {
        if (quads == null) return;
        quads[face].materials = mats[face];
        hasHighlight[face] = false;
    }

    public void HighlightFaces(int[] faces)
    {
        if (quads == null) return;
        if (faces == null) faces = new int[] { 0, 1, 2, 3, 4 };
        foreach (int face in faces)
        {
            if (quads[face] != null)
            {
                Material[] newMats = new Material[] { mats[face][0], mats[face][1] };
                newMats[0] = voxDef.highlights[face];
                quads[face].materials = newMats;
                hasHighlight[face] = true;
            }
        }
    }

    private GameObject MakeQuad(Material[] mats, bool fullSquare = true)
    {
        try
        {
            GameObject go;
            if (fullSquare) go = Instantiate(controller.quadPrefab, Vector3.zero, Quaternion.identity, this.transform);
            else go = Instantiate(controller.halfQuadPrefab, Vector3.zero, Quaternion.identity, this.transform);
            go.SetActive(true);
            MeshRenderer mr = go.GetComponent<MeshRenderer>();
            mr.materials = mats;
            return go;
        }
        catch (Exception e)
        {
            Debug.LogError("error in MakeQuad");
            Debug.LogError(e.Message);
            Debug.LogError(e.StackTrace);
            return null;
        }
    }

    public void ReceiveClick(int face)
    {
        ScriptEngine.inst.FaceClick(position, face);
    }

    private void Paint(Material[] paintMats, Material outlineMaterial = null)
    {
        if (outlineMaterial == null) outlineMaterial = AssetLibrary.inst.baseNoOutlineMaterial;
        if (paintMats == null || paintMats.Length == 0) paintMats = new Material[] { AssetLibrary.inst.basePixelMaterial };
        Material[] newMats;
        if (paintMats.Length == 1 || paintMats[1] == null)
        {
            newMats = new Material[] { paintMats[0], paintMats[0], paintMats[0], paintMats[0], paintMats[0] };
        }
        else if (paintMats.Length < 5 || paintMats[2] == null || paintMats[3] == null || paintMats[4] == null)
        {
            newMats = new Material[] { paintMats[0], paintMats[1], paintMats[1], paintMats[1], paintMats[1] };
        }
        else
        {
            newMats = new Material[] { paintMats[0], paintMats[1], paintMats[2], paintMats[3], paintMats[4] };
        }
        mats = new Material[5][]
        {
            new Material[2] { newMats[0], outlineMaterial },
            new Material[2] { newMats[1], outlineMaterial },
            new Material[2] { newMats[2], outlineMaterial },
            new Material[2] { newMats[3], outlineMaterial },
            new Material[2] { newMats[4], outlineMaterial },
        };
    }

    public void ApplyDefinition(VoxelDefinition definition)
    {
        Paint(definition.materials, definition.outlineMaterial);
    }

    public void ChangeFaceMaterial(int face, Material pixelMaterial = null, Material outlineMaterial = null)
    {
        if (pixelMaterial == null) pixelMaterial = quads[face].materials[0];
        if (outlineMaterial == null) outlineMaterial = quads[face].materials[1];
        quads[face].materials = new Material[] { pixelMaterial, outlineMaterial };
    }

    public void ClearQuads()
    {
        foreach (MeshRenderer mr in quads)
        {
            if (mr != null)
            {
                Destroy(mr.gameObject);
            }
        }
        quads = new MeshRenderer[] { null, null, null, null, null };
    }

    public void See()
    {
        if (!this.seen)
        {
            this.seen = true;
            this.GenerateQuads();
        }
    }

    private void Update()
    {
        //if (seen) return;
        //if (Director.inst.shouldReveal)
        //{
        //    RevealQuads();
        //    seen = true;
        //}
        //foreach (var character in Director.inst.currentScene.castController.dict.Values)
        //{
        //    if (!character.moved) continue;
        //    if ((character.transform.position - transform.position).magnitude > 25) continue;
        //    Vector3[] faceOffsets = {
        //        Vector3.zero,
        //        new Vector3(0, -.5f, 0),
        //        new Vector3(0, -.25f, .5f),
        //        new Vector3(0, -.25f, -.5f),
        //        new Vector3(.5f, -.25f, 0f),
        //        new Vector3(.5f, .25f, 0f)
        //    };
        //    foreach (var offset in faceOffsets)
        //    {
        //        var target = this.transform.position + offset;
        //        var charLoc = character.transform.position;
        //        var eyes = charLoc + new Vector3(0, 1.25f, 0);
        //        RaycastHit hit;
        //        var rayConnects = Physics.Raycast(eyes, (target - eyes).normalized, out hit);
        //        if (rayConnects)
        //        {
        //            var vox = hit.collider.GetComponent<Voxel>();
        //            if (vox == null) continue;
        //            if (vox == this)
        //            {
        //                RevealQuads();
        //                seen = true;
        //            }
        //        }
        //    }
        //}

        
    }


    public void RevealQuads()
    {
        if (!this.controller.isReady) return; 
        foreach (var quad in quads)
        {
            if (quad != null)
            {
                quad.enabled = true;
                this.seen = true;
                quad.GetComponent<VoxelFace>().seen = true;
            }
        }
    }
}

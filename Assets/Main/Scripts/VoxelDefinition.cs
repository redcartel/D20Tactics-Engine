using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class VoxelDefinition
{
    private string[] faceMaterialNames = new string[] { null, null, null, null, null };
    private string outlineMaterialName = null;
    private Material[] _materials;
    private Material[] _highlightMaterials;
    private Material _outlineMaterial;
    public string name;

    public VoxelDefinition(string[] faceMaterials, string outlineMaterial)
    {
        List<string> _faceMaterials = new List<string>();
        foreach (string matName in faceMaterials) _faceMaterials.Add(matName);
        if (_faceMaterials.Count == 0) _faceMaterials.Add("voxels/__default__");
        if (_faceMaterials.Count == 1) _faceMaterials.Add(_faceMaterials[0]);
        if (_faceMaterials.Count < 5)
        {
            for (int i = _faceMaterials.Count; i < 5; i++)
            {
                _faceMaterials.Add(_faceMaterials[1]); 
            }
        }
        if (_faceMaterials.Count > 5) _faceMaterials = _faceMaterials.GetRange(0, 5);
        faceMaterialNames = _faceMaterials.ToArray();
        outlineMaterialName = outlineMaterial;
    }

    public Material outlineMaterial {
        get
        {
            // TODO: outline materials in asset library
            if (_outlineMaterial == null) _outlineMaterial = AssetLibrary.inst.baseNoOutlineMaterial;
            return _outlineMaterial;
        }
    }

    public Material[] materials
    {
        get
        {
            if (_materials == null)
            {
                _materials = new Material[]
                {
                    AssetLibrary.inst.materials[faceMaterialNames[0]],
                    AssetLibrary.inst.materials[faceMaterialNames[1]],
                    AssetLibrary.inst.materials[faceMaterialNames[2]],
                    AssetLibrary.inst.materials[faceMaterialNames[3]],
                    AssetLibrary.inst.materials[faceMaterialNames[4]],
                };
            }
            return _materials;
        }
    }

    public Material[] highlights
    {
        get
        {
            if (_highlightMaterials == null)
            {
                _highlightMaterials = new Material[]
                {
                    AssetLibrary.inst.highlights[faceMaterialNames[0]],
                    AssetLibrary.inst.highlights[faceMaterialNames[1]],
                    AssetLibrary.inst.highlights[faceMaterialNames[2]],
                    AssetLibrary.inst.highlights[faceMaterialNames[3]],
                    AssetLibrary.inst.highlights[faceMaterialNames[4]]
                };
            }
            return _highlightMaterials;
        }
    }
}

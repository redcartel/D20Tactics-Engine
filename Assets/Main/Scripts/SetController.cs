using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SetController : MonoBehaviour
{
    [SerializeField]
    public GameObject quadPrefab;
    public Material pixelMaterial;
    public Material outlineMaterial;
    public Material noOutlineMaterial;

    public Dictionary<string, GameObject> decals = new Dictionary<string, GameObject>();

    public GameObject CreateDecal(string name, Material[]? materials)
    {
        GameObject go = Instantiate(quadPrefab, new Vector3(-20, -20, -20), Quaternion.identity, this.transform);
        if (materials != null)
        {
            go.GetComponent<MeshRenderer>().materials = materials;
        }
        decals[name] = go;
        return go;
    }

    public void PlaceDecal(string name, Vector3? position = null, Vector3? rotation = null, Vector2? scale = null)
    {
        GameObject decal = decals[name];
        decal.SetActive(true);
        Debug.Log(decal);
        if (position != null) decal.transform.localPosition = (Vector3) position;
        if (rotation != null) decal.transform.rotation = Quaternion.Euler((Vector3) rotation);
        if (scale != null) decal.transform.localScale = (Vector2)scale;
        BoxCollider collider = decal.GetComponent<BoxCollider>();
        collider.size = decal.transform.localScale;
    }

    public void SetDecalActive(string name, bool active)
    {
        decals[name].SetActive(active);
    }

    public void RemoveDecal(string name)
    {
        Destroy(decals[name]);
        decals.Remove(name);
    }
}
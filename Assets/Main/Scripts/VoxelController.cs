using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class VoxelController : MonoBehaviour
{
    [SerializeField]
    public GameObject voxelPrefab;
    public GameObject quadPrefab;
    public GameObject halfQuadPrefab;
    public GameObject blankBlock;

    public Material basePixelMaterial;
    public Material baseOutlineMaterial;
    public Material baseHighlightMaterial;

    public List<Material> matList;

    public Dictionary<Vector3Int, Voxel> voxels = new Dictionary<Vector3Int, Voxel>();
    public Dictionary<Vector3Int, Voxel> blankVoxels = new Dictionary<Vector3Int, Voxel>();
    // TODO: track clearance height
    public Dictionary<Vector3Int, bool> ground = new Dictionary<Vector3Int, bool>();

    // TODO: look this up in more plces
    public Vector3 voxelSize = new Vector3(1, .5f, 1);

    public bool isReady = false;

    public void Start()
    {
        
        //StaticCube(new Vector3Int(20, 20, 20), .2f);
        /*
        for (int x = 0; x < 10; x ++)
        {
            for (int z = 0; z < 10; z ++)
            {
                PlaceVoxel(new Vector3Int(x, 0, z));
                if (x == 5 || z == 5)
                {
                    PlaceVoxel(new Vector3Int(x, 1, z));
                }
                if (x == 5 && z == 5)
                {
                    PlaceVoxel(new Vector3Int(x, 2, z));
                }
            }
        }
        GenAllQuads();
        */
    }

    public void StaticCube(Vector3Int cubeSize, float fillChance = .5f)
    {
        for (int x = 0; x < cubeSize.x; x++)
        {
            for (int y = 0; y < cubeSize.y; y++)
            {
                for (int z = 0; z < cubeSize.z; z++)
                {
                    if (Random.RandomRange(0, 1.0f) < fillChance)
                    {
                        PlaceVoxel(new Vector3Int(x, y, z));
                    }
                }
            }
        }
    }

    public void GenAllQuads()
    {
        foreach (Voxel voxel in voxels.Values)
        {
            voxel.GenerateQuads();
            isReady = true;
        }
    }

    public void PlaceVoxelsOfDefinition(VoxelDefinition definition, int[][] tuples)
    {
        foreach (int[] tuple in tuples)
        {
            if (tuple.Length == 3)
            {
                Voxel v = PlaceVoxel(new Vector3Int(tuple[0], tuple[1], tuple[2]), definition);
                v.voxDef = definition;
            }
        }
    }

    public Voxel PlaceBlankVoxel(Vector3Int pos)
    {
        if (this.voxels.ContainsKey(pos))
        {
            Destroy(voxels[pos].gameObject);
            voxels.Remove(pos);
        }
        if (this.blankVoxels.ContainsKey(pos))
        {
            Destroy(blankVoxels[pos].gameObject);
            blankVoxels.Remove(pos);
        }
        GameObject go = Instantiate(blankBlock);
        go.name = $"blank_({pos.x}, {pos.y}, {pos.z}";
        go.transform.position = new Vector3(pos.x, pos.y / 2, pos.z);
        go.transform.SetParent(this.transform);
        return go.GetComponent<Voxel>();
    }

    public Voxel PlaceVoxel(Vector3Int pos, VoxelDefinition definition = null)
    {

        if (voxels.ContainsKey(pos))
        {
            Destroy(voxels[pos]);
            voxels.Remove(pos);
        }
        //if (this.blankVoxels.ContainsKey(pos))
        //{
        //    Destroy(blankVoxels[pos]);
        //    blankVoxels.Remove(pos);
        //}
        if (definition == null)
        {
            return null;
        }
        else
        {
            GameObject go = Instantiate(voxelPrefab);
            go.SetActive(true);
            go.name = $"({pos.x}, {pos.y}, {pos.z})";
            go.transform.localPosition = new Vector3(pos.x, (float)pos.y / 2, pos.z);
            Voxel vox = go.GetComponent<Voxel>();
            vox.controller = this;
            vox.transform.parent = this.transform;
            vox.position = pos;
            voxels[pos] = vox;
            //unseenVoxels[pos] = vox;
            vox.ApplyDefinition(definition);
            //Debug.Log($"Place voxel {pos} collider {this.GetComponent<BoxCollider>()}");
            return vox;
        }
    }

    public void ClearVoxels()
    {
        foreach (Voxel voxel in voxels.Values)
        {
            Destroy(voxel.gameObject);
        }
        voxels.Clear();

        foreach (Voxel voxel in blankVoxels.Values)
        {
            Destroy(voxel.gameObject);
        }
        voxels.Clear();
    }

    public void ClearQuads()
    {
        foreach (Voxel voxel in voxels.Values)
        {
            if (voxel.quads != null)
            {
                voxel.ClearQuads();
            }
        }
    }

    public void ReceiveClick(Vector3Int pos, int face)
    {
        //Material[] mats = voxels[pos].Get
    }

    public int[][] SurfaceVoxels(int clearance = 2)
    {
        List<int[]> surfaces = new List<int[]>();
        foreach (Voxel vox in voxels.Values)
        {
            bool isSurface = true;
            for (int h = 1; h <= clearance; h++)
            {
                Vector3Int checkPos = new Vector3Int(vox.position.x, vox.position.y + h, vox.position.z);
                if (voxels.ContainsKey(checkPos))
                {
                    isSurface = false;
                    break;
                }
            }
            if (isSurface) surfaces.Add(new int[] { vox.position.x, vox.position.y, vox.position.z });
        }
        return surfaces.ToArray();
    }
}
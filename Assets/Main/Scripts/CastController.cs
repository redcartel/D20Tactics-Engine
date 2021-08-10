using System.Collections;
using System;
using System.Collections.Generic;
using UnityEngine;

public class CastController : MonoBehaviour
{

    public Dictionary<string, Character> dict = new Dictionary<string, Character>();
    public Dictionary<Vector3Int, List<Character>> positionDict = new Dictionary<Vector3Int, List<Character>>();
    public Dictionary<string, WayPoint> pathDict = new Dictionary<string, WayPoint>();
    public GameObject characterPrefab;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public Vector3Int GetPosition(string name)
    {
        Character c = dict[name];
        foreach (Vector3Int pos in positionDict.Keys) {
            if (positionDict[pos].Contains(c))
            {
                return pos;
            }
        }
        return new Vector3Int(-1000, -1000, -1000);
    }

    public void DestroyCharacter(string name)
    {
        Character destroyme = dict[name];
        Vector3Int position = GetPosition(name);
        dict.Remove(name);
        Vector3Int pos = GetPosition(name);
        if (pos.x > -1000 && pos.y > -1000 && pos.z > -1000)
        {
            positionDict[pos].Remove(destroyme);
            if (positionDict[pos].Count == 0) positionDict.Remove(pos);
        }
        destroyme.gameObject.SetActive(false);
        Destroy(destroyme.gameObject);
    }

    public void PositionCharacterOnMap(string name, Vector3Int position, Vector3 offset)
    {
        Character c = dict[name];
        RemoveFromMap(name);
        c.gameObject.SetActive(true);
        if (positionDict.ContainsKey(position))
        {
            positionDict[position].Add(c);
        }
        else
        {
            positionDict[position] = new List<Character>();
            positionDict[position].Add(c);
        }
        Vector3 bS = Director.inst.currentScene.voxelController.voxelSize;
        c.gameObject.transform.position = new Vector3(position.x * bS.x + offset.x, position.y * bS.y + offset.y, position.z * bS.z + offset.z);
    }

    public void setCharacterFacing(string name, int facing)
    {
        Character c = dict[name];
        if (facing == 0)
        {
            return;
        }
        else if (facing == 1)
        {
            c.facingX = 0;
            c.facingZ = 1;
        }
        else if (facing == 2)
        {
            c.facingX = 1;
            c.facingZ = 0;
        }
        else if(facing == 3)
        {
            c.facingX = 0;
            c.facingZ = -1;
        }
        else if(facing == 4)
        {
            c.facingX = 1;
            c.facingZ = 0;
        }
    }

    public void RemoveFromMap(string name)
    {
        Character c = dict[name];
        Vector3Int pos = GetPosition(name);
        dict[name].gameObject.SetActive(false);
        if (pos.x > -1000 && pos.y > -1000 && pos.z > -1000)
        {
            positionDict[pos].Remove(c);
            if (positionDict[pos].Count == 0)
            {
                positionDict.Remove(pos);
            }
        }
    }

    public void ClearMap()
    {
        positionDict.Clear();
        dict.Clear();
    }

    public void CreateCharacter(string name, Vector2 scale, bool revealsMap)
    {
        try
        {
            //Debug.Log(characterPrefab);
            GameObject newC = Instantiate(characterPrefab, new Vector3(0, 0, 0), Quaternion.identity);
            newC.name = "ch_" + name;
            newC.GetComponent<Character>().name = name;
            newC.GetComponent<Character>().revealsMap = revealsMap;
            newC.GetComponent<Character>().gameObject.transform.parent = this.transform;
            newC.GetComponentInChildren<MeshRenderer>().shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.ShadowsOnly;
            if (dict.ContainsKey(name))
            {
                RemoveFromMap(name);
                Destroy(dict[name]);
                dict.Remove(name);
            }
            dict[name] = newC.GetComponent<Character>();
        }
        catch (Exception e)
        {
            Debug.LogError("Error in CreateCharacter");
            Debug.LogError(e.Message);
        }
    }

    public void SetCharacterSprite(string name, Sprite sprite)
    {

        dict[name].SetSprite(sprite);
    }

    public void Tick(long tick)
    {
        foreach (KeyValuePair<string, Character> pair in dict)
        {
            pair.Value.Tick(tick);
        }
    }

    public void SetActive(bool value)
    {
        foreach (KeyValuePair<string, Character> go in dict)
        {
            go.Value.gameObject.SetActive(value);
        }
    }

    public void SetPosition(string name, Vector3Int position, Vector3? offset = null)
    {
        

    }

    public void DestroyPath(string name = null)
    {
        if (name == null) name = "__default__";
        if (!pathDict.ContainsKey("path_head_" + name)) return;
        WayPoint wp = pathDict[name];
        string _name = wp.name;
        while (wp != null)
        {
            WayPoint next = wp.next;
            Destroy(wp);
            pathDict.Remove(_name);
            _name = next.name;
            wp = next;
        }
    } 

    public void CreatePathHead(string name = null)
    {
        if (name == null) name = "__default__";
        if (pathDict.ContainsKey(name))
        {
            DeletePath(name);
        }
        DestroyPath(name);
        GameObject newObj = new GameObject(name);
        newObj.transform.SetParent(this.transform);
        WayPoint wp = newObj.AddComponent<WayPoint>();
        wp.tailFromHead = wp;
        wp.ticks = 0;
        pathDict[name] = wp;
        wp.transform.parent = transform;
    }

    public void AddPathNode(string pathName, Vector3 position, AnimationGroup animationGroup, int? ticks, float? sinMult = 0.0f, string script = null)
    {
        WayPoint head = pathDict[pathName];
        GameObject newObj = new GameObject("path_node_" + name + $"_({position.x}, {position.y}, {position.z}");
        newObj.transform.SetParent(this.transform);
        WayPoint wp = newObj.AddComponent<WayPoint>();
        wp.transform.localPosition = position;
        wp.animationGroup = animationGroup;
        if (script != null)
        {
            wp.executed = false;
            wp.script = script;
        }
        else
        {
            wp.executed = true;
        }
        if (ticks != null) wp.ticks = (int)ticks;
        else ticks = 50;
        if (sinMult != null) wp.sinMult = (float)sinMult;
        else sinMult = 0.0f;
        head.tailFromHead.next = wp;
        head.tailFromHead = wp;
    }

    public void AttachPath(string characterName, string pathName)
    {
        WayPoint head = pathDict[pathName];
        Character character = dict[characterName];
        head.transform.localPosition = character.transform.localPosition;
        character.lastPoint = head;
        character.nextPoint = head.next;
    }

    public void DeletePath(string pathName)
    {
        if (!pathDict.ContainsKey(pathName)) return;
        WayPoint head = pathDict[pathName];
        while (head)
        {
            WayPoint next = head.next;
            Destroy(head.gameObject);
            head = next;
        }
        pathDict.Remove(pathName);
    }
}

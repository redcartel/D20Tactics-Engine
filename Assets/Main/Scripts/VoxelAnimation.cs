using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class VoxelAnimation : MonoBehaviour
{
    public Material mat;
    public List<Texture2D> textures = new List<Texture2D>();
    public float interval;
    private float totalTime = 1;


    // Start is called before the first frame update
    void Start()
    {

    }

    public void Init()
    {
        totalTime = textures.Count * interval;
    }

    // Update is called once per frame
    float startTime;
    void Update()
    {
       
        if (textures.Count < 2) return;
        float deltaTime = (Time.time % totalTime) / interval;
        int frame = (int)deltaTime;
        //Debug.Log($"{deltaTime}");
        //Debug.Log($"{Time.time} % {totalTime} = {Time.time % totalTime}");
        mat.SetTexture("Texture2D_FBC26130", textures[frame]);
    }
}

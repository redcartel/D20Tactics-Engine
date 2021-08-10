using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Scene : MonoBehaviour
{
    public VoxelController voxelController;
    public CastController castController;
    public DialogController dialogController;
    public SetController setController;
    public LightsController lightsController;
    public AudioController audioController;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    public void Init()
    {
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void InstantiateComponents()
    {
        Scene motherScene = Director.inst.scenePrefab;
        voxelController = Instantiate(motherScene.voxelController, transform);
        castController = Instantiate(motherScene.castController, transform);
        dialogController = Instantiate(motherScene.dialogController, transform);
        setController = Instantiate(motherScene.setController, transform);
        lightsController = Instantiate(motherScene.lightsController, transform);
        audioController = Instantiate(motherScene.audioController, transform);
    }
}

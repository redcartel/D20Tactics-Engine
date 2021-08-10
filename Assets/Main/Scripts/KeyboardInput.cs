using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class KeyboardInput : MonoBehaviour
{
    public string state = "";

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // TODO: There is definitely a linear algebra way of making camera controls less terrible
    void Update()
    {
        // rotate camera clockwise
        if (Input.GetKeyDown(KeyCode.Q)) {
            RotateLeft();
        }
        // rotate camera counterclockwise
        if (Input.GetKeyDown(KeyCode.E)) {
            RotateRight();
        }
        // move camera left
        if (Input.GetKeyDown(KeyCode.LeftArrow) || Input.GetKeyDown(KeyCode.A))
        {
            MapLeft();
        }
        // move camera right
        if (Input.GetKeyDown(KeyCode.RightArrow) || Input.GetKeyDown(KeyCode.D))
        {
            MapRight();
        }
        // move camera up
        if (Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.W))
        {
            MapUp();
        }
        // move camera down
        if (Input.GetKeyDown(KeyCode.DownArrow) || Input.GetKeyDown(KeyCode.S))
        {
            MapDown();
        }
    }

    public void MapLeft(bool block = true)
    {
        Director.inst.BlockClicks(.1f);
        Vector3 newPos = CameraTarget.inst.transform.position;
        var angle = CameraTarget.inst.angle;
        if (0 <= angle && angle < 90) newPos = CameraTarget.inst.transform.position + new Vector3(-1, 0, 1);
        else if (90 <= angle && angle < 180) newPos = CameraTarget.inst.transform.position + new Vector3(1, 0, 1);
        else if (180 <= angle && angle < 270) newPos = CameraTarget.inst.transform.position + new Vector3(1, 0, -1);
        else newPos = CameraTarget.inst.transform.position + new Vector3(-1, 0, -1);
        CameraTarget.inst.transform.position = newPos;
    }

    public void MapRight(bool block = true)
    {
        Director.inst.BlockClicks(.1f);
        Vector3 newPos = CameraTarget.inst.transform.position;
        var angle = CameraTarget.inst.angle;
        if (0 <= angle && angle < 90) newPos = CameraTarget.inst.transform.position + new Vector3(1, 0, -1);
        else if (90 <= angle && angle < 180) newPos = CameraTarget.inst.transform.position + new Vector3(-1, 0, -1);
        else if (180 <= angle && angle < 270) newPos = CameraTarget.inst.transform.position + new Vector3(-1, 0, 1);
        else newPos = CameraTarget.inst.transform.position + new Vector3(1, 0, 1);
        CameraTarget.inst.transform.position = newPos;
    }

    public void MapUp(bool block = true)
    {
        Director.inst.BlockClicks(.1f);
        Vector3 newPos = CameraTarget.inst.transform.position;
        var angle = CameraTarget.inst.angle;
        if (0 <= angle && angle < 90) newPos = CameraTarget.inst.transform.position + new Vector3(1, 0, 1);
        else if (90 <= angle && angle < 180) newPos = CameraTarget.inst.transform.position + new Vector3(1, 0, -1);
        else if (180 <= angle && angle < 270) newPos = CameraTarget.inst.transform.position + new Vector3(-1, 0, -1);
        else newPos = CameraTarget.inst.transform.position + new Vector3(-1, 0, 1);
        CameraTarget.inst.transform.position = newPos;
    }

    public void MapDown(bool block = true)
    {
        Director.inst.BlockClicks(.1f);
        Vector3 newPos = CameraTarget.inst.transform.position;
        var angle = CameraTarget.inst.angle;
        if (0 <= angle && angle < 90) newPos = CameraTarget.inst.transform.position + new Vector3(-1, 0, -1);
        else if (90 <= angle && angle < 180) newPos = CameraTarget.inst.transform.position + new Vector3(-1, 0, 1);
        else if (180 <= angle && angle < 270) newPos = CameraTarget.inst.transform.position + new Vector3(1, 0, 1);
        else newPos = CameraTarget.inst.transform.position + new Vector3(1, 0, -1);
        CameraTarget.inst.transform.position = newPos;
    }

    public void RotateLeft(bool block = true)
    {
        Director.inst.BlockClicks(.1f);
        var angle = CameraTarget.inst.angle;
        if (0 <= angle && angle < 90) CameraTarget.inst.angle = 135;
        else if (90 <= angle && angle < 180) CameraTarget.inst.angle = 225;
        else if (180 <= angle && angle < 270) CameraTarget.inst.angle = 315;
        else CameraTarget.inst.angle = 45;
    }

    public void RotateRight(bool block = true)
    {
        Director.inst.BlockClicks(.1f);
        var angle = CameraTarget.inst.angle;
        if (0 <= angle && angle < 90) CameraTarget.inst.angle = 315;
        else if (90 <= angle && angle < 180) CameraTarget.inst.angle = 45;
        else if (180 <= angle && angle < 270) CameraTarget.inst.angle = 135;
        else CameraTarget.inst.angle = 225;
    }
}

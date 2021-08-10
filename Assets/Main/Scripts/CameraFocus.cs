using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraFocus : MonoBehaviour
{
    [SerializeField]
    CameraTarget target;
    public GameObject spot;

    public void Update()
    {
        this.transform.rotation = Quaternion.Euler(new Vector3(22.5f, target.angle, 0f));
        this.transform.position = target.transform.position + target.offset;
        spot.transform.position = this.transform.position;
        spot.transform.rotation = this.transform.rotation;
    }
}

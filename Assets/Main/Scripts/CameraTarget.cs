using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraTarget : MonoBehaviour
{
    public GameObject follow;
    public float angle;
    public Vector3 baseOffset = new Vector3(-5, 5, -5);
    public Vector3 offset;
    public static CameraTarget inst;

    public void Start()
    {
        inst = this;
    }

    public void StaticPosition(Vector3 pos)
    {
        follow = null;
        transform.position = pos;
    }

    public void Update()
    {
        if (follow != null) transform.position = transform.position + (follow.transform.position - transform.position) / 2;
        // FIXME
        //if (follow == null) return;
        //if ((transform.position - follow.transform.position).magnitude < 0.1f) transform.position = follow.transform.position;
        //else
        //{
        //    float delta = Time.deltaTime;
        //    if (delta >= .1) delta = 1f;
        //    Vector3 newPosition = (transform.position - follow.transform.position).normalized * delta * 10 + this.transform.position;
        //    if ((transform.position - newPosition).magnitude < 0.1f) transform.position = follow.transform.position;
        //    else transform.position = newPosition;
        //}
        if (0 <= angle && angle < 90)
        {
            this.offset = this.baseOffset;
        }
        else if (90 <= angle && angle < 180)
        {
            this.offset = new Vector3(baseOffset.x, baseOffset.y, -1 * baseOffset.z);
        }
        else if (180 <= angle && angle < 270)
        {
            this.offset = new Vector3(-1 * baseOffset.x, baseOffset.y, -1 * baseOffset.z);
        }
        else
        {
            this.offset = new Vector3(-1 * baseOffset.x, baseOffset.y, baseOffset.z);
        }
    }
}

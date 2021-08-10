using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AnimationGroup : MonoBehaviour
{
    public SimpleAnimation downRight;
    public SimpleAnimation downLeft;
    public SimpleAnimation upRight;
    public SimpleAnimation upLeft;

    public SimpleAnimation getAnimation(int xDirection, int zDirection, float cameraAngle = 45)
    {
        if (0 <= cameraAngle && cameraAngle < 90)
        {
            if (zDirection < 0) return downRight ?? downLeft ?? upRight ?? upLeft;
            else if (zDirection > 0) return upLeft ?? upRight ?? downLeft ?? downRight;
            else if (xDirection < 0) return downLeft ?? downRight ?? upLeft ?? upRight;
            else return upRight ?? upLeft ?? downRight ?? downLeft;
        }
        else if (90 <= cameraAngle && cameraAngle < 180)
        {
            if (xDirection < 0) return downRight ?? downLeft ?? upRight ?? upLeft;
            else if (xDirection > 0) return upLeft ?? upRight ?? downLeft ?? downRight;
            else if (zDirection > 0) return downLeft ?? downRight ?? upLeft ?? upRight;
            else return upRight ?? upLeft ?? downRight ?? downLeft;
        }
        else if (180 <= cameraAngle && cameraAngle < 270)
        {
            if (zDirection > 0) return downRight ?? downLeft ?? upRight ?? upLeft;
            else if (zDirection < 0) return upLeft ?? upRight ?? downLeft ?? downRight;
            else if (xDirection > 0) return downLeft ?? downRight ?? upLeft ?? upRight;
            else return upRight ?? upLeft ?? downRight ?? downLeft;
        }
        else
        {
            if (xDirection > 0) return downRight ?? downLeft ?? upRight ?? upLeft;
            else if (xDirection < 0) return upLeft ?? upRight ?? downLeft ?? downRight;
            else if (zDirection < 0) return downLeft ?? downRight ?? upLeft ?? upRight;
            else return upRight ?? upLeft ?? downRight ?? downLeft;
        }
    }
}

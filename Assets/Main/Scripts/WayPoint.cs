using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WayPoint : MonoBehaviour
{
    public WayPoint next;
    public WayPoint tailFromHead;
    public AnimationGroup animationGroup;
    public int ticks = 15;
    public float sinMult = 0;
    public float startTick = -1;
    public bool executed = true;
    public string script;
}
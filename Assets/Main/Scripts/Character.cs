using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Character : MonoBehaviour
{
    // Start is called before the first frame update
    public SpriteRenderer sr;
    public string name;
    public WayPoint lastPoint;
    public WayPoint nextPoint;
    public Vector3 baseCapsuleOffset;
    public Vector3 capsuleOffset;
    public Vector3 capsuleSize;
    public SpriteRenderer spriteRenderer;
    public bool resetCurrentAnimation = false;
    public bool revealsMap = false;
    public bool isVisible = false;
    public Vector3Int worldCoordinates;

    public int facingX = 0;
    public int facingZ = -1;
    public AnimationGroup animationGroup;

    public bool moved = true;
    public bool resetMoved = false;
    Vector3 lastKnownPosition = new Vector3(1000, 1000, 1000);

    public string moveCallback;

    public void SetSprite(Sprite sprite, bool? flip = null)
    {
        if (flip == true)
        {
            sr.flipX = true;
        }
        else if (flip == false)
        {
            sr.flipX = false;
        }

        sr.sprite = sprite;
    }

    public void UpdateWorldCoords()
    {
        Vector3 bS = Director.inst.currentScene.voxelController.voxelSize;
        int x = (int)(this.transform.position.x / bS.x);
        int y = (int)(this.transform.position.y / bS.y);
        int z = (int)(this.transform.position.z / bS.z);
        worldCoordinates = new Vector3Int(x, y, z);
    }


    //public void AttachAnimationGroup(AnimationGroup newGroup)
    //{
    //    DetachAnimation();  
    //    if (newAnimation != null && this.animationGroup == newGroup) newGroup.Attach(this, false);
    //    else if (newAnimation != null) newAnimation.Attach(this);
    //}

    //public void DetachAnimation()
    //{
    //    if (animation) animation.Detach(this);
    //}

    // TODO: Refactor this mess

    int? seeTicker;

    public void Tick(float tick)
    {
        if (spriteRenderer == null)
        {
            spriteRenderer = GetComponentInChildren<SpriteRenderer>();
            if (spriteRenderer == null) return;
        }
        if (nextPoint)
        {
            this.animationGroup = nextPoint.animationGroup;
            if (!lastPoint)
            {
                GameObject newPoint = new GameObject("get_last_point_" + name);
                lastPoint = newPoint.AddComponent<WayPoint>();
                lastPoint.startTick = tick;
                lastPoint.transform.position = this.transform.position;
            }

            float dX = nextPoint.transform.position.x - lastPoint.transform.position.x;
            float dZ = nextPoint.transform.position.z - lastPoint.transform.position.z;

            if (dX > 0) facingX = 1;
            else if (dX < 0) facingX = -1;
            else facingX = 0;

            if (dZ > 0) facingZ = 1;
            else if (dZ < 0) facingZ = -1;
            else facingZ = 0;

            int deltaTick = (int)(tick - lastPoint.startTick);
            Vector3 pos = lastPoint.transform.position + (nextPoint.transform.position - lastPoint.transform.position) * ((float)deltaTick / nextPoint.ticks);

            if (nextPoint.sinMult != 0)
            {
                float TotalDistance = (nextPoint.transform.position - lastPoint.transform.position).magnitude;
                if (TotalDistance < 0.0001f) TotalDistance = 0.0001f;
                float PosDistance = (pos - lastPoint.transform.position).magnitude;
                float percentComplete = PosDistance / TotalDistance;
                float radians = percentComplete * Mathf.PI;
                float ySin = Mathf.Sin(radians) * nextPoint.sinMult;
                pos = new Vector3(pos.x, pos.y + ySin, pos.z);
            }

            if (deltaTick >= nextPoint.ticks)
            {
                pos = nextPoint.transform.position;
                if (nextPoint.executed == false && nextPoint.script != null && nextPoint.script.Trim() != "")
                {
                    ScriptEngine.inst.ExecuteScript(nextPoint.script);
                }
                // TODO: sin wave jump
                if (nextPoint.next)
                {
                    lastPoint = nextPoint;
                    lastPoint.startTick = tick;
                    nextPoint = nextPoint.next;
                    animationGroup = nextPoint.animationGroup;
                }
                else
                {
                    nextPoint = null;
                    lastPoint = null;
                }
            }
            this.transform.localPosition = pos;
        }



        if (!animationGroup) return;
        bool reset = false;
        if (this.resetCurrentAnimation)
        {
            this.resetCurrentAnimation = false;
            reset = true;
        }
        bool result = animationGroup.getAnimation(facingX, facingZ, CameraTarget.inst.angle).Animate(spriteRenderer, tick, reset);
    }


    float startTime = 0f;
    MeshRenderer capsule = null;
    public void Update()
    {
        if (startTime == 0) startTime = Time.time;
        if (animationGroup || nextPoint)
        {
            float floatTick = (Time.time - startTime) * 60;
            Tick(floatTick);
        }

        // TODO: This capsule thing is a dumb hack to get shadows
        if (capsule == null)
        {
            capsule = GetComponentInChildren<MeshRenderer>();
        }
        if (capsule == null) return;

        if (0 <= CameraTarget.inst.angle && CameraTarget.inst.angle < 90)
        {
            capsuleOffset = baseCapsuleOffset;
        }
        else if (90 <= CameraTarget.inst.angle && CameraTarget.inst.angle < 180)
        {
            capsuleOffset = new Vector3(baseCapsuleOffset.x, baseCapsuleOffset.y, -1 * baseCapsuleOffset.z);
        }
        else if (180 <= CameraTarget.inst.angle && CameraTarget.inst.angle < 270)
        {
            capsuleOffset = new Vector3(baseCapsuleOffset.x * -1, baseCapsuleOffset.y, baseCapsuleOffset.z * -1);
        }
        else
        {
            capsuleOffset = new Vector3(baseCapsuleOffset.x * -1, baseCapsuleOffset.y, baseCapsuleOffset.z);
        }
        capsule.transform.localPosition = capsuleOffset;

        

        if (resetMoved) moved = false;
        if ((lastKnownPosition - this.transform.position).magnitude > .2)
        {
            moved = true;
        }

        if (moved)
        {
            UpdateWorldCoords();
        }

        if (!revealsMap && moved)
        {
            CheckSeen();
        }

        if (revealsMap)
        {
            foreach (Character ch in Director.inst.currentScene.castController.dict.Values)
            {
                if (!ch.revealsMap)
                {
                    ch.CheckSeen();
                }
            }
        }

        if (!isVisible)
        {
            spriteRenderer.enabled = false;
        }
        else
        {
            spriteRenderer.enabled = true;
        }
    }

    // TODO
    public void CharacterClick()
    {
        ScriptEngine.inst.CharacterClick(this.name);
    }

    static List<Vector3> angles;

    public void CheckSeen()
    {
        if (CanBeSeen())
        {
            isVisible = true;
        }
        else
        {
            isVisible = false;
        }
    }

    public bool CanBeSeen()
    {
        Vector3Int[] offsets = new Vector3Int[]
        {
            new Vector3Int(0,-1,0),
            new Vector3Int(1, 0, 0),
            new Vector3Int(-1, 0, 0),
            new Vector3Int(0, 0, 1),
            new Vector3Int(0, 0, -1),
            new Vector3Int(1, 1, 0),
            new Vector3Int(-1, 1, 0),
            new Vector3Int(0, 1, 1),
            new Vector3Int(0, 1, -1),
        };
        foreach (Vector3Int offset in offsets)
        {
            Vector3Int voxPos = this.worldCoordinates + offset;
            if (Director.inst.currentScene.voxelController.voxels.ContainsKey(voxPos)) {
                if (Director.inst.currentScene.voxelController.voxels[voxPos].anyFaceSeen())

                {
                    return true;
                }
            }
        }
        return false;
    }

    //public void See()
    //{
    //    if (lastKnownPosition == null || (this.transform.position - lastKnownPosition).magnitude > .2)
    //    {
    //        lastKnownPosition = this.transform.position;
    //        var eyes = new Vector3(transform.position.x, transform.position.y + 1.25f, transform.position.z);
    //        foreach (var posVox in Director.inst.currentScene.voxelController.unseenVoxels)
    //        {
    //            var pos = posVox.Key;
    //            var vox = posVox.Value;
    //            var direction = (vox.gameObject.transform.position - eyes).normalized;
    //            RaycastHit hit;
    //            bool ifhit = Physics.Raycast(eyes, direction, out hit, 15);
    //            if (ifhit)
    //            {
    //                Voxel v = hit.collider.gameObject.GetComponent<Voxel>();
    //                if (v.position == pos)
    //                {
    //                    v.See();
    //                }
    //            }
    //        }
    //    }
    //    //if (angles == null)
    //    //{
    //    //    angles = new List<Vector3>();
    //    //    for (var yAxis = 0; yAxis < 360; yAxis += 2)
    //    //    {
    //    //        for (var xAxis = -90; xAxis <= 90; xAxis += 2)
    //    //        {
    //    //            // TODO: this is not how spherical coordinates actually work
    //    //            var z = Mathf.Sin(yAxis);
    //    //            var x = Mathf.Cos(yAxis);
    //    //            var y = Mathf.Sin(xAxis);
    //    //            var d = (new Vector3(x, y, z)).normalized;
    //    //            angles.Add(d);
    //    //        }
    //    //    }
    //    //    Debug.Log($"{angles.Count} angles");
    //    //}

    //    //var head = new Vector3(this.transform.position.x, this.transform.position.y + 1, this.transform.position.z);

    //    //foreach (var angle in angles)
    //    //{
    //    //    RaycastHit hit;
    //    //    bool ifhit = Physics.Raycast(head, angle, out hit, 15);
    //    //    if (ifhit)
    //    //    {
    //    //        Voxel v = hit.collider.gameObject.GetComponent<Voxel>();
    //    //        if (v != null)
    //    //        {
    //    //            Debug.Log($"hit {angle}");
    //    //            v.See();
    //    //        }
    //    //    }
    //    //}
    //}
}

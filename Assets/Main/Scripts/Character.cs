using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// A character, also a huge friggin mess
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
    //public bool resetMoved = false;
    Vector3 lastKnownPosition = new Vector3(1000, 1000, 1000);

    public string moveCallback;

    float startTime = 0f;
    MeshRenderer capsule = null;

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

    public void Update()
    {
        Tick();
        CheckMoved();
        CheckVisible();
        PlaceShadowCapsuleHACK();
    }

    public void CharacterClick()
    {
        ScriptEngine.inst.CharacterClick(this.name);
    }

    public void UpdateWorldCoords()
    {
        Vector3Int oldWorldCoordinates = worldCoordinates;
        Vector3 bS = Director.inst.currentScene.voxelController.voxelSize;
        int x = (int)(this.transform.position.x / bS.x + .5);
        int y = (int)(this.transform.position.y / bS.y + .5);
        int z = (int)(this.transform.position.z / bS.z + .5);
        worldCoordinates = new Vector3Int(x, y, z);
        if (oldWorldCoordinates != worldCoordinates)
        {
            Director.inst.currentScene.castController.UpdateCharacterWorldPosition(name, worldCoordinates);
        }
    }

    public void PathAnimateTick(float tick)
    {
        if (nextPoint)
        {
            this.animationGroup = nextPoint.animationGroup;

            // if no previous waypoint is defined, create one at the character's current location
            if (!lastPoint)
            {
                GameObject newPoint = new GameObject("get_last_point_" + name);
                lastPoint = newPoint.AddComponent<WayPoint>();
                lastPoint.startTick = tick;
                lastPoint.transform.position = this.transform.position;
            }

            Vector3 lastToNextVector = nextPoint.transform.position - lastPoint.transform.position;

            // set character facing direction based on lastToNextVector direction

            if (lastToNextVector.x > 0) facingX = 1;
            else if (lastToNextVector.x < 0) facingX = -1;
            else facingX = 0;

            if (lastToNextVector.z > 0) facingZ = 1;
            else if (lastToNextVector.z < 0) facingZ = -1;
            else facingZ = 0;

            // calculate new character position based on number of ticks since lastPosition

            float segmentTick = (float)(tick - lastPoint.startTick);
            float segmentCompletePercentage = (float)(segmentTick / nextPoint.ticks);

            if (segmentCompletePercentage > 1.0f) segmentCompletePercentage = 1.0f;
            //Debug.Log(segmentCompletePercentage);

            Vector3 newPosition = lastPoint.transform.position + lastToNextVector * segmentCompletePercentage;

            // add sinMultiplier Y "bounce" to position
            if (nextPoint.sinMult != 0)
            {
                float radians = segmentCompletePercentage * Mathf.PI;
                float ySin = Mathf.Sin(radians) * nextPoint.sinMult;
                newPosition = new Vector3(newPosition.x, newPosition.y + ySin, newPosition.z);
            }

            // if segment is complete, possibly execute script and update next & last point
            if (segmentCompletePercentage >= 0.9999999f)
            {
                newPosition = nextPoint.transform.position;
                if (nextPoint.executed == false && nextPoint.script != null && nextPoint.script.Trim() != "")
                {
                    ScriptEngine.inst.ExecuteScript(nextPoint.script);
                }

                // remove last point
                Destroy(lastPoint.gameObject);

                if (nextPoint.next)
                {
                    lastPoint = nextPoint;
                    lastPoint.startTick = tick;
                    nextPoint = nextPoint.next;
                    animationGroup = nextPoint.animationGroup;
                }

                else
                {
                    // if complete, remove the final point
                    Destroy(nextPoint.gameObject);
                    nextPoint = null;
                    lastPoint = null;
                }
            }
            this.transform.position = newPosition;
        }
    }

    void AnimationGroupTick(float tick) {

        if (!animationGroup) return;
        bool reset = false;
        if (this.resetCurrentAnimation)
        {
            this.resetCurrentAnimation = false;
            reset = true;
        }
        animationGroup.getAnimation(facingX, facingZ, CameraTarget.inst.angle).Animate(spriteRenderer, tick, reset);
    }


    // Handle animation and movement along path
    public void Tick()
    {
        if (spriteRenderer == null)
        {
            spriteRenderer = GetComponentInChildren<SpriteRenderer>();
            if (spriteRenderer == null) return;
        }
        if (startTime == 0) startTime = Time.time;

        float tick = (Time.time - startTime) * 60;
        PathAnimateTick(tick);
        AnimationGroupTick(tick);
    }

    // if a character has moved more than a delta, update their world position and check
    // if they should be shown or hidden or if others should be shown or hidden based
    // on tile reveal state
    void CheckMoved(float moveDelta = .2f)
    {
        //if (resetMoved) moved = false;
        if ((lastKnownPosition - this.transform.position).magnitude > moveDelta)
        {
            moved = true;
            lastKnownPosition = this.transform.position;
        }

        if (moved)
        {
            UpdateWorldCoords();

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
        }
    }

    // show or hide the character based on isVisible
    void CheckVisible()
    {
        if (!isVisible)
        {
            spriteRenderer.enabled = false;
            if (capsule) capsule.enabled = false;
        }
        else
        {
            spriteRenderer.enabled = true;
            if (capsule) capsule.enabled = true;
        }
    }

    // place the hacky shadow-generating capsule object
    void PlaceShadowCapsuleHACK()
    {
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
    }

    // Check if non-map revealing character should be visible based on proximity to
    // revealed tiles;
    public void CheckSeen()
    {
        if (revealsMap) return;
        if (NearVisibleTile())
        {
            isVisible = true;
        }
        else
        {
            isVisible = false;
        }
    }

    public bool NearVisibleTile()
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
            if (Director.inst.currentScene.voxelController.voxels.ContainsKey(voxPos))
            {
                if (Director.inst.currentScene.voxelController.voxels[voxPos].anyFaceSeen())

                {
                    return true;
                }
            }
        }
        return false;
    }

    
}

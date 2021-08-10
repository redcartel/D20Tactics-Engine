using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SimpleAnimation : MonoBehaviour
{
    [SerializeField]
    public List<Sprite> sprites = new List<Sprite>();
    [SerializeField]
    public List<float> ticks = new List<float>();
    [SerializeField]
    public List<bool> flips = new List<bool>();
    [SerializeField]
    public List<Vector3> offsets = new List<Vector3>();
    [SerializeField]
    public bool loop = true;
    [SerializeField]

    //public Dictionary<string, SpriteRenderer> renderers = new Dictionary<string, SpriteRenderer>();
    public Dictionary<SpriteRenderer, float> startTicks = new Dictionary<SpriteRenderer, float>();

    public void Normalize()
    {
        for (int i = ticks.Count; i < sprites.Count; i++)
        {
            if (i == 0)
            {
                ticks.Add(25);
            }
            else
            {
                ticks.Add(ticks[i - 1] + 25);
            }
        }
        for (int i = flips.Count; i < sprites.Count; i++)
        {
            if (i == 0)
            {
                flips.Add(false);
            }
            else
            {
                flips.Add(flips[i - 1]);
            }
        }
        for (int i = offsets.Count; i < sprites.Count; i++)
        {
            if (i == 0)
            {
                offsets.Add(new Vector3(0, 0, 0));
            }
            else
            {
                offsets.Add(offsets[i - 1]);
            }
        }
        if (sprites.Count < ticks.Count)
        {
            ticks = ticks.GetRange(0, sprites.Count);
        }
        if (sprites.Count < offsets.Count)
        {
            offsets = offsets.GetRange(0, sprites.Count);
        }
        if (sprites.Count < flips.Count)
        {
            flips = flips.GetRange(0, sprites.Count);
        }
    }

    //public void Attach(Character character, bool restartTicks = true)
    //{
    //    if (character.animation == this) return;
    //    renderers[character.name] = character.gameObject.GetComponentInChildren<SpriteRenderer>();
    //    character.animation = this;
    //    if (restartTicks || !startTicks.ContainsKey(character.name))
    //    {
    //        startTicks[character.name] = -1;
    //    }
    //}

    //public void Detach(Character character)
    //{
    //    renderers.Remove(character.name);
    //    character.animation = null;
    //    //startTicks.Remove(character.name);
    //}

    public bool Animate(SpriteRenderer spriteRenderer, float tick, bool resetTicks = false)
    {
        if (!startTicks.ContainsKey(spriteRenderer) || startTicks[spriteRenderer] == -1 || resetTicks)
        {
            Debug.Log("Animate reset animation");
            startTicks[spriteRenderer] = tick;
        }
        
        if (sprites.Count == 0) return false;
        float deltaTick;
        if (!loop)
        {
            deltaTick = tick - startTicks[spriteRenderer];
            if (deltaTick > ticks[ticks.Count - 1]) return false;
        }
        else
        {
            deltaTick = tick % ticks[ticks.Count - 1];
            //Debug.Log($"({tick} - {startTicks[characterName]}) % {ticks[ticks.Count - 1]} = {deltaTick}");
        }

        int _tick;
        //Debug.Log($"tick {tick} startTicks[{name}] {startTicks[name]} deltaTick {deltaTick}, ticks[1] {ticks[1]}");
        for (_tick = 0; _tick < ticks.Count; _tick++)
        {
            if (deltaTick >= ticks[_tick])
            {
                continue;
            }
            else
            {
                break;
            }
        }
        if (_tick >= sprites.Count) _tick = sprites.Count - 1;

        spriteRenderer.gameObject.transform.localPosition = offsets[_tick];
        spriteRenderer.flipX = flips[_tick];
        //Debug.Log(deltaTick);
        spriteRenderer.sprite = sprites[_tick];
        return true;
    }

    public void AddFrame(Sprite sprite, int? tick = null, bool? flip = false, Vector3? offset = null)
    {
        Normalize();
        sprites.Add(sprite);
        if (tick == null)
        {
            if (ticks.Count == 0)
            {
                ticks.Add(25);
            }
            else if (ticks.Count == 1)
            {
                ticks.Add(50);
            }
            else
            {
                ticks.Add(2 * ticks[ticks.Count - 1] - ticks[ticks.Count - 2]);
            }
        }
        else
        {
            ticks.Add((int)tick);
        }

        if (flip == null)
        {
            if (flips.Count == 0)
            {
                flips.Add(false);
            }
            else
            {
                flips.Add(flips[flips.Count - 1]);
            }
        }
        else
        {
            flips.Add((bool)flip);
        }

        if (offset == null)
        {
            if (offsets.Count == 0)
            {
                offsets.Add(new Vector3(0, 0, 0));
            }
            else
            {
                offsets.Add(offsets[offsets.Count - 1]);
            }
        }
        else
        {
            offsets.Add((Vector3)offset);
        }
    }
}
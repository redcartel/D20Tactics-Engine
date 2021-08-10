using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterSprite : MonoBehaviour
{
    SpriteRenderer sr;
    public Character character;
    // Start is called before the first frame update
    void Start()
    {
        sr = GetComponent<SpriteRenderer>();
    }

    private void OnMouseDown()
    {
        if (!Director.inst.blockClicks)
        {
            character.CharacterClick();
        }
    }
}

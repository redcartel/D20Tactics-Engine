using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterSprite : MonoBehaviour
{
    public Character character;

    private void OnMouseDown()
    {
        if (!Director.inst.blockClicks)
        {
            character.CharacterClick();
        }
    }
}

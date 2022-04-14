using System.Collections;
using System.Collections.Generic;
using UnityEngine.UIElements;
using UnityEngine;
using TMPro;

public class Dialog : MonoBehaviour
{
    public TMP_Text text;
    public RectTransform rt;
    // Start is called before the first frame update
    void Start()
    {
        if (rt == null) rt = this.GetComponent<RectTransform>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void SetPosition(int x, int y)
    {
        rt.anchoredPosition = new Vector2(x, y);
    }

    public void SetSize(int x, int y)
    {
        rt.sizeDelta = new Vector2(x, y);
    }

    public void SetText(string dialogText)
    {
        text.text = dialogText;
    }

    public void SpellOut(string message, float letterPause, bool clear = true)
    {
        StartCoroutine(TypeText(message, letterPause, clear));
    }

    IEnumerator TypeText(string message, float letterPause, bool clear = true)
    {
        if (clear) text.text = "";
        foreach (char letter in message.ToCharArray())
        {
            text.text += letter;
            //if (sound)
            //    audio.PlayOneShot(sound);
            yield return 0;
            yield return 0;
            yield return new WaitForSeconds(letterPause);
        }
    }
}

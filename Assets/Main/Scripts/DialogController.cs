using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class DialogController : MonoBehaviour
{
    [SerializeField]
    public GameObject dialogPrefab;
    public GameObject portraitDialogPrefab;
    public GameObject portraitDialogPrefabRight;
    public GameObject buttonPrefab;
    public GameObject panelPrefab;
    public GameObject imagePrefab;
    public static DialogController inst;
    public Canvas canvas;
    public Texture2D dummy;
    public Dictionary<string, Dialog> dict = new Dictionary<string, Dialog>();
    public Dictionary<string, GameObject> images = new Dictionary<string, GameObject>();

    // TODO: This all needs to be ten times as robust
    // TODO: Original art for boxes

    // Start is called before the first frame update
    void Start()
    {
        inst = this;
        //canvas = GetComponentInParent<Canvas>();
        //Dialog one = CreatePortraitDialog();
        //one.SetPosition(800, 400);
        //one.SetSize(300, 200);
        //one.SetText("This is the big plot moment, what do you choose?");

        //ButtonScript button = AddButtonToDialog(null, "Good", new Vector2(32, 32), new Vector2(60, 32), "console.log('chose good')");
        //ButtonScript button2 = AddButtonToDialog(null, "Evil, Baby!", new Vector2(144, 32), new Vector3(120, 32), "console.log('evil, hell yeah!')");
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void DestroyDialog(string name)
    {
        if (!dict.ContainsKey(name)) return;
        Destroy(dict[name].gameObject);
        dict.Remove(name);
    }

    public Dialog CreateDialog(string name = null, string message = null)
    {
        if (name == null) name = "__default__";
        if (message == null) message = "";
        GameObject dialog = Instantiate(dialogPrefab);
        dialog.SetActive(true);
        dialog.transform.SetParent(canvas.transform);
        Dialog di = dialog.GetComponent<Dialog>();
        dict[name] = di;
        return di;
    }

    public Dialog CreatePortraitDialog(string name = null, string message = null, Texture portrait = null)
    {
        if (name == null) name = "__default__";
        DestroyDialog(name);
        if (message == null) message = "";
        GameObject dialog = Instantiate(portraitDialogPrefab);
        dialog.SetActive(true);
        dialog.transform.SetParent(canvas.transform);
        Dialog di = dialog.GetComponent<Dialog>();
        // if (portrait != null) di.SetPortrait(portrait);
        dict[name] = di;
        return di;
    }

    public Dialog CreatePortraitDialogRight(string name = null, string message = null, Texture portrait = null)
    {
        if (name == null) name = "__default__";
        DestroyDialog(name);
        if (message == null) message = "";
        GameObject dialog = Instantiate(portraitDialogPrefabRight);
        dialog.SetActive(true);
        dialog.transform.SetParent(canvas.transform);
        Dialog di = dialog.GetComponent<Dialog>();
        if (portrait != null) di.SetPortrait(portrait);
        dict[name] = di;
        return di;
    }

    public ButtonScript AddButtonToDialog(string name, string buttonText, Vector2 buttonPosition, Vector2 buttonSize, string buttonScript)
    {
        if (name == null) name = "__default__";
        ButtonScript button = Instantiate(buttonPrefab).GetComponent<ButtonScript>();
        button.gameObject.SetActive(true);
        button.gameObject.transform.SetParent(dict[name].gameObject.transform);
        button.GetComponent<RectTransform>().anchoredPosition = buttonPosition;
        button.GetComponent<RectTransform>().sizeDelta = buttonSize;
        button.GetComponentInChildren<TMP_Text>().text = buttonText;
        button.onExecute = buttonScript;
        return button;
    }

    public GameObject CreateUIImage(string name, Sprite sprite)
    {
        if (images.ContainsKey(name))
        {
            Destroy(images[name]);
        }
        GameObject go = Instantiate(imagePrefab);
        go.SetActive(true);
        go.transform.parent = canvas.transform;
        Image image = go.GetComponent<Image>();
        image.sprite = sprite;
        images[name] = go;
        return go;
    }

    public void PlaceUIImage(string name, Rect rect)
    {
        RectTransform rt = images[name].GetComponent<RectTransform>();
        rt.anchoredPosition = new Vector2(rect.x, rect.y);
        rt.sizeDelta = new Vector2(rect.width, rect.height);
    }

    public void DestroyImage(string name)
    {
        Destroy(images[name]);
        images.Remove(name);
    }
}

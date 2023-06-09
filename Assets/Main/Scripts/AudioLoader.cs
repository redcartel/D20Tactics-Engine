using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// Loads an audio clip into the AssetLibrary
public class AudioLoader : MonoBehaviour
{
    public AudioImporter importer;
    AudioClip audioClip;

    // TODO: WINDOWS SUPPORT TEST!!!
    private IEnumerator LoadAudioCoroutine(string path)
    {
        string url = "file://" + path;

        using (WWW www = new WWW(url))
        {
            yield return www;
            audioClip = www.GetAudioClip(false, false);
            AssetLibrary.inst.sounds[name] = audioClip;
            AssetLibrary.inst.awaitingSounds.Remove(name);
        }
    }

    public void LoadAudio(string _name, string path)
    {
        name = _name;
        AssetLibrary.inst.awaitingSounds[name] = true;
        StartCoroutine(LoadAudioCoroutine(path));
    }
}

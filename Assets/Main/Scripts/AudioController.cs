using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AudioController : MonoBehaviour
{
    public GameObject audioSourcePrefab;

    public Dictionary<string, AudioSource> sources = new Dictionary<string, AudioSource>();


    string NewAudioSource(string name = null, AudioClip audio = null, bool? loop = null, Vector3? position = null)
    {
        if (name == null) name = $"__default__";
        if (sources.ContainsKey(name))
        {
            Destroy(sources[name]);
            sources.Remove(name);
        }
        GameObject go = Instantiate(audioSourcePrefab, this.transform);
        go.name = name;
        AudioSource source = go.GetComponent<AudioSource>();
        if (loop == null) loop = false;
        source.loop = (bool)loop;
        if (audio != null) source.clip = audio;
        if (position != null) source.transform.localPosition = (Vector3)position;
        sources[name] = source;
        return name;
    }

    // TODO: Should be a coroutine
    public string Play(string name = null, string soundName = null, bool? loop = null, Vector3? position = null)
    {
        AudioSource aus;
        if (name == null) name = "__default__";
        if (soundName != null)
        {
            if (AssetLibrary.inst.awaitingSounds.ContainsKey(soundName))
            {
                float time = Time.time;
                //while (Time.time - time < 30 && AssetLibrary.inst.awaitingSounds.ContainsKey(soundName)) ;
                //if (Time.time - time >= 30)
                //{
                    Debug.LogError($"Audio file load {soundName} timeout");
                //}
                return null;
            }
            else if (!AssetLibrary.inst.sounds.ContainsKey(soundName))
            {
                Debug.LogError($"No such sound as {soundName}");
                return null;
            }
        }
        if (!sources.ContainsKey(name))
        {
            name = NewAudioSource(name);
        }

        if (loop != null) sources[name].loop = (bool)loop;
        if (soundName != null) sources[name].clip = AssetLibrary.inst.sounds[soundName];
        if (position != null) sources[name].transform.localPosition = (Vector3)position;

        sources[name].Play();
        return name;
    }

    public void Stop(string name)
    {
        if (name == null) name = "__default__";
        if (sources.ContainsKey(name))
        {
            sources[name].Stop();
        }
    }
}
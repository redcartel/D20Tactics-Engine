using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LightsController : MonoBehaviour
{
    public Light directionalLight;
    public Light pointLight;
    public Light spotLight;

    public Dictionary<string, Light> lights = new Dictionary<string, Light>();
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void CreateDirectionalLight(string name, Vector3 rotation, float intensity = 1.0f, Color32? color = null)
    {

        Light newLight = Instantiate(directionalLight, Vector3.zero, Quaternion.Euler(rotation), this.transform);
        newLight.name = name;
        newLight.gameObject.SetActive(true);
        newLight.intensity = intensity;
        if (color != null)
            newLight.color = (Color32)color;
        lights[name] = newLight;
    }

    public void CreatePointLight(string name, Vector3 position, float intensity = 1.0f, float range = 10.0f, Color32? color = null)
    {

        Light newLight = Instantiate(pointLight, position, new Quaternion(0,0,0,0), this.transform);
        newLight.name = name;
        newLight.gameObject.SetActive(true);
        newLight.intensity = intensity;
        if (color != null)
            newLight.color = (Color32)color;
        newLight.range = range;
        lights[name] = newLight;
    }

    public void CreateSpotlight(string name, Vector3 position, Vector3 rotation, float intensity = 1.0f, float range = 10.0f, float angle = 21.802f, Color32? color = null)
    {
        Light newLight = Instantiate(spotLight, position, Quaternion.Euler(rotation), this.transform);
        newLight.name = name;
        newLight.gameObject.SetActive(true);
        newLight.intensity = intensity;
        newLight.innerSpotAngle = angle;
        if (color != null)
            newLight.color = (Color32)color;
        newLight.range = range;
        lights[name] = newLight;
    }

    public void KillTheLights()
    {
        foreach (Light light in lights.Values)
        {
            light.gameObject.SetActive(false);
        }
    }

    public void SetLightActive(string name, bool active = true)
    {
        lights[name].gameObject.SetActive(active);
    }
}

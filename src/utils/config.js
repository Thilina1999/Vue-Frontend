import YAML from 'yaml'

export const loadConfig = async (key) => {
  const res = await fetch(import.meta.env.VITE_YAML_URL)
  const text = await res.text()
  const config = YAML.parse(text)

  return config[key]
}


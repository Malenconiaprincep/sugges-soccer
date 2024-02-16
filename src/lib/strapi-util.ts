export function getValueByKeyPath(data: any, keypath: string) {
  const keys = keypath.split(".")
  let result = data
  keys.forEach((key) => {
    try {
      if (result.data) {
        if (Array.isArray(result.data)) {
          result = result.data[0].attributes[key]
        } else {
          result = result.data.attributes[key]
        }
      }
      if (result.attributes) {
        result = result.attributes[key]
      }
    } catch (e) {}
  })
  return result
}

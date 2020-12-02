const query = () => {
  let params = {}
  let search =
    typeof window !== 'undefined'
      ? window.location.search
        ? window.location.search.substring(1)
        : ''
      : ''
  let parts = search.split('&')
  parts.map((part) => {
    let keyValue = part.split('=')
    params[keyValue[0]] = keyValue[1]
  })
  return params
}

export default query()

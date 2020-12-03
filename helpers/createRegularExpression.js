export const removeAllExcept = (chars) => {
  // str.replace(/[^a]/g, "").length
  // new RegExp('[^a]', "g")
  return new RegExp(`[^${chars}]`, 'g')
}

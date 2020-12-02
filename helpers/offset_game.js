export default (offsets, withATwist) => {
  let iterations = 0
  let offset = 0
  while (offset < offsets.length) {
    let nextOffset = offsets[offset]
    if (withATwist) {
      offsets[offset] = (nextOffset < 3) ? offsets[offset] + 1 : offsets[offset] - 1
    } else {
      offsets[offset]++
    }
    offset += nextOffset
    iterations++
  }
  return iterations
}

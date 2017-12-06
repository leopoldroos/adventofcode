const getIndexForBiggestBlock = (banks) => {
  return banks.indexOf(Math.max(...banks))
}

const distribute = (index, banks) => {
  let blocks = banks[index]
  banks[index] = 0
  let wanderingIndex = index
  while (blocks > 0) {
    wanderingIndex++
    banks[(wanderingIndex % banks.length)]++
    blocks--
  }
  return banks
}

let checksums = []
const isCurrentBanksLooped = (banks) => {
  let checksum = banks.slice(0) // clone
  checksum = checksum.map(block => block.toString()).join()
  let loopIdentifiedAtIndex = checksums.indexOf(checksum)
  if (loopIdentifiedAtIndex !== -1) {
    return loopIdentifiedAtIndex
  }
  checksums.push(checksum)
  return false
}

export const reallocation = (banks) => {
  let cycles = 0
  let loopIdentifiedAtIndex = false
  let index
  isCurrentBanksLooped(banks) // Just to push the first banks-state to checksums
  while (loopIdentifiedAtIndex === false) {
    cycles++
    index = getIndexForBiggestBlock(banks)
    banks = distribute(index, banks)
    loopIdentifiedAtIndex = isCurrentBanksLooped(banks)
  }
  return {cycles, loopedBanks: banks, loopIdentifiedAtIndex}
}

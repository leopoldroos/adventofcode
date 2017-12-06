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
  if (checksums.indexOf(checksum) !== -1) {
    return true
  }
  checksums.push(checksum)
  return false
}

export const reallocation = (banks) => {
  let cycles = 0
  let loopIdentified = false
  let index
  while (!loopIdentified) {
    cycles++
    index = getIndexForBiggestBlock(banks)
    banks = distribute(index, banks)
    loopIdentified = isCurrentBanksLooped(banks)
  }
  return {cycles, loopedBanks: banks}
}

export const countValidByWord = (passphrases) => {
  let numberOfValids = 0
  for (let i = 0; i < passphrases.length; i++) {
    let words = passphrases[i].split(' ')
    words.sort()
    let valid = true
    for (let j = 0; j < (words.length - 1); j++) {
      if (words[j] === words[j + 1]) {
        valid = false
        break
      } else {
      }
    }
    if (valid) numberOfValids++
  }
  return numberOfValids
}

const checkIfAnagrams = (a, b) => {
  let aLetters = a.split('')
  aLetters.sort()
  let bLetters = b.split('')
  bLetters.sort()
  return aLetters.join() === bLetters.join()
}

const checkIfAnagramExistInWords = (word, words) => {
  for (let i = 0; i < words.length; i++) {
    if (checkIfAnagrams(word, words[i])) return true
  }
  return false
}

export const countValidByAnagram = (passphrases) => {
  let numberOfValids = 0
  passphrases.map(passphrase => {
    let words = passphrase.split(' ')
    let valid = true
    while (valid && words.length !== 0) {
      let word = words.pop()
      if (checkIfAnagramExistInWords(word, words)) {
        valid = false
      }
    }
    if (valid) numberOfValids++
  })
  return numberOfValids
}

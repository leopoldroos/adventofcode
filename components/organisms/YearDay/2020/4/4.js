import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'

export const testData = [
  'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
  'byr:1937 iyr:2017 cid:147 hgt:183cm',
  '',
  'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884',
  'hcl:#cfa07d byr:1929',
  '',
  'hcl:#ae17e1 iyr:2013',
  'eyr:2024',
  'ecl:brn pid:760753108 byr:1931',
  'hgt:179cm',
  '',
  'hcl:#cfa07d eyr:2025 pid:166559648',
  'iyr:2011 ecl:brn hgt:59in',
]

export const requiredProps = {
  byr: (value) => {
    let year = parseInt(value, 10)
    return year >= 1920 && year <= 2002
  }, // (Birth Year)
  iyr: (value) => {
    let year = parseInt(value, 10)
    return year >= 2010 && year <= 2020
  }, // (Issue Year)
  eyr: (value) => {
    let year = parseInt(value, 10)
    return year >= 2020 && year <= 2030
  }, // (Expiration Year)
  hgt: (value) => {
    const type = value.substr(-2)
    const val = value.substr(0, value.length - 2)

    let height = parseInt(val, 10)
    switch (type.toLowerCase()) {
      case 'cm':
        return height >= 150 && height <= 193
      case 'in':
        return height >= 59 && height <= 76
      default:
        return false
    }
  }, // (Height)
  hcl: (value) => {
    return /^#[0-9A-F]{6}$/i.test(value)
  }, // (Hair Color)
  ecl: (value) => {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
  }, // (Eye Color)
  pid: (value) => {
    return /^\d{9}?$/.test(value)
  }, // (Passport ID)
}
// 'cid', // (Country ID)

export const prepareData = (data) => {
  let passports = []
  let passport = {}
  data.forEach((line) => {
    if (line.length === 0) {
      passports.push({ ...passport })
      passport = {}
      return
    }
    line.split(' ').forEach((prop) => {
      const [name, value] = prop.split(':')
      passport[name] = value
    })
  })
  passports.push({ ...passport })
  return passports
}

export const validate = (data) => {
  const valids = data.reduce((sum, passport) => {
    let i = 0
    let valid = true
    const requiredPropNames = Object.keys(requiredProps)
    while (i < requiredPropNames.length && valid) {
      const requiredPropName = requiredPropNames[i]
      const value = passport[requiredPropName]
      if (typeof value === 'undefined') {
        valid = false
      }
      i++
    }
    return sum + valid
  }, 0)
  return valids
}

export const validateTwo = (data) => {
  const valids = data.reduce((sum, passport) => {
    let i = 0
    let valid = true
    const requiredPropNames = Object.keys(requiredProps)
    while (i < requiredPropNames.length && valid) {
      const requiredPropName = requiredPropNames[i]
      const value = passport[requiredPropName]
      if (typeof value === 'undefined') {
        valid = false
      } else {
        const validator = requiredProps[requiredPropName]
        console.log({ validator, value, requiredPropName })
        if (!validator(value)) {
          valid = false
        }
      }
      i++
    }
    return sum + valid
  }, 0)
  return valids
}

const Description = styled(Text)``

const Day4 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    setResultOne(validate(preparedData))
    setResultTwo(validateTwo(preparedData))
  }

  const taskDescription = `Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?`

  return (
    <div>
      <p>
        <InputArea onChange={setInputData} defaultValue={inputData}></InputArea>
      </p>
      <p>
        <Description>{taskDescription}</Description>
      </p>
      <RunButton onClick={onRun} />
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  )
}
export default Day4

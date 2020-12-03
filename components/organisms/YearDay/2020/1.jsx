import React, {useState} from 'react'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import styled from 'styled-components'

const testData = [1721, 979, 366, 299, 675, 1456]

const StyledButton = styled(Button.DefaultButton)`
color: #fff;`

const InputArea = styled.textarea`
width: -webkit-fill-available;
`
const Day1 = () => {
  const [inputData, setInputData] = useState(testData)

  const onRun = () => {
    console.log('Lets run!')
  }
  return (
    <div>
      <p>Data:</p>
      <p><InputArea defaultValue={inputData}></InputArea></p>
      <StyledButton label="Run!" onClick={onRun} />
    </div>
  )
}
export default Day1
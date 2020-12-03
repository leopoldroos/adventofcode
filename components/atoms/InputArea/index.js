import React from 'react'
import styled from 'styled-components'

const StyledTextArea = styled.textarea`
  width: -webkit-fill-available;
`
const InputArea = ({ onChange, defaultValue }) => {
  return (
    <StyledTextArea
      onChange={(e) => {
        const val = e.target.value.trim().split('\n')
        onChange(val)
      }}
      defaultValue={defaultValue.join('\r\n')}
    ></StyledTextArea>
  )
}
export default InputArea

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
      defaultValue={
        Array.isArray(defaultValue) ? defaultValue.join('\r\n') : defaultValue
      }
    ></StyledTextArea>
  )
}
export default InputArea

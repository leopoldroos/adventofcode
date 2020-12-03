import React from 'react'
import Button from '@/components/atoms/Button'
import styled from 'styled-components'

const StyledButton = styled(Button.DefaultButton)`
  color: #fff;
  &:focus {
    border: none;
    outline: none;
  }
  &:active {
    background-color: #999;
    outline: none;
  }
`

const RunButton = ({ onClick }) => {
  return <StyledButton label="Run!" onClick={onClick} />
}
export default RunButton

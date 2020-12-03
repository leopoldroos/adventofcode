import React from 'react'
import Text from '@/components/atoms/Text'
import styled from 'styled-components'

const Result = styled(Text)`
  display: flex;
  font-weight: bold;
`
const Json = styled.pre``

const StyledResults = styled.div`
  border-top: 1px solid black;
`

const Results = ({ resultOne, resultTwo, resultOneMeta, resultTwoMeta }) => {
  return (
    <StyledResults>
      <Result>{resultOne !== null ? resultOne.toString() : 'no result'}</Result>
      {resultOneMeta && <Json>{JSON.stringify(resultOneMeta)}</Json>}
      <Result>{resultTwo !== null ? resultTwo.toString() : 'no result'}</Result>
      {resultTwoMeta && <Json>{JSON.stringify(resultTwoMeta)}</Json>}
    </StyledResults>
  )
}
export default Results

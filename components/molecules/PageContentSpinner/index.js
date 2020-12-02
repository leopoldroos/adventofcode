import React from 'react'
import styled from 'styled-components'
import Spinner from '@/components/atoms/Spinner'

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  position: relative;
`

const PageContentSpinner = () => (
  <Container data-cy="page-content-spinner">
    <Spinner />
  </Container>
)
export default PageContentSpinner

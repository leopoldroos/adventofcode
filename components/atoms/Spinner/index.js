import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`
const Spinner = styled.div`
  position: relative;
  border: 0.2em solid ${(props) => props.theme.palette.negativeGrey};
  border-bottom-color: ${(props) => props.theme.palette.primary};
  border-radius: 50%;
  margin: 0 auto;
  width: ${({ size }) => (size ? `${size}em` : '1em')};
  height: ${({ size }) => (size ? `${size}em` : '1em')};
  animation: ${spin} 1s linear infinite;
`
Spinner.propTypes = {
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}
export default Spinner

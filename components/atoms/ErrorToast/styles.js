import styled, { keyframes, css } from "styled-components";
const slideOutLeft = keyframes`
  from {
    transform: translate(0);
  }
  to {
    transform: translate(-100%);
  }
`;
const slideInLeft = keyframes`
  from {
    transform: translate(-100%);
  }
  to {
    transform: translate(0%);
  }
`;
export const ANIMATION_TIME = 200;
const slideInLeftAnimation = ({ animated }) => css`
  ${animated ? slideInLeft : slideOutLeft} ${ANIMATION_TIME}ms
`;
export const Toast = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.palette.positivePink};
  padding: ${({ theme }) => `${theme.spacing.px10} ${theme.spacing.px20}`};
  margin-top: ${({ theme }) => theme.spacing.px10};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  animation: ${slideInLeftAnimation};
`;

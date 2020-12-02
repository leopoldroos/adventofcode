import styled, { css } from "styled-components";

const DefaultStyledButton = styled.button`
  cursor: pointer;
  width: ${(props) => (props.slim ? "auto" : "100%")};
  ${({ options }) =>
    options.maxWidth &&
    css`
      max-width: ${options.maxWidth};
    `};
  padding: 15px 20px;
  border-radius: 30px;
  color: #fff;
  background-color: #222;
  border: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    color: ${(props) => props.theme.palette.disabled.color};
    background-color: ${(props) => props.theme.palette.disabled.background};
    opacity: 0.5;
    cursor: default;
  }
`;
const IconContainer = styled.span`
  margin-left: ${({ theme }) => theme.spacing.px10};
`;
DefaultStyledButton.IconContainer = IconContainer;
export default DefaultStyledButton;

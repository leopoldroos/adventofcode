import styled, { css } from "styled-components";

const IconStyledButton = styled.button`
  max-width: 100%;
  padding: ${({ options }) => options.padding || "15px"};
  border-radius: ${({ options }) => options.radius || "30px"};
  color: #fff;
  background-color: #222;
  border: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const IconContainer = styled.span`
  display: flex;
  width: ${({ iconSize }) => iconSize.width};
  height: ${({ iconSize }) => iconSize.height};
`;
IconStyledButton.IconContainer = IconContainer;
export default IconStyledButton;

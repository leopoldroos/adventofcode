import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const getFontSize = (size, theme) => {
  switch (size) {
    case "xxLarge":
      return theme.fontSizes.size32;
    case "xLarge":
      return theme.fontSizes.size22;
    case "large":
      return theme.fontSizes.size18;
    case "medium":
    default:
      return theme.fontSizes.size16;
    case "small":
      return theme.fontSizes.size14;
    case "xSmall":
      return theme.fontSizes.size12;
  }
};
const StyledText = styled.span`
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: ${({ theme, size }) => getFontSize(size, theme)};
  font-weight: ${(props) => props.weight};
  font-style: ${(props) => (props.italic && "italic") || "normal"};
  text-decoration: ${(props) => props.decoration};
  line-height: ${(props) => props.theme.lineHeights[props.lineHeight]};
  word-break: break-word;
  ${({ textEllipsis }) =>
    textEllipsis &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
  strong {
    font-weight: 700;
  }
  em {
    font-style: italic;
  }
`;
const Text = ({
  tagName,
  weight,
  children,
  className,
  decoration,
  italic,
  lineHeight,
  palette,
  size,
  "data-cy": dataCy,
  textEllipsis,
}) => (
  <StyledText
    as={tagName}
    weight={weight}
    decoration={decoration}
    italic={italic}
    lineHeight={lineHeight}
    palette={palette}
    size={size}
    className={className}
    data-cy={dataCy}
    textEllipsis={textEllipsis}
  >
    {children}
  </StyledText>
);
Text.propTypes = {
  tagName: PropTypes.oneOf(["p", "span"]),
  size: PropTypes.oneOf([
    "xSmall",
    "small",
    "medium",
    "large",
    "xLarge",
    "xxLarge",
  ]),
  weight: PropTypes.oneOf(["400", "500", "600", "700"]),
  italic: PropTypes.bool,
  className: PropTypes.string,
  decoration: PropTypes.oneOf(["none", "underline", "line-through"]),
  children: PropTypes.node.isRequired,
  lineHeight: PropTypes.oneOf(["small", "medium", "large"]),
  "data-cy": PropTypes.string,
  textEllipsis: PropTypes.bool,
};
Text.defaultProps = {
  tagName: "span",
  size: "medium",
  weight: "400",
  className: "",
  italic: false,
  decoration: "none",
  lineHeight: "small",
  "data-cy": null,
  textEllipsis: null,
};
export default Text;

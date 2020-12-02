import React from "react";
import PropTypes from "prop-types";
import theme from "@/themes";
import DefaultStyledButton from "./styles";
import Text from "@/components/atoms/Text";

const primaryStyleOptions = {
  fontColour: theme.palette.negativeLight.base,
  backgroundColour: theme.palette.primary,
};

const DefaultButton = ({
  type,
  styleOptions,
  className,
  label,
  icon,
  primary,
  slim,
  disabled,
  onClick,
  onFocus,
  onBlur,
  "data-cy": dataCy,
  textSize,
  textWeight,
  textEllipsis,
}) => {
  const options = primary ? primaryStyleOptions : styleOptions;
  return (
    <DefaultStyledButton
      className={className}
      type={type}
      options={options}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      slim={slim}
      disabled={disabled}
      data-cy={dataCy}
    >
      <Text
        size={textSize}
        palette={disabled ? null : options.fontColour}
        weight={textWeight}
        textEllipsis={textEllipsis}
      >
        {label}
      </Text>
      {icon && (
        <DefaultStyledButton.IconContainer>
          <span>{icon}</span>
        </DefaultStyledButton.IconContainer>
      )}
    </DefaultStyledButton>
  );
};
DefaultButton.defaultProps = {
  type: "button",
  icon: null,
  primary: false,
  slim: false,
  styleOptions: {
    fontColour: theme.palette.primary,
    backgroundColour: theme.palette.negativeGreyDarker,
    backgroundColourFocused: theme.palette.negativeGrey,
    borderColour: false,
  },
  className: "",
  onFocus: () => {},
  onBlur: () => {},
  disabled: false,
  "data-cy": null,
  textSize: "large",
  textWeight: "400",
  textEllipsis: null,
};
DefaultButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  styleOptions: PropTypes.shape({
    fontColour: PropTypes.string,
    backgroundColour: PropTypes.string,
    backgroundColourFocused: PropTypes.string,
    borderColour: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    maxWidth: PropTypes.string,
  }),
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  primary: PropTypes.bool,
  slim: PropTypes.bool,
  disabled: PropTypes.bool,
  "data-cy": PropTypes.string,
  textSize: PropTypes.string,
  textWeight: PropTypes.string,
  textEllipsis: PropTypes.bool,
};
export default DefaultButton;

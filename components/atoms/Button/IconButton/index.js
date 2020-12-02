import React from "react";
import PropTypes from "prop-types";
import theme from "@/themes";
import IconStyledButton from "./styles";
import Icon from "@/components/atoms/Icon";

const IconButton = React.forwardRef(
  (
    {
      styleOptions,
      iconName,
      iconSize,
      iconFill,
      onClick,
      ariaLabel,
      ariaExpanded,
      ariaHaspopup,
      ariaControls,
      className,
      "data-cy": dataCy,
      type,
    },
    ref
  ) => (
    <IconStyledButton
      ref={ref}
      type={type}
      options={styleOptions}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      aria-controls={ariaControls}
      className={className}
      data-cy={dataCy}
    >
      <IconStyledButton.IconContainer iconSize={iconSize}>
        <Icon
          iconName={iconName}
          fill={iconFill}
          width={iconSize.width}
          height={iconSize.height}
        />
      </IconStyledButton.IconContainer>
    </IconStyledButton>
  )
);
IconButton.defaultProps = {
  iconFill: "#fff",
  styleOptions: {
    fontColour: theme.palette.primary,
    backgroundColour: theme.palette.primaryMatch,
    backgroundColourFocused: theme.palette.negativeGrey,
    borderColour: false,
  },
  ariaLabel: null,
  ariaExpanded: null,
  ariaHaspopup: null,
  ariaControls: null,
  className: "",
  iconSize: {
    width: "100%",
    height: "100%",
  },
  "data-cy": null,
  type: "button",
  onClick: null,
};
IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconFill: PropTypes.string,
  iconSize: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  styleOptions: PropTypes.shape({
    fontColour: PropTypes.string,
    backgroundColour: PropTypes.string,
    backgroundColourFocused: PropTypes.string,
    borderColour: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }),
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  ariaExpanded: PropTypes.bool,
  ariaHaspopup: PropTypes.bool,
  ariaControls: PropTypes.string,
  className: PropTypes.string,
  "data-cy": PropTypes.string,
  type: PropTypes.string,
};
export default IconButton;

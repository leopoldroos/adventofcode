import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";
import { Toast, ANIMATION_TIME } from "./styles";

const ErrorToast = ({ text, onClose }) => {
  const [animated, setAnimated] = useState(false);
  const disappear = () => {
    setAnimated(false);
    const timer = setTimeout(() => {
      onClose();
    }, ANIMATION_TIME);
    return () => {
      clearTimeout(timer);
    };
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      disappear();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    setAnimated(true);
  }, []);
  return (
    <Toast animated={animated}>
      <Text tagName="p" palette="negativeLight.base">
        {text}
      </Text>
      <Button.IconButton
        iconName="close_x"
        iconSize={{ width: "18px", height: "18px" }}
        styleOptions={{
          fontColour: "negativeLight.base",
          backgroundColour: "transparent",
        }}
        onClick={disappear}
        data-cy="close-error-toast-button"
      />
    </Toast>
  );
};
ErrorToast.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ErrorToast;

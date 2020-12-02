import React from "react";
import PropTypes from "prop-types";

const Icon = ({ iconName, ...props }) => {
  try {
    // eslint-disable-next-line global-require
    const IconComponent = require(`./icons/${iconName}.js`).default; // eslint-disable-line import/no-dynamic-require
    return <IconComponent {...props} />;
  } catch (e) {
    console.info(`Missing icon: ${iconName}`);
    return null;
  }
};
Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
};
export default Icon;

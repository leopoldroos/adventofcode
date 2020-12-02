import React from "react";
import PropTypes from "prop-types";

const CloseX = ({ width, height, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 18 18"
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M17.485.44c.586.585.586 1.535 0 2.12L11.12 8.925l6.365 6.365c.586.585.586 1.535 0 2.12-.586.587-1.535.587-2.121 0l-6.365-6.364-6.363 6.365c-.586.586-1.535.586-2.121 0-.586-.586-.586-1.536 0-2.121l6.363-6.365L.515 2.561c-.586-.586-.586-1.536 0-2.122.586-.585 1.535-.585 2.121 0l6.363 6.364L15.364.439c.586-.585 1.535-.585 2.121 0z"
    />
  </svg>
);
CloseX.defaultProps = {
  width: "100%",
  height: "100%",
  fill: "#fff",
};
CloseX.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
};
export default CloseX;

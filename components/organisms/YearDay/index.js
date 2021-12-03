import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addErrorMessage } from "@/store/actions/errors";
import dynamic from "next/dynamic";

const YearDay = ({ day, year }) => {
  // const dispatch = useDispatch()
  // dispatch(addErrorMessage('test'))

  let DynamicComponent;
  try {
    DynamicComponent = dynamic(() => import(`./${year}/${day}/index.js`));
  } catch (e) {
    console.log("....", e);
    // dispatch(addErrorMessage(e.message))
  }

  return <DynamicComponent day={day} year={year} />;
};

YearDay.propTypes = {
  day: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};
export default YearDay;

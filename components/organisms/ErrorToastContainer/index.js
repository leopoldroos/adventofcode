import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { removeErrorMessage } from "@/store/actions/errors";
import ErrorToast from "@/components/atoms/ErrorToast";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 30;
  display: flex;
  flex-direction: column-reverse;
`;

const ErrorToastContainer = () => {
  // const messages = useSelector((state) => state.errors.messages);
  // const dispatch = useDispatch();
  return (
    <Container>
      {/* {messages.map(({ id, text }) => (
        <ErrorToast
          text={text}
          key={id}
          onClose={() => dispatch(removeErrorMessage(id))}
        />
      ))} */}
    </Container>
  );
};
export default ErrorToastContainer;

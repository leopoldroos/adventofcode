export const addErrorMessage = (message) => ({
  type: "ADD_ERROR_MESSAGE",
  message,
});
export const removeErrorMessage = (id) => ({
  type: "REMOVE_ERROR_MESSAGE",
  id,
});

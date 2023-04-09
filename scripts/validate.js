const enableValidations = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
  })
};
const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  disableSubmitButton(buttonElement, rest)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, rest)
      } else {
        enableSubmitButton(buttonElement, rest)
      };
    });
  });
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
const checkInputValidity = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, { inputErrorClass, errorClass });
  } else {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
  }
};
//
const enableSubmitButton = (buttonElement, { inactiveButtonClass, submitButtonSelector }) => {
  buttonElement.classList.add(submitButtonSelector);
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}
const disableSubmitButton = (buttonElement, { inactiveButtonClass, submitButtonSelector }) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.classList.remove(submitButtonSelector);
  buttonElement.setAttribute('disabled', true);
}

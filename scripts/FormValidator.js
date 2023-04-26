export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
    this._formSelector = config.formSelector
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._inputList = inputList
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._buttonElement = buttonElement
    this.disableSubmitButton(this._buttonElement)
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);

        if (this._hasInvalidInput(this._inputList)) {
          this.disableSubmitButton(this._buttonElement)
        } else {
          this._enableSubmitButton(this._buttonElement)
        }
      });
    });
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  };
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.classList.remove(this._submitButtonSelector);
    this._buttonElement.setAttribute('disabled', true);
  }
  _enableSubmitButton() {
    this._buttonElement.classList.add(this._submitButtonSelector);
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  enableValidation() {
    this._setEventListeners();
  }
}
















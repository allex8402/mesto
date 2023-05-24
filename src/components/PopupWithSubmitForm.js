import { Popup } from './Popup.js';
export class PopupWithSubmitForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitAction(submitAction) {
    this._submitAction = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__button').addEventListener('click', () => {
      this._submitAction();
    });
  }
}

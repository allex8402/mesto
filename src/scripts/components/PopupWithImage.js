import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup-image__img');
    this._popupCaption = this._popup.querySelector('.popup-image__caption');
  }

  open({ name, link }) {
    super.open();
    this._popupImage.src = link;
    this._popupCaption.textContent = name;
    this._popupImage.alt = name;
  }
}

import { initialCards } from './initialCards.js';
import { openPopup } from './utils.js'
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {                    //шаблон разметки карточки
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }
  _handleDeleteClick() {
    this._element.remove();
  }     // удаление карточки
  _handleLikeClick() {
    this._element.querySelector('.element__hart').classList.toggle('element__hart_active');
  }//лайк карточки
  _handleCardClick() {
    const popupImage = document.querySelector('.popup-image');
    const popupImg = popupImage.querySelector('.popup-image__img');
    const popupCaption = popupImage.querySelector('.popup-image__caption');
    popupImg.src = this._link;
    popupImg.alt = this._name;
    popupCaption.textContent = this._name;
    // popupImage.classList.add('popup_opened');
    openPopup(popupImage);
  }  //открытие карточки

  _setEventListeners() {
    this._element.querySelector('.element__remove').addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._element.querySelector('.element__hart').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleCardClick();
    });
  }
  generateCard() {     //добавили данные в разметку
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }
}//скобочка закрытичка классочка

initialCards.forEach((el) => {
  const card = new Card(el, '#image_template');
  const cardElement = card.generateCard();
  document.querySelector('.elements__container').append(cardElement);

});


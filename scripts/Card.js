import { initialCards } from './initialCards.js';
import { openPopup } from './utils.js'
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    const popupImage = document.querySelector('.popup-image');
    this._popupImage = popupImage
    const popupImg = this._popupImage.querySelector('.popup-image__img');
    this._popupImg = popupImg
    const popupCaption = this._popupImage.querySelector('.popup-image__caption');
    this._popupCaption = popupCaption
  }
  _getTemplate() {                    //шаблон разметки карточки
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }
  _setEventListeners() {
    const likeButton = this._element.querySelector('.element__hart')
    this._likeButton = likeButton
    const cardImage = this._element.querySelector('.element__img')
    this._cardImage = cardImage

    this._element.querySelector('.element__remove').addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _handleDeleteClick() {
    this._element.remove();
  }     // удаление карточки
  _handleLikeClick() {
    this._likeButton.classList.toggle('element__hart_active');
  }//лайк карточки

  _handleCardClick() {
    this._popupImg.src = this._link;
    this._popupImg.alt = this._name;
    this._popupCaption.textContent = this._name;
    // popupImage.classList.add('popup_opened');
    openPopup(this._popupImage);
  }  //открытие карточки


  generateCard() {     //добавили данные в разметку
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }
}//скобочка закрытичка классочка




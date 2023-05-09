export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._popupImage = document.querySelector('.popup-image');
    this._popupImg = this._popupImage.querySelector('.popup-image__img');
    this._popupCaption = this._popupImage.querySelector('.popup-image__caption');
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__hart');
    this._cardImage = this._element.querySelector('.element__img');

    this._element.querySelector('.element__remove').addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('element__hart_active');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}

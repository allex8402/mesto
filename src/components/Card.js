export class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, userId,) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._popupImg = document.querySelector('.popup-image__img');
    this._popupCaption = document.querySelector('.popup-image__caption');
    this._handleCardClick = handleCardClick
    this._handleDeleteClick = handleDeleteClick
    this._handleLikeClick = handleLikeClick
    this._userId = userId;
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
    this._removeButton = this._element.querySelector('.element__remove')

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._removeButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

  }

  deleteClick() {
    this._element.remove();
    this._element = null;
  }

  setLikes(newData) {
    this._likes = newData.likes;
    this.setLikesView();
  }

  setLikesView() {
    const likeCounter = this._element.querySelector('.element__likes')
    likeCounter.textContent = this._likes.length;
    if (this.hasUserLiked()) {
      this._likeButton.classList.add('element__hart_active');
    } else {
      this._likeButton.classList.remove('element__hart_active');
    }
  }

  // проверка есть ли лайк
  hasUserLiked() {
    return this._likes.some((item) => {
      return item._id === this._userId;
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    if (this._cardOwnerId !== this._userId) {
      this._removeButton.classList.add('element__remove_hidden')
    }
    if (this.hasUserLiked()) {
      this._likeButton.classList.add('element__hart_active');
    }
    this.setLikesView();
    return this._element;
  }
}

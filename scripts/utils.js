export { openPopup, closePopup, closeOverlay, closeEsc }

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
  // открытие попап
}
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
  // закрытие попап
}
const closeOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
const closeEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

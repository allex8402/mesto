export { openPopup, closeEsc }

const popups = document.querySelectorAll('.popup')
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

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-icon')) {
      closePopup(popup)
    }
  })
})

const closeEsc = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

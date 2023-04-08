//popup
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const buttonCloseEditProfilePopup = popup.querySelector('.popup__close-icon');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_job');
const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__subtitle');
const formEditProfile = document.querySelector('.popup__form');
//popup-edit
const popupAddCard = document.querySelector('.popup_add-card');
const buttonCloseAddCardPopup = popupAddCard.querySelector('.popup__close-icon');
const imageInput = document.querySelector('.popup__input_type_image');
const linkInput = document.querySelector('.popup__input_type_link');
const imgContainer = document.querySelector('.elements__container');
const formAddCard = popupAddCard.querySelector('.popup__form_edit');
//popup-image
const popupImage = document.querySelector('.popup-image');
const popupImageCaption = popupImage.querySelector('.popup-image__caption');
const buttonCloseImagePopup = popupImage.querySelector('.popup__close-icon');
const popupImageElement = popupImage.querySelector('.popup-image__img')
//other
const profileRectangleBtn = document.querySelector('.profile__rectangle');
const buttonOpenAddCardPopup = document.querySelector('.profile__button');
const imageTemplate = document.querySelector('#image_template').content;
// первый попап
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);// открытие попап
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
popupEditProfile.addEventListener('mousedown', closeOverlay);
popupAddCard.addEventListener('mousedown', closeOverlay);
popupImage.addEventListener('mousedown', closeOverlay);
const closeEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
function openEditProfilePopup() {
  openPopup(popupEditProfile);
  nameInput.value = nameTitle.textContent; //заполнить поля формы значениями на странице
  jobInput.value = jobTitle.textContent;
}
profileRectangleBtn.addEventListener('click', function () {
  openEditProfilePopup()
});
buttonCloseEditProfilePopup.addEventListener('click', function () {
  closePopup(popupEditProfile);
});   /*открытие закрытие попап*/
function submitEditProfileForm(evt) {                 //обработать отправку формы
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', submitEditProfileForm); //следить за событием отправки
// второй попап
buttonOpenAddCardPopup.addEventListener('click', function () { openPopup(popupAddCard) });//- добавили второй попап
buttonCloseAddCardPopup.addEventListener('click', function () { closePopup(popupAddCard) });
function createCard(el) {
  const imageElement = imageTemplate.querySelector('.element').cloneNode(true);
  const imageElementImg = imageElement.querySelector('.element__img');
  imageElement.querySelector('.element__title').textContent = el.name;
  imageElementImg.src = el.link;
  imageElementImg.alt = el.name;
  imageElement.querySelector('.element__hart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__hart_active');
  });
  imageElement.querySelector('.element__remove').addEventListener('click', function () {
    imageElement.remove()
  });
  imageElementImg.addEventListener('click', function () {
    openEditProfilePopupImage(el)
  });
  return imageElement;
}
initialCards.forEach((el) => {
  const newCard = createCard(el);
  imgContainer.prepend(newCard);
});
function handleFormSubmitCard(evt) {                 //обработать отправку формы
  evt.preventDefault();
  const addCard = createCard({
    name: imageInput.value,
    link: linkInput.value
  });
  imgContainer.prepend(addCard);
  evt.target.reset();
  closePopup(popupAddCard);
  enableValidations(validationConfig);
}
formAddCard.addEventListener('submit', handleFormSubmitCard);
//третий попап
function openEditProfilePopupImage(el) {
  openPopup(popupImage)
  popupImageElement.src = el.link;
  popupImageElement.alt = el.name;
  popupImageCaption.textContent = el.name;
}
buttonCloseImagePopup.addEventListener('click', function () { closePopup(popupImage) });
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
enableValidations(validationConfig);



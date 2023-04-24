import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup, closeOverlay } from './utils.js'

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

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
// const popupImageCaption = popupImage.querySelector('.popup-image__caption');
const buttonCloseImagePopup = popupImage.querySelector('.popup__close-icon');
// const popupImageElement = popupImage.querySelector('.popup-image__img')
const buttonAddCard = popupAddCard.querySelector('.popup__button')
//other
const profileRectangleBtn = document.querySelector('.profile__rectangle');
const buttonOpenAddCardPopup = document.querySelector('.profile__button');
// const imageTemplate = document.querySelector('#image_template').content;// первый попап


popupEditProfile.addEventListener('mousedown', closeOverlay);
popupAddCard.addEventListener('mousedown', closeOverlay);
popupImage.addEventListener('mousedown', closeOverlay);

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
  const card = new Card(el, '#image_template');
  const cardElement = card.generateCard();
  return cardElement;
}
function handleFormSubmitCard(evt) {                   //обработать отправку формы
  evt.preventDefault();
  const addCard = createCard({
    name: imageInput.value,
    link: linkInput.value
  });
  imgContainer.prepend(addCard);
  evt.target.reset();
  closePopup(popupAddCard);
  const formValidator = new FormValidator(config, formAddCard);
  formValidator.disableSubmitButton(buttonAddCard);
}
formAddCard.addEventListener('submit', handleFormSubmitCard);
buttonCloseImagePopup.addEventListener('click', function () { closePopup(popupImage) });

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formAddCard);
formAddNewCardValidator.enableValidation();

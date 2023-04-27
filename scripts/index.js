import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js'
import { initialCards } from './initialCards.js';
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//popup

const popupEditProfile = document.querySelector('.popup_edit-profile');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_job');
const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__subtitle');
const formEditProfile = document.forms['user'];
const popupAddCard = document.querySelector('.popup_add-card');
const imageInput = document.querySelector('.popup__input_type_image');
const linkInput = document.querySelector('.popup__input_type_link');
const imgContainer = document.querySelector('.elements__container');
const formAddCard = document.forms['card'];
//other
const profileRectangleBtn = document.querySelector('.profile__rectangle');
const buttonOpenAddCardPopup = document.querySelector('.profile__button');

function openEditProfilePopup() {
  openPopup(popupEditProfile);
  nameInput.value = nameTitle.textContent; //заполнить поля формы значениями на странице
  jobInput.value = jobTitle.textContent;
}
profileRectangleBtn.addEventListener('click', function () {
  openEditProfilePopup()
});     /*открытие попап*/
function submitEditProfileForm(evt) {                 //обработать отправку формы
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', submitEditProfileForm); //следить за событием отправки
// второй попап
buttonOpenAddCardPopup.addEventListener('click', function () { openPopup(popupAddCard) });//- добавили второй попап

function createCard(el) {
  const card = new Card(el, '#image_template');
  const cardElement = card.generateCard();
  return cardElement;
}
initialCards.forEach((el) => {
  const cardElement = createCard(el);
  imgContainer.append(cardElement);
});

function handleFormSubmitCard(evt) {                   //обработать отправку формы
  evt.preventDefault();
  const addCard = createCard({
    name: imageInput.value,
    link: linkInput.value
  });
  imgContainer.prepend(addCard);
  evt.target.reset();
  closePopup(popupAddCard);
  formAddNewCardValidator.disableSubmitButton();
}
formAddCard.addEventListener('submit', handleFormSubmitCard);

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formAddCard);
formAddNewCardValidator.enableValidation();

import './index.css';
import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import {
  formEditProfile,
  formAddCard,
  profileRectangleBtn,
  buttonOpenAddCardPopup,
  initialCards
} from '../utils/constants.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const {
  nameSelector,
  jobSelector
} = {
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle'
};

const userInfo = new UserInfo({
  nameSelector,
  jobSelector
});

const userData = userInfo.getUserInfo();
userInfo.setUserInfo(userData);

const popupWithFormProfile = new PopupWithForm(
  '.popup_edit-profile', (formData) => {
    userInfo.setUserInfo(formData);
  }
);

popupWithFormProfile.setEventListeners();

profileRectangleBtn.addEventListener('click', () => {
  popupWithFormProfile.setInputValues(userInfo.getUserInfo());
  popupWithFormProfile.open();
});

const createCard = (data) => {
  const newCard = new Card(
    (data),
    '#image_template',
    (name, link) => {
      popupWithImage.open({ name, link });
    }
  );
  return newCard.generateCard();
};

const popupWithFormAddCard = new PopupWithForm(
  '.popup_add-card', (data) => {
    const newCardElement = createCard({ name: data.image, link: data.link });
    cardsList.addItem(newCardElement);
  }
);

popupWithFormAddCard.setEventListeners();

buttonOpenAddCardPopup.addEventListener('click', () => {
  popupWithFormAddCard.open();
  formAddNewCardValidator.disableSubmitButton();
});

const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners();

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  }
}, '.elements__container');

cardsList.renderItems();

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formAddCard);
formAddNewCardValidator.enableValidation();
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

const popupWithFormAddCard = new PopupWithForm(
  '.popup_add-card', (item) => {
    const newCard = new Card({ name: item.image, link: item.link }, '#image_template', (name, link) => {
      popupWithImage.open({ name, link });
    });
    const newCardElement = newCard.generateCard();
    cardsList.addItem(newCardElement);
    formAddNewCardValidator.disableSubmitButton()
  }
);

popupWithFormAddCard.setEventListeners();

buttonOpenAddCardPopup.addEventListener('click', () => {
  popupWithFormAddCard.open()
});

const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners();

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#image_template', (name, link) => {
      popupWithImage.open({ name, link });
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, '.elements__container');

cardsList.renderItems();

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formAddCard);
formAddNewCardValidator.enableValidation();

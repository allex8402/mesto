import './index.css';
import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';
import {
  formEditProfile,
  formAddCard,
  profileRectangleBtn,
  buttonOpenAddCardPopup,

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
  aboutSelector,
  avatarSelector
} = {
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
};
let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'ea1a8b8d-6317-47fd-a20b-0ce7b90a2f01',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

const userInfo = new UserInfo({
  nameSelector,
  aboutSelector,
  avatarSelector
});


// попап с данными пользователя
const popupWithFormProfile = new PopupWithForm('.popup_edit-profile', (formData) => {
  api.editProfile(formData)
    .then((formData) => {
      userInfo.setUserInfo(formData);
      popupWithFormProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
});

popupWithFormProfile.setEventListeners();

profileRectangleBtn.addEventListener('click', () => {
  popupWithFormProfile.setInputValues(userInfo.getUserInfo());
  popupWithFormProfile.open();
});
// попап аватар
const editAvatarPopup = new PopupWithForm(
  '.popup_edit-avatar', (data) => {

    api.editAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  });
editAvatarPopup.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
  editAvatarPopup.open();
  formEditAvatarValidator.disableSubmitButton();
});

// создание новой карточки
const createCard = (data) => {
  const newCard = new Card(
    data,
    '#image_template', userId,
    (name, link) => {
      popupWithImage.open({ name, link });
    }
  );
  return newCard.generateCard();

};


// попап с добавлением новой карточки
const popupWithFormAddCard = new PopupWithForm(
  '.popup_add-card', (data) => {
    api.addNewCard(data)
      .then((data) => {
        cardsList.addItem(createCard({ name: data.image, link: data.link }));
        popupWithFormAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })

  }
);

popupWithFormAddCard.setEventListeners();

buttonOpenAddCardPopup.addEventListener('click', () => {
  popupWithFormAddCard.open();
  formAddNewCardValidator.disableSubmitButton();
});

const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners();

// экземпляр класса Section
const cardsList = new Section({
  renderer: (card) => {
    const cardElement = createCard(card);
    cardsList.addItem(cardElement);
  }
}, '.elements__container');

// валидация
const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formAddCard);
formAddNewCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(config, formAddCard);
formEditAvatarValidator.enableValidation();


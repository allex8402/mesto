import './index.css';
import { Card } from '../components/Card.js';
import { PopupWithSubmitForm } from '../components/PopupWithSubmitForm';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';
import {
  formAvatar,
  formEditProfile,
  formAddCard,
  profileRectangleBtn,
  buttonOpenAddCardPopup,
  buttonEditAvatar,

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
// первоначальные данные
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
  popupWithFormProfile.renderLoading(true);
  api.editProfile(formData)
    .then((formData) => {
      userInfo.setUserInfo(formData);
      popupWithFormProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => popupWithFormProfile.renderLoading(false));
});

popupWithFormProfile.setEventListeners();

profileRectangleBtn.addEventListener('click', () => {
  popupWithFormProfile.setInputValues(userInfo.getUserInfo());
  popupWithFormProfile.open();
});

// попап аватар
const editAvatarPopup = new PopupWithForm(
  '.popup_edit-avatar', (data) => {
    editAvatarPopup.renderLoading(true);
    api.editAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => editAvatarPopup.renderLoading(false));
  });
editAvatarPopup.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
  editAvatarPopup.open();
  formEditAvatarValidator.disableSubmitButton();
});

// попап удаления
const deletePopup = new PopupWithSubmitForm('.popup-delete')
deletePopup.setEventListeners();

// создание новой карточки
const createCard = (data) => {
  const newCard = new Card(
    data,
    '#image_template',
    (name, link) => {
      popupWithImage.open({ name, link });
    },
    () => {
      deletePopup.setSubmitAction(() => {
        api.deleteCard(data._id)
          .then(() => {
            newCard.deleteClick();
            deletePopup.close();
          })
          .catch((err) => console.log(err));
      });
      deletePopup.open();
    },
    () => {
      console.log(data._id)
      if (!newCard.hasUserLiked()) {
        api.addLikeCard(data._id)
          .then((data) => {
            newCard.setLikes(data);
            newCard.setLikesView();
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api.deleteLikeCard(data._id)
          .then((data) => {
            newCard.setLikes(data);
            newCard.setLikesView();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    userId)
  return newCard.generateCard();
};

// попап с добавлением новой карточки
const popupWithFormAddCard = new PopupWithForm(
  '.popup_add-card', (data) => {
    popupWithFormAddCard.renderLoading(true);
    api.addNewCard(data)
      .then((data) => {
        cardsList.addItem(createCard(data));
        popupWithFormAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => popupWithFormAddCard.renderLoading(false));
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

const formEditAvatarValidator = new FormValidator(config, formAvatar);
formEditAvatarValidator.enableValidation();


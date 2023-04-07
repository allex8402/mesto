//popup
const popup = document.querySelector('.popup');
const popupFill = document.querySelector('.popup-fill');
const closeButton = popup.querySelector('.popup__close-icon');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_job');
const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
//popup-edit
const popupEdit = document.querySelector('.popup-edit');
const closeButtonEdit = popupEdit.querySelector('.popup__close-icon');
const imageInput = document.querySelector('.popup__input_type_image');
const linkInput = document.querySelector('.popup__input_type_link');
const imgContainer = document.querySelector('.elements__container');
const popupForm = popupEdit.querySelector('.popup__form_edit');
//popup-image
const popupImage = document.querySelector('.popup-image');
const popupImageCaption = popupImage.querySelector('.popup-image__caption');
const closeBtn = popupImage.querySelector('.popup__close-icon');
//other
const profileRectangleBtn = document.querySelector('.profile__rectangle');
const profOpenButton = document.querySelector('.profile__button');




// первый попап
const openPopup = function (popup) {
  popup.classList.add('popup_opened'); // открытие попап
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
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
popup.addEventListener('mousedown', closeOverlay);
popupEdit.addEventListener('mousedown', closeOverlay);
popupImage.addEventListener('mousedown', closeOverlay);

const closeEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
document.addEventListener('keydown', closeEsc);


function fillPopup() {
  openPopup(popupFill);
  nameInput.value = nameTitle.textContent; //заполнить поля формы значениями на странице
  jobInput.value = jobTitle.textContent;
}

profileRectangleBtn.addEventListener('click', function () {
  fillPopup()
});

closeButton.addEventListener('click', function () {
  closePopup(popupFill);
});   /*открытие закрытие попап*/

function handleFormSubmit(evt) {                 //обработать отправку формы
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;
  closePopup(popupFill);
}
formElement.addEventListener('submit', handleFormSubmit); //следить за событием отправки

// второй попап


profOpenButton.addEventListener('click', function () { openPopup(popupEdit) });//- добавили второй попап
closeButtonEdit.addEventListener('click', function () { closePopup(popupEdit) });

function createCard(el) {
  const imageTemplate = document.querySelector('#image_template').content;
  const imageElement = imageTemplate.querySelector('.element').cloneNode(true);
  imageElement.querySelector('.element__title').textContent = el.name;
  imageElement.querySelector('.element__img').src = el.link;
  imageElement.querySelector('.element__hart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__hart_active');
  });
  imageElement.querySelector('.element__remove').addEventListener('click', function () {
    imageElement.remove()
  });
  imageElement.querySelector('.element__img').addEventListener('click', function () {
    fillPopupImage(el)
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
  closePopup(popupEdit);
}
popupForm.addEventListener('submit', handleFormSubmitCard);

//третий попап


function fillPopupImage(el) {
  openPopup(popupImage)
  popupImage.querySelector('.popup-image__img').src = el.link;
  popupImage.querySelector('.popup-image__img').alt = el.name;
  popupImageCaption.textContent = el.name;
}

closeBtn.addEventListener('click', function () { closePopup(popupImage) });

const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
enableValidations(enableValidation);

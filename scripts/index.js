let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__rectangle');
let closeButton = popup.querySelector('.popup__close-icon');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');
let nameTitle = document.querySelector('.profile__title');
let jobTitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');

// первй попап
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameTitle.textContent; //заполнить поля формы значениями на странице
  jobInput.value = jobTitle.textContent;
}
openButton.addEventListener('click', openPopup);
function closePopup() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);   /*открытие закрытие попап*/

function handleFormSubmit(evt) {                 //обработать отправку формы
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;
  closePopup()
}
formElement.addEventListener('submit', handleFormSubmit); //следить за событием отправки









// второй попап
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profOpenButton = document.querySelector('.profile__button');
const popupEdit = document.querySelector('.popup_edit');
const closeButtonEdit = popupEdit.querySelector('.popup__close-icon');
const imageInput = document.querySelector('.popup__input_type_image');
const linkInput = document.querySelector('.popup__input_type_link');
const removeButtons = document.querySelectorAll('.element__remove');
const imgContainer = document.querySelector('.elements__container');
let popupForm = popupEdit.querySelector('.popup__form_edit');
function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
}
function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
}
profOpenButton.addEventListener('click', openPopupEdit);//- добавили второй попап
closeButtonEdit.addEventListener('click', closePopupEdit);



function createCard(el) {
  const imageTemplate = document.querySelector('#image_template').content;
  let imageElement = imageTemplate.querySelector('.element').cloneNode(true);
  imageElement.querySelector('.element__title').textContent = el.name;
  imageElement.querySelector('.element__img').src = el.link;
  imageElement.querySelector('.element__hart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__hart_active');
  })
  imageElement.querySelector('.element__remove').addEventListener('click', function () {
    imageElement.remove()
  });
  return imageElement;
}
initialCards.forEach((el) => {
  let newCard = createCard(el);
  document.querySelector('.elements__container').append(newCard);
});

function handleFormSubmitCard(evt) {                 //обработать отправку формы
  evt.preventDefault();
  const addCard = createCard({
    name: imageInput.value,
    link: linkInput.value
  });
  document.querySelector('.elements__container').prepend(addCard);
  evt.target.reset();
  close(popupEdit);
}
popupForm.addEventListener('submit', handleFormSubmitCard);












// function openPopupEdit() {
//   popupEdit.classList.add('popup_opened');
// }
// function closePopupEdit() {
//   popupEdit.classList.remove('popup_opened');
// }
// profOpenButton.addEventListener('click', openPopupEdit);//- добавили второй попап
// closeButtonEdit.addEventListener('click', closePopupEdit);

// function handleFormSubmitEdit(evt) {                 //обработать отправку формы
//   evt.preventDefault();

//   initialCards.push(newImageElement = {
//     name: imageInput.value,
//     link: linkInput.value
//   });
//   popupForm.prepend(newImageElement);
//   evt.target.reset()
//   closePopupEdit()
// }
// popupForm.addEventListener('submit', handleFormSubmitEdit);

// // добавление первых карточек
// initialCards.forEach((el) => {

//   const imageTemplate = document.querySelector('#image_template').content;
//   let imageElement = imageTemplate.querySelector('.element').cloneNode(true);
//   imageElement.querySelector('.element__title').textContent = el.name;
//   imageElement.querySelector('.element__img').src = el.link;
//   imageElement.querySelector('.element__hart').addEventListener('click', function (evt) {
//     evt.target.classList.toggle('element__hart_active');
//   })
//   imgContainer.append(imageElement);


// })

// const removeButtons = document.querySelectorAll('.element__remove');
// removeButtons.forEach((button) => {
//   button.addEventListener('click', () => {
//     const element = button.closest('.element');
//     element.remove();
//   });
// });



 //следить за событием отправки


// const formElement = popupEdit.querySelector('.popup__form');
// formElement.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const name = imageInput.value;
//   const link = linkInput.value;
//   const imageTemplate = document.querySelector('#image_template').content;
//   const imageElement = imageTemplate.querySelector('.element').cloneNode(true);
//   imageElement.querySelector('.element__title').textContent = name;
//   imageElement.querySelector('.element__img').src = link;
//   imageElement.querySelector('.element__hart').addEventListener('click', function (evt) {
//     evt.target.classList.toggle('element__hart_active');
//   })
//   imgContainer.prepend(imageElement);
//   closePopupEdit();
// });


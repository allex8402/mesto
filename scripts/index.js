let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__rectangle');
let closeButton = popup.querySelector('.popup__close-icon');
let nameInput = popup.querySelectorAll('.popup__input_info_value');
let jobInput = popup.querySelectorAll('.popup__input_info_value');
let nameTitle = document.querySelector('.profile__title');
let jobTitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');


function openPopup() {
  popup.classList.add('popup_opened');
  nameInput[0].value = nameTitle.textContent; //заполнить поля формы значениями на странице
  jobInput[1].value = jobTitle.textContent;
}
openButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);   /*открытие закрытие попап*/



function handleFormSubmit(evt) {                 //обработать отправку формы
  evt.preventDefault();
  nameTitle.textContent = nameInput[0].value;
  jobTitle.textContent = jobInput[1].value;
  closePopup()
}
formElement.addEventListener('submit', handleFormSubmit);       //следить за событием отправки





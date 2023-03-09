let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__rectangle');
let closeButton = popup.querySelector('.popup__close-icon');
let nameInput = popup.querySelector('.popup__input_name');
let jobInput = popup.querySelector('.popup__input_job');
let nameTitle = document.querySelector('.profile__title');
let jobTitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');


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
formElement.addEventListener('submit', handleFormSubmit);       //следить за событием отправки





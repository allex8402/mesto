let popup = document.querySelector('.popup');
let openButton = document.querySelector('.popup__open-icon');
let closeButton = popup.querySelector('.popup__close-icon');
let saveButton = popup.querySelector('.popup__button')
let nameInput = popup.querySelector('.popup__input_name');
let jobInput = popup.querySelector('.popup__input_job');
let nameTitle = document.querySelector('.profile__title');
let jobTitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__fieldset');
function openPopup() {
 popup.classList.add('popup_opened');
}
function closePopup() {
 popup.classList.remove('popup_opened');
}
openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);   /*открытие закрытие попап*/

nameInput.value = nameTitle.textContent; //заполнить поля формы значениями на странице
jobInput.value = jobTitle.textContent;

function handleFormSubmit(evt) {                 //обработать отправку формы
 evt.preventDefault();

 nameTitle.textContent = nameInput.value;
 jobTitle.textContent = jobInput.value;
}
formElement.addEventListener('submit', handleFormSubmit);        //следить за событием отправки


saveButton.addEventListener('click', handleFormSubmit);           //сохранить форму при нажатии кнопки "сохранить"
saveButton.addEventListener('click', closePopup);                   //закрыть попап


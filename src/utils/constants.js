
export const {
  formEditProfile,
  formAddCard,
  profileRectangleBtn,
  buttonOpenAddCardPopup,
  initialCards,
} = {
  formEditProfile: document.forms['user'],
  formAddCard: document.forms['card'],
  profileRectangleBtn: document.querySelector('.profile__rectangle'),
  buttonOpenAddCardPopup: document.querySelector('.profile__button'),
  initialCards: [
    {
      name: 'Градиент',
      link: 'https://gratisography.com/wp-content/uploads/2023/04/gratisography-neon-lightbulb-free-stock-photo-800x525.jpg',
    },
    {
      name: 'Типа лето',
      link: 'https://gratisography.com/wp-content/uploads/2023/03/gratisography-cat-thief-stock-photo-800x525.jpg',
    },
    {
      name: 'Планы',
      link: 'https://gratisography.com/wp-content/uploads/2023/01/gratisography-frog-racer-free-stock-photo-800x525.jpg',
    },
    {
      name: 'Жизнь',
      link: 'https://images.pexels.com/photos/16499857/pexels-photo-16499857.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
    },
    {
      name: 'Счастье',
      link: 'https://cdn.pixabay.com/photo/2017/09/17/08/49/elephants-2757831_640.png',
    },
    {
      name: 'Свежесть',
      link: 'https://plus.unsplash.com/premium_photo-1683288081743-5161d099f16e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    },
  ],
};

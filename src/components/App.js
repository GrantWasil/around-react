import React from 'react';
import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import PopupWithForm from "./PopupWithForm.js"
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      api.getProfileData(),
      api.getInitialCards()
    ]).then(([userData, cardsData]) => {
      setCurrentUser(userData);
      setCards(cardsData);
    }).catch((err) => {
      console.log(`Error: ${err}`);
    })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((deletedCard) => {
      const newCards = cards.filter((c) => c._id != card._id);
      setCards(newCards);
    })
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function onAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(e) {
    setSelectedCard(e)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(name, about) {
    api.updateProfileData(name, about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(avatar) {
    api.updateUserImage(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      })
  }

  function handlePlaceSubmit(name, url) {
    api.createNewCard(name, url)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header />

        <Main
          handleEditAvatarClick={onEditAvatar}
          handleEditProfileClick={onEditProfile}
          handleAddPlaceClick={onAddPlace}
          handleCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <PopupWithForm name="delete" title="Are you sure?" onClose={closeAllPopups}>
          <button className="popup__container-save delete__save" type="submit">Yes</button>
        </PopupWithForm>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handlePlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />


        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <Footer />
        <div className="element">
          <button className="element__delete" aria-label="Remove" type="button"></button>
          <img className="element__image" />
          <div className="element__info">
            <h2 className="element__info-name"></h2>
            <div className="element__info-right">
              <button className="element__info-like" aria-label="Like" type="button"></button>
              <p className="element__info-count">1</p>
            </div>
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

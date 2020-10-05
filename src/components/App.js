import React from 'react';
import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import PopupWithForm from "./PopupWithForm.js"
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getProfileData()
      .then((res) => {
        setCurrentUser(
          res
        )
      })
  }, [])

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

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header />

        <Main
          handleEditAvatarClick={onEditAvatar}
          handleEditProfileClick={onEditProfile}
          handleAddPlaceClick={onAddPlace}
          handleCardClick={handleCardClick}
        />

        <PopupWithForm name="new" title="New Place" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <fieldset className="popup__field">
            <input className="popup__container-name popup__input" id="name-input" placeholder="Title" type="text" name="name" minLength="2" maxLength="30" required />
            <span className="popup__input-error" id="name-input-error"></span>
            <input className="popup__container-about popup__input" id="about-input" placeholder="Image URL" name="link" type="URL" required />
            <span className="popup__input-error" id="about-input-error"></span>
            <button className="popup__container-save" type="submit">Save</button>
            <button className="popup__close" aria-label="Close" type="reset" onClick={closeAllPopups}></button>
          </fieldset>
        </PopupWithForm>


        <PopupWithForm name="delete" title="Are you sure?" onClose={closeAllPopups}>
          <button className="popup__container-save delete__save" type="submit">Yes</button>
        </PopupWithForm>


        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>


        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <Footer />
        <template id="element">
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
        </template>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

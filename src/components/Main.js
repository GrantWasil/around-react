import React from 'react';

import Card from "./Card.js"
import api from "../utils/Api.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main>
        <section className="profile container">
          <img className="profile__avatar" alt="The profile picture of the user" src={currentUser.avatar} onClick={props.handleEditAvatarClick} />
          <div className="profile__info">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <p className="profile__info-title">{currentUser.about}</p>
          </div>
          <button className="btn btn-edit" aria-label="Edit" type="button" onClick={props.handleEditProfileClick}></button>
          <button className="btn btn-new" aria-label="New" type="button" onClick={props.handleAddPlaceClick}></button>
        </section>

        <section className="elements container">
          {cards.map((card, i) => (
            <Card card={card} key={i} handleCardClick={props.handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
          ))}
        </section>

      </main>
      </CurrentUserContext.Provider>
  )
}

export default Main
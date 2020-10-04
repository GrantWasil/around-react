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
            <Card card={card} key={i} handleCardClick={props.handleCardClick}/>
          ))}
        </section>

      </main>
      </CurrentUserContext.Provider>
  )
}

export default Main
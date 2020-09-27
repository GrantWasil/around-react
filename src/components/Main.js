import React from 'react';

import Card from "./Card.js"
import api from "../utils/Api.js";

function Main(props) {
  const [userName, setUserName] = React.useState('Loading...');
  const [userDescription, setUserDescription] = React.useState('Loading...');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfileData()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
  }, [userName])

  return (
    <main>
      <section className="profile container">
        <img className="profile__avatar" alt="The profile picture of the user" src={userAvatar} onClick={props.handleEditAvatarClick} />
        <div className="profile__info">
          <h1 className="profile__info-name">{userName}</h1>
          <p className="profile__info-title">{userDescription}</p>
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
  )
}

export default Main
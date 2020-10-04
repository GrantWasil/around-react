import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardDeleteButtonClassName = isOwn ? `element__delete` : `element__delete_hidden`; 
    const cardLikeButtonClassName = isLiked ? `element__info-like element__info-like_active` : `element__info-like`;

    function handleClick() {
        props.handleCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <div className="element">
            <button className={cardDeleteButtonClassName} aria-label="Remove" type="button" onClick={handleDeleteClick}></button>
            <img className="element__image" src={props.card.link} alt={`Image of ` + props.card.name} onClick={handleClick}/>
            <div className="element__info">
                <h2 className="element__info-name">{props.card.name}</h2>
                <div className="element__info-right">
                    <button className={cardLikeButtonClassName} aria-label="Like" type="button" onClick={handleLikeClick}></button>
                    <p className="element__info-count">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )

}

export default Card;
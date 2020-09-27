import React from "react";

function Card(props) {

    function handleClick() {
        props.handleCardClick(props.card)
    }

    return (
        <div className="element">
            <button className="element__delete" aria-label="Remove" type="button"></button>
            <img className="element__image" src={props.card.link} alt={`Image of ` + props.card.name} onClick={handleClick}/>
            <div className="element__info">
                <h2 className="element__info-name">{props.card.name}</h2>
                <div className="element__info-right">
                    <button className="element__info-like" aria-label="Like" type="button"></button>
                    <p className="element__info-count">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )

}

export default Card;
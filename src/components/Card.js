import ImagePopup from "./ImagePopup.js";
import PopupWithForm from "./PopupWithForm.js";
import {groupID, authorization} from "../utils/constants.js"
import React from "react";


function Card(props) {

    function _getTemplate() {
        const cardElement = document
            .querySelector(this._templateElement)
            .content
            .cloneNode(true);
        return cardElement;
    }

    function generateCard(profileId, item) {
        this._element = this._getTemplate();
        this._cardElement = this._element.querySelector('.element');
        const imageElement = this._element.querySelector('.element__image');
        const imageLikes = this._element.querySelector('.element__info-count');
        this._setEventListeners();
        imageElement.src = this._link;
        imageElement.alt = `Image of ${this._text}`;
        this._element.querySelector('.element__info-name').textContent = this._text;
        imageLikes.textContent = this._likes.length;
        if (item.owner._id != profileId) {
            this._element.querySelector('.element__delete').style.display = "none"
        }
        if (item.likes.some(like => like._id === profileId)) {
            this._element.querySelector('.element__info-like').classList.add('element__info-like_active');
        }
        return this._element;
    }

    function _handleOpenPopup() {
        const popup = new ImagePopup(this._text, this._link, '.picture');
        popup.setEventListeners();
        popup.open();

    }

    function _setEventListeners() {
        const imageLikes = this._element.querySelector('.element__info-count');
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenPopup();
        })
        this._element.querySelector('.element__info-like').addEventListener('click', (e) => {
            if (e.target.classList.contains('element__info-like_active')) {
                e.target.classList.remove('element__info-like_active')
                fetch(`https://around.nomoreparties.co/v1/${groupID}/cards/likes/${this._id}`, {
                    method: "DELETE",
                    headers: {
                        authorization
                    }
                })
                    .then(res => res.json())
                    .then(data => imageLikes.textContent = data.likes.length)
            } else {
                e.target.classList.add('element__info-like_active')
                fetch(`https://around.nomoreparties.co/v1/${groupID}/cards/likes/${this._id}`, {
                    method: "PUT",
                    headers: {
                        authorization
                    }
                })
                    .then(res => res.json())
                    .then(data => imageLikes.textContent = data.likes.length)
            }

        })

        this._element.querySelector('.element__delete').addEventListener('click', () => {
            const target = this._cardElement;
            const confirm = new PopupWithForm({
                handleFormSubmit: () => {
                    target.remove();
                    confirm.close();
                    fetch(`https://around.nomoreparties.co/v1/${groupID}/cards/${this._id}`, {
                        method: "DELETE",
                        headers: {
                            authorization
                        }
                    })
                }
            }, '.popup-delete', '.popup__form')
            confirm.setEventListeners();
            confirm.open();
        })

    }

    function handleClick() {
        props.handleCardClick(props.card)
    }

    return (
        <div className="element" key={props.key}>
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
import React from "react"

function ImagePopup(props) {


    function open() {
        document.addEventListener('keydown', this._handleEscapeClose);
        this._popupElement.querySelector('.picture__container-image').src = this._link;
        this._popupElement.querySelector('.picture__container-image').alt = `Image of ${this._text}`;
        this._popupElement.querySelector('.picture__container-title').textContent = this._text;
    }

    return (
        <>
        {
            props.card ?
                <section className="picture popup_opened">
                    <div className="popup__overlay" onClick={props.onClose}></div>
                    <div className="picture__container">
                        <button className="popup__close picture__container-close" aria-label="Close" type="button" onClick={props.onClose}></button>
                        <img className="picture__container-image" src={props.card.link} />
                        <p className="picture__container-title">{props.card.name}</p>
                    </div>
                </section>
                : <> </>
        }
        </>
    )
}

export default ImagePopup;
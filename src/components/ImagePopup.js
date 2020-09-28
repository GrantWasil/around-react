import React from "react"

function ImagePopup(props) {

    return (
        <>
        {
            props.card.link ?
                <section className="picture popup_opened">
                    <div className="popup__overlay" onClick={props.onClose}></div>
                    <div className="picture__container">
                        <button className="popup__close picture__container-close" aria-label="Close" type="button" onClick={props.onClose}></button>
                        <img className="picture__container-image" src={props.card.link} alt={props.card.name} />
                        <p className="picture__container-title">{props.card.name}</p>
                    </div>
                </section>
                : 
                <section className="picture popup">
                    <div className="popup__overlay" onClick={props.onClose}></div>
                    <div className="picture__container">
                        <button className="popup__close picture__container-close" aria-label="Close" type="button" onClick={props.onClose}></button>
                        <img className="picture__container-image" src={props.card.link} alt={props.card.name} />
                        <p className="picture__container-title">{props.card.name}</p>
                    </div>
                </section>
        }
        </>
    )
}

export default ImagePopup;
import React from "react";

function PopupWithForm(props) {

  return (
    <section className={props.isOpen
      ? `popup_opened popup popup-${props.name}`
      : `popup popup-${props.name}`}>
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__container">
        <h3 className="popup__container-title">{props.title}</h3>
        <form className="popup__form" noValidate onSubmit={props.handleSubmit}>
          {props.children}
          <button className="popup__container-save" type="submit">Save</button>
          <button className="popup__close" aria-label="Close" type="reset" onClick={props.onClose}></button>
        </form>
      </div>
    </section>
  )

}

export default PopupWithForm;
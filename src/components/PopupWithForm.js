import React from "react";

class PopupWithForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <section className={this.props.isOpen 
            ? `popup_opened popup popup-${this.props.name}` 
            : `popup popup-${this.props.name}`}>
            <div className="popup__overlay"></div>
            <div className="popup__container">
              <h3 className="popup__container-title">{this.props.title}</h3>
              <form className="popup__form" noValidate>
                {this.props.children}
              </form>
            </div>
          </section> 
        )
    }
}

export default PopupWithForm;
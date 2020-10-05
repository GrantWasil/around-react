import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleUrlChange(e) {
        setUrl(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace(
            name,
            url
        )
    }

    return (
        <PopupWithForm name="new" title="New Place" isOpen={props.isOpen} onClose={props.onClose} handleSubmit={handleSubmit}>
            <fieldset className="popup__field">
            <input className="popup__container-name popup__input" id="name-input" placeholder="Title" type="text" name="name" minLength="2" maxLength="30" required value={name} onChange={handleNameChange}/>
            <span className="popup__input-error" id="name-input-error"></span>
            <input className="popup__container-about popup__input" id="about-input" placeholder="Image URL" name="link" type="URL" required value={url} onChange={handleUrlChange}/>
            <span className="popup__input-error" id="about-input-error"></span>
            <button className="popup__container-save" type="submit">Save</button>
            <button className="popup__close" aria-label="Close" type="reset" onClick={props.onClose}></button>
            </fieldset>
      </PopupWithForm>
    )
}

export default AddPlacePopup;
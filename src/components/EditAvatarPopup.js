import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar(
            avatarRef.current.value
        )
    }

    return (
        <PopupWithForm name="photo" title="Change profile picture" isOpen={props.isOpen} onClose={props.onClose} handleSubmit={handleSubmit}>
          <input ref={avatarRef} className="popup__container-about popup__input" id="photo-input" placeholder="Image URL" name="link" type="URL" required/>
          <span className="popup__input-error" id="photo-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
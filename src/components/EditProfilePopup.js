import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser])

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser(
            name,
            description
        );
    }

    return (
        <PopupWithForm name="edit" title="Edit Profile" isOpen={props.isOpen} onClose={props.onClose} handleSubmit={handleSubmit}>
            <fieldset className="popup__field">
                <input className="popup__container-name popup__input" id="newName-input" placeholder="Name" type="text" name="text" minLength="2" maxLength="40" required onChange={handleNameChange} value={name}/>
                <span className="popup__input-error" id="newName-input-error"></span>
                <input className="popup__container-about popup__input" id="newAbout-input" placeholder="About me" type="text" name="about" minLength="2" maxLength="200" required onChange={handleDescriptionChange} value={description}/>
                <span className="popup__input-error" id="newAbout-input-error"></span>
                <button className="popup__container-save" type="submit">Save</button>
                <button className="popup__close" aria-label="Close" type="reset" onClick={props.onClose}></button>
            </fieldset>
      </PopupWithForm>
    )
}

export default EditProfilePopup;
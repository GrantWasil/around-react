class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            });
    }

    getProfileData() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            });
    }

    createNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
    }

    updateUserImage(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
    }

    updateProfileData(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name, about
            })
        })
    }

    changeLikeCardStatus(card, likeState) {
        const likeMethod = likeState ? `PUT` : 'DELETE';
        return fetch(`${this._baseUrl}/cards/likes/${card}`, {
            method: likeMethod,
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            });
    }

    deleteCard(card) {
        return fetch(`${this._baseUrl}/cards/${card}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            });
    }
}


const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-4",
    headers: {
        authorization: "cf891b37-8c41-4e79-9006-bc8a3becbc32",
        "Content-Type": "application/json"
    }
});

export default api; 
export class Api {
  constructor({ url, token }) {
    // тело конструктора
    this._url = url;
    this._authToken = token;
    this._cards = [];
  }

  _checkResponse(res) {

    if (res.ok) {
      return res.json()
    }
    else return Promise.reject(`Ошибка промиса: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authToken
      }
    }).then(this._checkResponse)

  }


  addCard(cardName, cardLink) {

    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    }).then(this._checkResponse)


  }

  deleteCard(cardId) {

    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken
      }
    }).then(this._checkResponse)


  }

  getUser() {

    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse)

  }


  setUser(userName, userAbout) {

    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    }).then(this._checkResponse)

  }

  setAvatar(avatarURL) {

    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarURL
      })
    }).then(this._checkResponse)


  }

  setLike(cardId) {

    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authToken
      }
    }).then(this._checkResponse)
  }

  removeLike(cardId) {

    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken
      }
    }).then(this._checkResponse)
  }
}

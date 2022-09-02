export class Api {
  constructor({ url, token }) {
    // тело конструктора
    this._url = url;
    this._authToken = token;
    this._cards = [];
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authToken
      }
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      else return Promise.reject(`Ошибка промиса: ${res.status}`)
    })

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
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      else return Promise.reject(`Ошибка промиса: ${res.status}`)
    })

  }

  deleteCard(cardId) {

    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken
      }
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      else return Promise.reject(`Ошибка промиса: ${res.status}`)
    })

  }



  getUser() {

    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      else return Promise.reject(`Ошибка промиса: ${res.status}`)
    })


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
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      else return Promise.reject(`Ошибка промиса: ${res.status}`)
    })

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
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      else return Promise.reject(`Ошибка промиса: ${res.status}`)
    })

  }



  setLike(cardId) {

    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authToken
      }
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      else return Promise.reject(`Ошибка промиса: ${res.status}`)
    })
  }

  removeLike(cardId) {

    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken
      }
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      else return Promise.reject(`Ошибка промиса: ${res.status}`)
    })
  }


  // другие методы работы с API
}

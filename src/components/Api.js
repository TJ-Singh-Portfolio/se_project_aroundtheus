class Api {
  constructor(options) {
    this._baseURL = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((res) => res);
  }

  addCard(name, link) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._checkResponse)
      .then((res) => res);
  }
  deleteCard(id) {
    return fetch(`${this._baseURL}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((res) => res);
  }

  loadUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((res) => res);
  }

  editUserInfo(name, about) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(this._checkResponse)
      .then((res) => res);
  }

  updateProfilePicture(url) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    })
      .then(this._checkResponse)
      .then((res) => res);
  }

  likeCard(id) {
    return fetch(`${this._baseURL}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((res) => res);
  }

  unlikeCard(id) {
    return fetch(`${this._baseURL}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((res) => res);
  }

  checkStatus(userInfoFunction, cardsFunction) {
    return Promise.all([userInfoFunction, cardsFunction]);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}

export { Api };

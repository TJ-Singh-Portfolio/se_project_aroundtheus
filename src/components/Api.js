class Api {
  constructor(options) {
    this._baseURL = options.baseUrl;
    this._headers = options.headers;
    //this._authorization = this._headers.authorization;
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => res)
      .catch((err) => {
        console.error(err);
      });
  }

  addCard(name, link) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }
  //Potentially, the template literals could be causing problems.
  deleteCard(id) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d",
        },
      }
    );
  }

  loadUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d",
      },
    })
      .then((res) => {
        if (res.ok) {
          //console.log(res);
          return res.json();
        }

        return Promise.reject(`Error ${res.status}`);
      })
      .then((res) => res)
      .catch((err) => console.error(err));
  }

  editUserInfo(name, about) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  updateProfilePicture(url) {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: url, //link to profile picture
        }),
      }
    );
  }

  likeCard(id) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${id}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d",
        },
      }
    );
  }

  unlikeCard(id) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${id}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d",
        },
      }
    );
  }
}

export { Api };

class Api {
    constructor(options)  {
        this._baseURL = options.baseURL;
        this._headers = options._headers;
        //this._authorization = this._headers.authorization;
    }

    getInitialCards() {
        return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
            headers: {
                authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d"
            }
        })
              .then(res => {
                if (res.ok) {
                  return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
              }).catch((err) => {
                console.error(err);
              });
          }
    
    addCard() {
        return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
            method: POST,
            headers: {
                authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d",
                "Content-Type": "application/json"
            },
            body: JSON.stringify()
        });
    }

    deleteCard() {
        return fetch("https://around-api.en.tripleten-services.com/v1/cards/cardId", {
            method: DELETE,
            headers: {
                authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d"
            }
        });
    }

    loadUserInfo() {
        return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
            headers: {
                authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d"
            }
        });
    }

    editUserInfo() {
        return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
  method: "PATCH",
  headers: {
    authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Marie Skłodowska Curie",
    about: "Physicist and Chemist"
  })
});
    }

    updateProfilePicture() {
        return fetch("https://around-api.en.tripleten-services.com/v1/users/me/avatar", {
  method: "PATCH",
  headers: {
    authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    avatar: www.hotdog.com//link to profile picture
  })
});
    }

    toggleCardLike () {
        // Add logic for determining if card is liked or not
        return fetch("https://around-api.en.tripleten-services.com/v1/cards/cardId/likes", {
            method: PUT,
            headers: {
                authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d"
            }
        });

        return fetch("https://around-api.en.tripleten-services.com/v1/cards/cardId/likes", {
            method: DELETE,
            headers: {
                authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d"
            }
        });
    }

}

export {Api};

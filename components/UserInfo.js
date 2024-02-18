class UserInfo {
  constructor({ profileName, profileJob }) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
  }

  getUserInfo() {
    console.log(this._profileName);
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }
  setUserInfo() {}
}

export { UserInfo };

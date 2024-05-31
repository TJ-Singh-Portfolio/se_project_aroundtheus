class UserInfo {
  constructor({ profileName, profileJob, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      Name: this._profileName.textContent,
      "About me": this._profileJob.textContent,
      avatar: this._profileAvatar,
    };
  }
  setUserInfo(name, job) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }

  updateUserAvatar(url) {
    this._profileAvatar.src = url;
    this._profileAvatar.alt = this._profileName.textContent;
  }
}

export { UserInfo };

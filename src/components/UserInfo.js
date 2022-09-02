export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._name = this._nameElement.textContent;
    this._job = this._jobElement.textContent;

    return { name: this._name, job: this._job }
  }

  setUserInfo(name, job, id) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._id = id;
    this._name = name;
    this._job = job;

  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
    this._avatarElement.alt = `${this._name}, ${this._job}`;

  }
}

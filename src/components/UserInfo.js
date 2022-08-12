export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._name = this._nameElement.textContent;
    this._job = this._jobElement.textContent;

    return { name: this._name, job: this._job }
  }

  setUserInfo(name, job) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;

  }
}

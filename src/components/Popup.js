export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscCloseBound = this._handleEscClose.bind(this);

  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    document.addEventListener('keydown', this._handleEscCloseBound);
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscCloseBound);
    this._popupElement.classList.remove('popup_opened');

  }

  setEventListeners() {

    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }

    });


  }
}

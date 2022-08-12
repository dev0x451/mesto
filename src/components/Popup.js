export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);

  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    //                        устранили потерю контекста this ^^^
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.remove('popup_opened');

  }

  setEventListeners() {

    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }

    });


  }
}

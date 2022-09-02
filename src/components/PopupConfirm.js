import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {

  constructor(popupSelector, handleConfirmButton) {
    super(popupSelector);

    this._confirmButton = this._popupElement.querySelector('.popup__save-button');
    this._defaultConfirmButtonCaption = this._confirmButton.textContent;
    this._handleConfirmButton = handleConfirmButton;
  }

  setCurrentCard(cardInstance) {
    this._currentCard = cardInstance;
  }

  setConfirmButtonCaption(caption) {
    this._confirmButton.textContent = caption;
  }

  setDefaultConfirmButtonCaption() {
    this._confirmButton.textContent = this._defaultConfirmButtonCaption;

  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener('click', (evt) => {

      this._handleConfirmButton(this._currentCard);

    });
  }
}

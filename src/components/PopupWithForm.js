import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandle) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._submitButton = this._popupElement.querySelector('.popup__save-button');
    this._defaultSubmitButtonCaption = this._submitButton.textContent;
    this._allInputs = this._formElement.querySelectorAll('.popup__input');
    this._formSubmitHandle = formSubmitHandle;
  }

  _getInputValues() {
    this._formValues = {};
    this._allInputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;

  }

  setInputValues(formValues) {
    this._allInputs.forEach((input) => {
      input.value = formValues[input.name];
    });

  }

  setSubmitCaption(caption) {
    this._submitButton.textContent = caption;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._formSubmitHandle(this._getInputValues());
      this._formElement.reset();

    });
  }

  open() {
    this.setSubmitCaption(this._defaultSubmitButtonCaption);
    super.open();

  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

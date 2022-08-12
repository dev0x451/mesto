import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandle) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._formSubmitHandle = formSubmitHandle;


    }

    _getInputValues() {
        this._formValues = {};
        this._formElement.querySelectorAll('.popup__input').forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;

    }

    setInputValues(formValues) {
        this._formElement.querySelectorAll('.popup__input').forEach((input) => {
            input.value = formValues[input.name];
        });

    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._formSubmitHandle(this._getInputValues());
            this._formElement.reset();

        });
    }

    close() {
        super.close();
        this._formElement.reset();
    }



}
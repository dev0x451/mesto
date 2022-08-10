import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);

    }

    _getInputValues() {

    }

    setEventListeners() {
        super.setEventListeners();
        // submit add event
    }

    close() {
        // form reset
        super.close();
    }



}
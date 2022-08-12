import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup-gallery__image');
        this._popupCaption = this._popupElement.querySelector('.popup-gallery__caption');

    }

    open(imageLink, caption) {
        this._popupImage.src = imageLink;
        this._popupImage.alt = caption;
        this._popupCaption.textContent = caption;
        super.open();
    }

}

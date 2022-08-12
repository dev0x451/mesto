export class FormValidator {
  constructor(setup, formElement) {
    this._inputSelector = setup.inputSelector;
    this._submitButtonSelector = setup.submitButtonSelector;
    this._inactiveButtonClass = setup.inactiveButtonClass;
    this._inputErrorClass = setup.inputErrorClass;
    this._errorClass = setup.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();

        //иначе поле ввода теряет фокус когда кнопка становится активной!
        this._buttonElement.addEventListener('focus', () => {
          inputElement.focus();
        });

      });
    });
  };

  _toggleButtonState() {

    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  };

  _hasInvalidInput() {

    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });

  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  };

  _showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };


  enableValidation() {

    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();

  };

  resetValidation() {

    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
    })

    this._toggleButtonState();
  };

}





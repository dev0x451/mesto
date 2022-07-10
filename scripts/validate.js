
const showInputError = (inputElement, errorElement, inputErrorClass, errorClass, errorMessage) => {
    inputElement.classList.add(`${inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${errorClass}`);
};

const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
    inputElement.classList.remove(`${inputErrorClass}`);
    errorElement.classList.remove(`${errorClass}`);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    if (!inputElement.validity.valid) {
        showInputError(inputElement, errorElement, inputErrorClass, errorClass, inputElement.validationMessage);
    } else {
        hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
    }
};

const setEventListeners = (formElement, inputList, inputErrorClass, errorClass, buttonElement, inactiveButtonClass) => {
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);

        });
    });
};

const hasInvalidInput = (inputList) => {

    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });

}

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {

    // // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        //     // сделай кнопку неактивной
        buttonElement.classList.add(`${inactiveButtonClass}`);
    } else {
        //     // иначе сделай кнопку активной
        buttonElement.classList.remove(`${inactiveButtonClass}`);
    }
};

const enableValidation = (objSetup) => {
    const { formSelector, inputSelector, submitButtonSelector,
        inactiveButtonClass, inputErrorClass, errorClass } = objSetup;


    const formList = Array.from(document.querySelectorAll(`${formSelector}`));
    formList.forEach((formElement) => {

        const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
        const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, inputList, inputErrorClass, errorClass, buttonElement, inactiveButtonClass);

        //сразу провалидируем кнопку submit
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    });

};



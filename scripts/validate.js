
const showInputError = (inputElement, errorElement, inputErrorClass, errorClass, errorMessage) => {
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
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
        inputElement.addEventListener('input', () => {
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

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {

    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

const enableValidation = (objSetup) => {
    const { formSelector, inputSelector, submitButtonSelector,
        inactiveButtonClass, inputErrorClass, errorClass } = objSetup;


    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {

        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector(submitButtonSelector);
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, inputList, inputErrorClass, errorClass, buttonElement, inactiveButtonClass);

        //сразу провалидируем кнопку submit
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    });

};


const resetValidation = (objSetup) => {
    const { formSelector, inputSelector, submitButtonSelector,
        inactiveButtonClass, inputErrorClass, errorClass } = objSetup;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector(submitButtonSelector);

        inputList.forEach((inputElement) => {
            const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
            hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
        });

        //очищаем форму
        formElement.reset();

        inputName.value = profileName.textContent;
        inputJob.value = profileJob.textContent;

        toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    });

};



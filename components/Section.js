export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._data = items;
        this._renderItem = renderer;
        this._container = document.querySelector(containerSelector);

    }

    addItem(element, toStart = true) {
        if (toStart) this._container.prepend(element)
        else this._container.append(element);

    }

    renderItems() {
        this._data.forEach((item) => {
            this._renderItem(item);
        });
    }

}
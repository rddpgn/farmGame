export default class Storage {
    constructor(guiUpdate) {
        this.storage = { };
        this.guiUpdate = guiUpdate;
    }
    addResource(name, quantity, maxQuantity) {
        let _this = this;
        if (!this.storage.hasOwnProperty(name)) {
            this.storage[name] = {
                name: name,
                quantity: quantity,
                maxQuantity: maxQuantity,
                add: function(callback) {
                    if (this.quantity < maxQuantity) {
                        this.quantity++;
                        _this.guiUpdate(_this.storage);
                        callback();
                    }
                }
            };
        }
        return this.storage[name];
    }
}
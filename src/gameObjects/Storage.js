import GameObject from '../engine/GameObject';
import Sprite from '../engine/Sprite';

export default class Storage extends GameObject {
    constructor(x, y, length, depth, game) {
        super(x, y, length, depth, game);
        this.storage = { };
        this.sprite = new Sprite(document.getElementById('spr-barn'));
    }
    addResource(name, quantity, maxQuantity, tradable) {
        let _this = this;
        if (!this.storage.hasOwnProperty(name)) {
            this.storage[name] = {
                name: name,
                quantity: quantity,
                maxQuantity: maxQuantity,
                tradable: tradable,
                add: function(callback) {
                    if (this.quantity < maxQuantity) {
                        this.quantity++;
                        callback();
                    }
                }
            };
        }
        return this.storage[name];
    }
    sellItem(item) {

    }
    makeInterface(storage) {
        let elements = [];
        let _this = this;
        for(let item in storage) {
            let element = {
                type: 'div',
                text: '',
                childNodes: [
                    {
                        type: 'span',
                        text: `${item}: 
                               ${_this.storage[item].quantity}/
                               ${_this.storage[item].maxQuantity}`,
                    }, 
                ],
            }
            if (this.storage[item].tradable) {
                element.childNodes.push( {
                    type: 'button',
                    text: `Продать ${item}`,
                    handler: _this.sellItem(item),
                });
            }
            elements.push(element);
        }
        return elements;
    }
    getInterface() {
        let _this = this;
        return this.makeInterface(this.storage);
    }
}
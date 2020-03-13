import GameObject from '../engine/GameObject';
import Sprite from '../engine/Sprite';

export default class Storage extends GameObject {
    constructor(x, y, length, depth, game) {
        super(x, y, length, depth, game);
        this.storage = { };
        this.sprite = new Sprite(document.getElementById('spr-barn'));
    }
    addResource(name, quantity, maxQuantity, tradable, cost) {
        let _this = this;
        if (!this.storage.hasOwnProperty(name)) {
            this.storage[name] = {
                name: name,
                quantity: quantity,
                maxQuantity: maxQuantity,
                tradable: tradable,
                cost: cost,
            };
        }
        return this.storage[name];
    }
    addItem(item, amount = 1) {
        let res = this.storage[item];
        if (res.quantity <= res.maxQuantity + amount) {
            res.quantity+= amount;
            return true;
        } 
        return false;
    }
    removeItem(item, amount = 1) {
        let res = this.storage[item];
        if (res.quantity - amount >= 0) {
            res.quantity -= amount;
            return true;
        } 
        return false;
    }
    sellItem(item, cost) {
        if (this.removeItem(item)) {
            this.addItem('Золото', cost);
        }
    }
    makeInterface(storage) {
        let elements = [];
        let _this = this;
        for(let item in storage) {
            let element = {
                type: 'div',
                text: '',
                class: 'horizontal-container',
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
                    handler: _this.sellItem.bind(_this, item, storage[item].cost),
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
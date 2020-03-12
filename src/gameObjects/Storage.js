import GameObject from '../engine/GameObject';
import Sprite from '../engine/Sprite';

export default class Storage extends GameObject {
    constructor(x, y, length, depth, game) {
        super(x, y, length, depth, game);
        this.storage = { };
        this.sprite = new Sprite(document.getElementById('spr-barn'));
    }
    addResource(name, quantity, maxQuantity, tradable, costBuy, costSell) {
        let _this = this;
        if (!this.storage.hasOwnProperty(name)) {
            this.storage[name] = {
                name: name,
                quantity: quantity,
                maxQuantity: maxQuantity,
                tradable: tradable,
                costBuy: costBuy,
                costSell: costSell,
                add: function(n = 1) {
                    if (this.quantity <= maxQuantity - n) {
                        this.quantity += n;
                    }
                },
                remove: function(n = 1) {
                    if (this.quantity >= 0 + n) {
                        this.quantity -= n;
                    }
                }
            };
        }
        return this.storage[name];
    }
    sellItem(item) {
        if (this.storage[item].quantity > 0) {
            this.storage[item].remove();
            this.storage['Золото'].add(this.storage[item].costSell);
        }
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
                    handler: _this.sellItem.bind(_this, item),
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
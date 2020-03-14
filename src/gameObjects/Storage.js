/*
    Здесь хранятся все ресуры, которые мы собираем в течении игры
    Ограничение по размеру сделано специально, чтобы в дальнейшем можно было 
    прикрутить кнопу прокачать склад, но мне уже лень
*/

import GameObject from '../engine/GameObject';
import Sprite from '../engine/Sprite';

export default class Storage extends GameObject {
    constructor(x, y, length, depth, game) {
        super(x, y, length, depth, game);
        this.storage = { };
        this.sprite = new Sprite(document.getElementById('spr-barn'));
    }
    addResource(name, quantity, maxQuantity, tradable, cost) {
        if (!this.storage.hasOwnProperty(name)) {
            this.storage[name] = {
                name: name,                 //Название ресурса
                quantity: quantity,         //Количество ресура
                maxQuantity: maxQuantity,   //Максимально количество, которое можно хранить
                tradable: tradable,         //Можно ли его продать (золото, например, нельзя)
                cost: cost,                 //Если можно продать, то за сколько
            };
        }
        return this.storage[name];
    }
    addItem(item, amount = 1) {
        let res = this.storage[item];
        if (res.quantity + amount <= res.maxQuantity) {
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
        if (this.storage[item].tradable) {
            if (this.removeItem(item)) {
                if (this.addItem('Золото', cost)) {
                    this.game.logMessage(`Вы продали ${item} за ${cost} золота`);
                } else {
                    this.addItem(item);
                    this.game.logMessage(`Недостаточно места на складе для золота`);
                }
            } else {
                this.game.logMessage('Недостаточно ресурсов для продажи')
            }
        } else {
            this.logMessage('Нельзя продать этот ресурс')
        }
    }
    makeInterface(storage) {
        let elements = [];
        let _this = this;

        elements.push({
            type: 'div',
            text: 'Амбар:'
        });

        for(let item in storage) {
            let element = {
                type: 'div',
                text: '',
                className: 'table-row',
                childNodes: [
                    {
                        type: 'div',
                        className: 'text-gui',
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
        return this.makeInterface(this.storage);
    }
}
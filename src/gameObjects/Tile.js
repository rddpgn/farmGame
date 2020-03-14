import GameObject from '../engine/GameObject';
import Sprite from '../engine/Sprite';
import Wheat from './Wheat';
import Chicken from './Chicken';
import Cow from './Cow';

/* 
    Участок поля, на котором можно что-то вырастить
*/
export default class Tile extends GameObject {
    constructor(x, y, length, depth, game, barn) {
        super(x, y, length, depth, game);
        this.sprite = new Sprite(document.getElementById('spr-grass'));
        this.sprite.frames = 2;
        this.sprite.maxCounter = 30 + Math.random() * 30;
        this.entity = null; //То, что растет на нашем поле
        this.barn = barn;   //Склад, на который мы будем складывать ресурсы сущности, которая
                            //Растет на нашем поле
    }
    onMouseOver() {
        this.shape = {
            x: 0,
            y: 0,
            w: this.length,
            h: this.length,
            color: 'rgba(255,255,255,0.3)',
        }
    }
    onMouseLeave() {
        this.shape = null;
    }
    update() {
        super.update();
        if (this.selected) {
            this.shape = {
                x: 0,
                y: 0,
                w: this.length,
                h: this.length,
                color: 'rgba(255,255,255,0.2)',
            }
        } else {
            this.shape = null;
        }
    }
    placeEntity(newEntity) {
        let cost = newEntity.getEntityCost();
        if (!this.entity) {
            if (this.barn.removeItem('Золото', cost)) {
                this.entity = this.game.createGameObject(newEntity, this.x, this.y - 12, 50, 0, cost);
                this.game.logMessage(`Вы построили ${this.entity.name}`);
            } else {
                this.game.logMessage(`Недостаточно денег для постройки`)
            }
        }
    }
    feedEntity() {
        if (this.entity) {
            if (!this.entity.isFeed) {
                if (this.barn.removeItem(this.entity.food, this.entity.foodAmount)) {
                    this.entity.isFeed = true;
                    this.game.logMessage(`Вы покормили ${this.entity.name} 
                                                     (-${this.entity.foodAmount} 
                                                       ${this.entity.food})`);
                } else {
                    this.game.logMessage(`Слишком мало ${this.entity.food} чтобы
                                          покормить ${this.entity.name}`);
                }
            }
        }
    }
    removeEntity() {
        if (this.entity) {
            let cost = Math.floor(this.entity.cost/2);
            if (this.barn.addItem('Золото', cost)) {
                this.game.logMessage(`Вы избавились от ${this.entity.name} за +${cost}`);
                this.game.removeGameObject(this.entity);
                this.entity = null;
            } else {
                this.game.logMessage('Недотаточно места на складе');
            }
        }
    }
    getResource() {
        if (this.entity) {
            if (this.entity.isGrow) {
                if (this.barn.addItem(this.entity.resource, this.entity.resourceAmount)) {
                    this.entity.reset();
                    this.game.logMessage(`Вы собрали ${this.entity.resource} 
                                                    +${this.entity.resourceAmount}`);
                } else {
                    this.game.logMessage('Склад заполнен, невозможно забрать ресурсы')
                }
            } else {
                this.game.logMessage(`${this.entity.name} еще не произвело ${this.entity.resource}`);
            }
        }
    }
    makeInterface(entity) {
        let _this = this;
        let arr = [];
        arr.push({
            type: 'div',
            className: 'text-gui',
            text: `Здесь живет ${entity.name}`,
        });
        arr.push({
            type: 'button',
            text: `Собрать ${this.entity.resource} (+ ${this.entity.resourceAmount} ${this.entity.resource})`,
            handler: _this.getResource.bind(_this),  
        });
        if (entity.foodAmount > 0) {
            arr.push({
                type: 'button',
                text: `Покормить ${this.entity.name} (- ${this.entity.foodAmount} ${this.entity.food})`,
                handler: _this.feedEntity.bind(_this),
            }) 
        };
        arr.push({
            type: 'button',
            text: `Продать ${this.entity.name} (+ ${Math.floor(this.entity.cost/2)} Золото)`,
            handler: _this.removeEntity.bind(_this),
        })
        return arr;
    }
    getInterface() {
        let _this = this;
        if (!this.entity) {
            return [
                {
                    type: 'div',
                    className: 'text-gui',
                    text: 'Здесь можно что-то построить',
                },
                {
                    type: 'button',
                    text: `Посадить пшеницу (-${Wheat.getEntityCost()} Золото)`,
                    handler: _this.placeEntity.bind(_this, Wheat),
                },
                {
                    type: 'button',
                    text: `Завести курицу (-${Chicken.getEntityCost()} Золото)`,
                    handler: _this.placeEntity.bind(_this, Chicken),
                },
                {
                    type: 'button',
                    text: `Завести корову (-${Cow.getEntityCost()} Золото)`,
                    handler: _this.placeEntity.bind(_this, Cow),
                }
            ];
        } else {
            return this.makeInterface(this.entity);
        }
    }
}
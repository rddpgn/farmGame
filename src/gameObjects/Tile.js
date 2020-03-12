import GameObject from '../engine/GameObject';
import Sprite from '../engine/Sprite';
import Wheat from './Wheat';
import Chicken from './Chicken';

export default class Tile extends GameObject {
    constructor(x, y, length, depth, game) {
        super(x, y, length, depth, game);
        this.sprite = new Sprite(document.getElementById('spr-grass'));
        this.sprite.frames = 2;
        this.sprite.maxCounter = 30 + Math.random() * 30;
        this.entity = null;
        this.type = 'tile';
        this.barn = null;
        this.barnResource = null;
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
        let info = newEntity.getEntityInfo();
        if (!this.entity) {
            if (this.barn.storage['Золото'].quantity - info.initialCost >= 0) {
                this.entity = this.game.createGameObject(newEntity, this.x, this.y - 12, 50, 0);
                this.barn.storage['Золото'].remove(this.entity.initialCost);
                this.game.logMessage(`Вы пострили ${this.entity.name}`);
            }
        }
    }
    feedEntity() {
        if (this.entity) {
            if (!this.entity.isFeed) {
                if (this.barn.storage['Пшеница'].quantity > 0) {
                    this.entity.isFeed = true;
                    this.barn.storage['Пшеница'].quantity--;
                    this.game.logMessage('Вы покормили курицу');
                } else {
                    this.game.logMessage('Слишком мало пшеницы, чтобы покормить курицу');
                }
            }
        }
    }
    removeEntity() {
        if (this.entity) {
            this.game.removeGameObject(this.entity);
            this.entity = null;
            this.barnResource = null;
            this.game.logMessage('Ну нахуя сломал то');
        }
    }
    getResource() {
        if (this.entity) {
            if (this.entity.isGrow) {
                this.barn.storage[this.entity.resource].add();
                this.entity.reset();
                this.game.logMessage(this.entity.log.getResource);
            }
        }
    }
    getInterface() {
        let _this = this;
        if (!this.entity) {
            return [
                {
                    type: 'button',
                    text: 'Посадить пшеницу',
                    handler: _this.placeEntity.bind(_this, Wheat),
                },
                {
                    type: 'button',
                    text: 'Завести курицу',
                    handler: _this.placeEntity.bind(_this, Chicken),
                }
            ];
        } else {
            if (this.entity.resource === 'Пшеница') {
                return [
                    {
                        type: 'div',
                        text: 'Здесь растет пшеница',
                    },
                    {
                        type: 'button',
                        text: 'Собрать пшеницу',
                        handler: _this.getResource.bind(_this),
                    },
                    {
                        type: 'button',
                        text: 'Убрать пшеницу',
                        handler: _this.removeEntity.bind(_this),
                    }
                ];
            } else if (this.entity.resource === 'Яйца') {
                return [
                    {
                        type: 'div',
                        text: 'Здесь живет курица',
                    },
                    {
                        type: 'button',
                        text: 'Собрать яйца',
                        handler: _this.getResource.bind(_this),
                    },
                    {
                        type: 'button',
                        text: 'Покормить курицу',
                        handler: _this.feedEntity.bind(_this),
                    },
                    {
                        type: 'button',
                        text: 'Продать курицу',
                        handler: _this.removeEntity.bind(_this),
                    }
                ];
            }
        }
    }
}
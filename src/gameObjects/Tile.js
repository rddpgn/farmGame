import GameObject from '../engine/GameObject';
import Sprite from '../engine/Sprite';
import Wheat from './Wheat';

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
    placeEntity(Entity) {
        if (!this.entity) {
            this.entity = this.game.createGameObject(Entity, this.x, this.y - 12, 50, 0);
            this.barnResource = this.barn.storage[this.entity.type];
            this.game.logMessage(this.entity.log.place);
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
                this.barnResource.add(this.entity.reset.bind(this.entity));
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
                }
            ];
        } else {
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
        }
    }
}
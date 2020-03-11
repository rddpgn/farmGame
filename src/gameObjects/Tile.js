import GameObject from '../engine/GameObject';
import Sprite from '../engine/Sprite';
import Wheat from './Wheat';

export default class Tile extends GameObject {
    constructor(x = 0, y = 0, length = 32, depth, game) {
        super(x, y, length, depth, game);
        this.sprite = new Sprite(document.getElementById('spr-grass'));
        this.sprite.frames = 2;
        this.sprite.maxCounter = 30 + Math.random() * 30;
        this.entity = null;
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
    placeWheat() {
        if (!this.entity) {
            this.entity = this.game.createGameObject(Wheat, this.x, this.y - 12, 50, 0);
            console.log(this.entity.depth);
        }
    }
}
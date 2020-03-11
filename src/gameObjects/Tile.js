import GameObject from '../engine/GameObject';
import Sprite from '../engine/Sprite';

export default class Tile extends GameObject {
    constructor(x = 0, y = 0, length = 32, depth) {
        super(x, y, length, depth);
        this.sprite = new Sprite(document.getElementById('spr-grass'));
    }
    onMouseOver() {
        this.sprite = null;
    }
    onMouseLeave() {
        this.sprite = new Sprite(document.getElementById('spr-grass'));
    }
}
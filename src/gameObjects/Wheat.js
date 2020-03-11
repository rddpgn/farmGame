import Resource from './Resource';
import Sprite from '../engine/Sprite';

export default class Wheat extends Resource {
    constructor(x = 0, y = 0, length = 32, depth) {
        super(x, y, length, depth);
        this.growTime = 100;
        this.sprite = new Sprite(document.getElementById('spr-wheat'));
    }
    update() {
        super.update();
    }
    growCompleted() {
        super.growCompleted();
        console.log('Wheat is grow');
    }
}
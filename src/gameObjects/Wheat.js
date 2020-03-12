import Resource from './Resource';
import Sprite from '../engine/Sprite';

export default class Wheat extends Resource {
    constructor(x = 0, y = 0, length = 32, depth) {
        super(x, y, length, depth);
        this.growTime = 300;
        this.sprite = new Sprite(document.getElementById('spr-wheat'));
        this.sprite.frames = 0;
        this.type='Пшеница';
        this.log.place='Вы посадили пшеницу'
    }
    reset() {
        super.reset();
        this.sprite.imageIndex = 0;
    }
    update() {
        super.update();
        let progress = this.growCounter/this.growTime;

        if (progress > 0.99) {
            this.sprite.imageIndex = 3;
        } else if (progress > 0.66) {
            this.sprite.imageIndex = 2;
        } else if (progress > 0.3) {
            this.sprite.imageIndex = 1;
        } 
    }
    growCompleted() {
        super.growCompleted();
        console.log('Wheat is grow');
    }
}
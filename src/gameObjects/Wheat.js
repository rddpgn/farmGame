import Entity from './Entity';
import Sprite from '../engine/Sprite';

export default class Wheat extends Entity {
    constructor(x = 0, y = 0, length = 32, depth, game, cost) {
        super(x, y, length, depth, game, cost);
        this.name = 'Пшеничное поле';
        this.resource = 'Пшеница';

        this.growTime = 300;
        this.sprite = new Sprite(document.getElementById('spr-wheat'));
        this.sprite.frames = 0;
    }
    static getEntityCost() {
        return 0;
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
}
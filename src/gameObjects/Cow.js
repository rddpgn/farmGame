import Entity from './Entity';
import Sprite from '../engine/Sprite';

export default class Cow extends Entity {
    constructor(x = 0, y = 0, length = 32, depth, game) {
        super(x, y, length, depth, game);

        this.name = 'Корова';
        this.resource = 'Молоко';
        this.resourceAmount = 4;

        this.sprite = new Sprite(document.getElementById('spr-cow'));
        this.sprite.frames = 2;
        this.sprite.maxCounter = 20 + Math.random() * 20;

        this.growTime = 600;
        this.isFeed = false;
        this.foodAmount = 2;
    }
    static getEntityCost() {
        return 40;
    }
    reset() {
        super.reset();
        this.isFeed = false;
    }
    update() {
        super.update();
    }
    growCompleted() {
        super.growCompleted();
        console.log('Cow grew');
    }
}
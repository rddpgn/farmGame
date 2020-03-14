import Entity from './Entity';
import Sprite from '../engine/Sprite';

export default class Cow extends Entity {
    constructor(x = 0, y = 0, length = 32, depth, game, cost) {
        super(x, y, length, depth, game, cost);

        this.name = 'Корова';
        this.resource = 'Молоко';
        this.resourceAmount = 4;

        this.sprite = new Sprite(document.getElementById('spr-cow'));
        this.sprite.frames = 2;
        this.sprite.maxCounter = 20 + Math.random() * 20;

        this.foodCycles = 1;

        this.growTime = 800;
        this.isFeed = false;
        this.foodAmount = 2;
    }
    static getEntityCost() {
        return 40;
    }
}
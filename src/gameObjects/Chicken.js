import Entity from './Entity';
import Sprite from '../engine/Sprite';

export default class Chicken extends Entity {
    constructor(x = 0, y = 0, length = 32, depth, game, cost) {
        super(x, y, length, depth, game, cost);

        this.name = 'Курица';
        this.resource = 'Яйца';

        if (Math.random() > 0.3) {
            this.sprite = new Sprite(document.getElementById('spr-chicken-0'));
            this.sprite.frames = 2;
        } else {
            this.sprite = new Sprite(document.getElementById('spr-chicken-1'));
            this.sprite.frames = 7;   
        }

        this.sprite.maxCounter = 20 + Math.random() * 20;
        this.growTime = 500;
        this.isFeed = false;
        this.foodCycles = 3;
        this.foodAmount = 1;
    }
    static getEntityCost() {
        return 10;
    }
}
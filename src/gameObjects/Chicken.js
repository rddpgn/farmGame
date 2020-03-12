import Entity from './Entity';
import Sprite from '../engine/Sprite';

export default class Chicken extends Entity {
    constructor(x = 0, y = 0, length = 32, depth, game) {
        super(x, y, length, depth, game);

        this.name = 'Курица';
        this.resource = 'Яйца';
        this.initialCost = 10;

        this.sprite = new Sprite(document.getElementById('spr-chicken-0'));
        this.sprite.frames = 2;
        this.sprite.maxCounter = 20 + Math.random() * 20;

        this.growTime = 600;
        this.isFeed = false;
        this.log = {
            place: 'Вы посадили курицу',
            getResource: 'Вы собрали яйца (+1)',
        }
    }
    static getEntityInfo() {
        return {
            name: 'Курица',
            resource: 'Яйцо',
            initialCost: 10,
        }
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
        console.log('Chicken grew');
    }
}
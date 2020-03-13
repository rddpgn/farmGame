import GameObject from '../engine/GameObject';

export default class Entity extends GameObject {
    constructor(x, y, length, depth, game) {
        super(x, y, length, depth, game);
        this.selectable = false;

        this.name = 'name';
        this.cost = 0;
        this.resource = 'resource';
        this.resourceAmount = 1;
        
        this.isFeed = true;
        this.isGrew = false;
        this.food = 'Пшеница';
        this.foodAmount = 0;

        this.growTime = 0;
        this.growCounter = 0;
    }
    static getEntityCost() {
        return 0;
    }
    reset() {
        this.isGrow = false;
        this.growCounter = 0;
        this.shape = null;
    }
    update() {
        super.update();
        if (!this.isGrow && this.isFeed) {
            this.growCounter++;
            
            this.shape = {
                x: 4,
                y: this.length - 8,
                w: (this.length - 8) * (this.growCounter/this.growTime),
                h: 8,
                color: 'red',
            }

            if (this.growCounter === this.growTime) {
                this.isGrow = true;
                this.growCompleted();
            }
        }
    }
    growCompleted() {
        this.shape.color = 'green';
    }
}
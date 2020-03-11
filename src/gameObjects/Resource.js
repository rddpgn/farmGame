import GameObject from '../engine/GameObject';

export default class Wheat extends GameObject {
    constructor(x = 0, y = 0, length = 32, depth) {
        super(x, y, length, depth);
        this.growCounter = 0;
        this.growTime = 0;
        this.isGrow = false;
        this.selectable = false;
    }
    update() {
        if (!this.isGrow) {
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
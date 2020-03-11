export default class Sprite {
    constructor(src) {
        this.img = src;
        this.imageIndex = 0;
        this.frames = 0;
        this.counter = 0;
        this.maxCounter = 0;
    }

    update() {
        if (this.frames > 1) {
            this.counter++;
            if (this.counter >= this.maxCounter) {
                this.imageIndex += 1;
                this.counter = 0;
            }

            if (this.imageIndex === this.frames) {
                this.imageIndex = 0;
            }
        }
    }

}
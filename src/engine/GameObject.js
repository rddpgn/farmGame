export default class GameObject {
    constructor(x = 0, y = 0, length = 32, depth) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.depth = depth;
        this.sprite = null;

        this.mouseover = false;
    }
    onMouseOver() {
    }
    onMouseLeave() {
    }
    onMouseClick() {
    }
}
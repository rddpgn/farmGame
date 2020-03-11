export default class GameObject {
    constructor(x = 0, y = 0, length = 32, depth, sprite) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.color = 'blue';
        this.depth = depth;
        this.sprite = sprite;
    }
}
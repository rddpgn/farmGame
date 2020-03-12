export default class GameObject {
    constructor(x = 0, y = 0, length = 32, depth, game) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.depth = depth;
        this.sprite = null;
        this.shape = null;
        this.mouseover = false;
        this.selected = false;
        this.game = game;
        this.selectable = true;
        this.interface = '';
    }
    update() {
        if (this.sprite) {
            this.sprite.update();
        }
    }
    onMouseOver() {
    }
    onMouseLeave() {
    }
    onMouseClick() {
    }
    getInterface() {};
}
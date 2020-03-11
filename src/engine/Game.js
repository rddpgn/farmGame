import GameObject from './GameObject';

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameObjectStorage = [];

        let renderFuction = this.render.bind(this);
        setInterval(renderFuction, 20);
    }
    createGameObject(x, y, length) {
        let gameObject = new GameObject(x, y, length);
        this.gameObjectStorage.push(gameObject);
        return gameObject;
    }
    update() {

    }
    render() {
        for(let i = 0; i < this.gameObjectStorage.length; i++) {
            this.ctx.fillStyle = this.gameObjectStorage[i].color;
            this.ctx.fillRect(
                this.gameObjectStorage[i].x,
                this.gameObjectStorage[i].y,
                this.gameObjectStorage[i].length,
                this.gameObjectStorage[i].length
            )
        }
    }
}
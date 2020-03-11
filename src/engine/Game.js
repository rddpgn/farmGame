import GameObject from './GameObject';

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameObjectStorage = [];
        this.gameObjectStorage[0] = [];
        this.gameObjectStorage[1] = [];
        this.gameObjectStorage[2] = [];
        this.gameObjectStorage[3] = [];

        let updateFunction = this.update.bind(this);

        this.resourceController = new ResourceController();
        setInterval(updateFunction, 20);
    }
    createGameObject(x, y, length, depth = 3) {
        let gameObject = new GameObject(x, y, length, depth);
        this.gameObjectStorage[depth].push(gameObject);
        return gameObject;
    }
    update() {
        this.render();
    }
    render() {
        for(let n = 0; n < this.gameObjectStorage.length; n++) {
            for(let m = 0; m < this.gameObjectStorage[n].length; m++) {
                let gameObject = this.gameObjectStorage[n][m];
                this.ctx.fillStyle = gameObject.color;
                this.ctx.fillRect(
                    gameObject.x,
                    gameObject.y,
                    gameObject.length,
                    gameObject.length
                )
            }
        }
    }
}
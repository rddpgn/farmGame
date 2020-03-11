import GameObject from './GameObject';

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = {
            x: 0,
            y: 0,
        }

        this.gameObjectStorage = [];
        this.gameObjectStorage[0] = [];
        this.gameObjectStorage[1] = [];
        this.gameObjectStorage[2] = [];
        this.gameObjectStorage[3] = [];

        let updateFunction = this.update.bind(this);

        document.onmousemove = this.updateMousePosition.bind(this);
        setInterval(updateFunction, 20);
    }
    createGameObject(obj, x, y, length, depth = 3, sprite) {
        let gameObject = new obj(x, y, length, depth, sprite);
        this.gameObjectStorage[depth].push(gameObject);
        return gameObject;
    }
    update() {
        this.render();
    }
    updateMousePosition(e) {
        this.mouse.x = e.pageX - this.canvas.getBoundingClientRect().x;
        this.mouse.y = e.pageY - this.canvas.getBoundingClientRect().y;
        this.isMouseOverGameObject();
    }
    isMouseOverGameObject() {
        let mx = this.mouse.x;
        let my = this.mouse.y;
        this.gameObjectStorage.forEach(function(arr) {
            arr.forEach(function(obj) {
                if (mx - obj.x < obj.length && mx - obj.x > 0) {
                    if (my - obj.y < obj.length && my - obj.y > 0) {
                        obj.onMouseOver();
                        obj.mouseover = true;
                    } else {
                        if (obj.mouseover) {
                            obj.onMouseLeave();
                            obj.mouseover = false;
                        }
                    }
                } else {
                    if (obj.mouseover) {
                        obj.onMouseLeave();
                        obj.mouseover = false;
                    }
                }
            })
        })
    }
    render() {
        this.ctx.clearRect(0,0,800,800);
        for(let n = 0; n < this.gameObjectStorage.length; n++) {
            for(let m = 0; m < this.gameObjectStorage[n].length; m++) {
                let gameObject = this.gameObjectStorage[n][m];
                if (gameObject.sprite) {
                    this.ctx.drawImage(
                        gameObject.sprite.img,
                        32,
                        32,
                        gameObject.length,
                        gameObject.length,
                        gameObject.x,
                        gameObject.y,
                        gameObject.length,
                        gameObject.length,                        
                    )
                }
            }
        }
    }
}
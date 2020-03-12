export default class Game {
    constructor(canvas, ctx, gui) {
        let _this =  this;
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

        this.selectedGameobject = null;
        this.gui = gui;

        document.onmousemove = this.updateMousePosition.bind(this);
        document.onclick = function() {
            _this.selectGameObject.call(_this);
            _this.gameObjectInterfaceUpdate.call(_this);
        }

        let updateFunction = this.update.bind(this);
        setInterval(updateFunction, 20);

        
        this.methods = {
            createGameObject: _this.createGameObject.bind(_this),
            removeGameObject: _this.removeGameObject.bind(_this),
            updateInterface: _this.gameObjectInterfaceUpdate.bind(_this),
            logMessage: _this.gui.logMessage.bind(_this.gui),
        }
        return this.methods;
    }
    createGameObject(Obj, x, y, length, depth  = 3) {
        let gameObject = new Obj(x, y, length, depth, this.methods);
        this.gameObjectStorage[depth].push(gameObject);
        return gameObject;
    }
    removeGameObject(remObj) {
        for(let n = 0; n < this.gameObjectStorage.length; n++) {
            for (let m = 0; m < this.gameObjectStorage[n].length; m++) {
                if (this.gameObjectStorage[n][m] === remObj) {
                    this.gameObjectStorage[n][m] = null;
                }
            }
        }
        console.log(this.gameObjectStorage);
    }
    update() {
        this.gameObjectStorage.forEach(function(arr) {
            arr.forEach(function(obj) {
                if (obj) {
                    obj.update();
                }
            })
        });
        this.render();
    }
    updateMousePosition(e) {
        this.mouse.x = e.clientX - this.canvas.getBoundingClientRect().x;
        this.mouse.y = e.clientY - this.canvas.getBoundingClientRect().y;
        this.isMouseOverGameObject();
    }
    isMouseOverGameObject() {
        let mx = this.mouse.x;
        let my = this.mouse.y;
        this.gameObjectStorage.forEach(function(arr) {
            arr.forEach(function(obj) {
                if (obj) {
                    let checkX = mx - obj.x < obj.length && mx - obj.x > 0;
                    let checkY = my - obj.y < obj.length && my - obj.y > 0;

                    if (checkX && checkY) {
                        obj.onMouseOver();
                        obj.mouseover = true;
                    } else {
                        obj.onMouseLeave();
                        obj.mouseover = false;
                    }
                }
            })
        })
    }
    selectGameObject() {
        let select = false;
        let wasSelected = null;
        for(let n = 0; n < this.gameObjectStorage.length; n++) {
            for(let m = 0; m < this.gameObjectStorage[n].length; m++) {
                let gameObject = this.gameObjectStorage[n][m];
                if (gameObject) {
                    if (gameObject.selectable) {
                        if (gameObject.selected) wasSelected = gameObject;
                    
                        if (!select) {
                            if (gameObject.mouseover) {
                                gameObject.selected = true;
                                this.selectedGameobject = gameObject;
                                select = true;
                            } else {
                                gameObject.selected = false;
                            }
                        } else {
                            gameObject.selected = false;
                        }
                    } else {
                        continue;
                    }
                }
            }
        }

        if (!select && wasSelected) {
            wasSelected.selected = true;
        }
    }
    gameObjectInterfaceUpdate() {
        this.gui.drawGameObjectInterface(this.selectedGameobject);
    }
    render() {
        this.ctx.clearRect(0,0,400,400);
        for(let n = this.gameObjectStorage.length-1; n >= 0; n--) {
            for(let m = 0; m < this.gameObjectStorage[n].length; m++) {
                let gameObject = this.gameObjectStorage[n][m];
                if (gameObject) {
                    if (gameObject.sprite) {
                        this.ctx.drawImage(
                            gameObject.sprite.img,
                            gameObject.length * gameObject.sprite.imageIndex,
                            0,
                            gameObject.length,
                            gameObject.length,
                            gameObject.x,
                            gameObject.y,
                            gameObject.length,
                            gameObject.length,                        
                        )
                    }
                    if (gameObject.shape) {
                        this.ctx.fillStyle = gameObject.shape.color;
                        this.ctx.fillRect(
                            gameObject.x + gameObject.shape.x,
                            gameObject.y + gameObject.shape.y,
                            gameObject.shape.w,
                            gameObject.shape.h,
                        )
                    }
                }
            }
        }
    }
}
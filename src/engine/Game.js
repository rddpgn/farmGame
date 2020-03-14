import GameObject from "./GameObject";

/* 
    Класс Game: 
    Создание, хранение, обновление, отрисовка и удаление игровых объектов
    Обработка входных сигналов мыши
    Обновление игрового интерфейса

    (практически везде под объектом подразумевается экземпляр GameObject)
*/
export default class Game {
    constructor(canvas, ctx, canvasW, canvasH, gui, layers) {
        let _this =  this;
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.gui = gui;

        this.mouse = {
            x: 0,
            y: 0,
        }

        /*
        Хранение всех игровых объектов определено на нескольких слоях (layers)
        Слой, на котором хранится объект определяется переменной depth
        Объекты меньшего слоя всегда отрисовываются поверх объектов большего слоя
        */
        this.gameObjectStorage = [];
        for(let i = 0; i <= layers; i++) {
            //Инициализация слоев
            this.gameObjectStorage[i] = new Set();
        }

        this.selectedGameobject = null;

        document.onmousemove = this.updateMousePosition.bind(this);
        document.onclick = function() {
            _this.selectGameObject.call(_this);
            _this.gameObjectInterfaceUpdate.call(_this);
        }

        //Обновляем все игровые объекты как минимум каждые 20 миллисекунд
        let updateFunction = this.update.bind(this);
        setInterval(updateFunction, 20);
        

        /*
        Возвращаем только необходимые методы для работы других классов, 
        ограничивая доступ ко внутренностям
        */
        this.methods = {
            createGameObject: _this.createGameObject.bind(_this),
            removeGameObject: _this.removeGameObject.bind(_this),
            logMessage: _this.gui.logMessage.bind(_this.gui),
        }
        return this.methods;
    }
    /*
        Obj - класс, чей экземпляр необходимо создать 
        Obj должен быть либо GameObject, либо наследовать GameObject

        x, y - координаты

        length - длина объекта, необходима для правильной отрисовки спрайтов и 
        проверки кликов мышью

        depth - глубина слоя
    */
    createGameObject(Obj, x, y, length, depth  = 3, ...args) {
        let gameObject = new Obj(x, y, length, depth, this.methods, ...args);
        this.gameObjectStorage[depth].add(gameObject);
        return gameObject;
    }
    removeGameObject(remObj) {
        this.gameObjectStorage[remObj.depth].delete(remObj);
    }
    update() {
        for(let n = 0; n < this.gameObjectStorage.length; n++) {
            for(let gameObject of this.gameObjectStorage[n]) {
                gameObject.update();
            }
        }
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
        this.gameObjectStorage.forEach(function(set) {
            for(let gameObject of set) {
                if (gameObject) {
                    let checkX = mx - gameObject.x < gameObject.length && mx - gameObject.x > 0;
                    let checkY = my - gameObject.y < gameObject.length && my - gameObject.y > 0;

                    if (checkX && checkY) {
                        gameObject.onMouseOver();
                        gameObject.mouseover = true;
                    } else if (gameObject.mouseover) {
                        gameObject.onMouseLeave();
                        gameObject.mouseover = false;
                    }
                }
            }
        })
    }
    selectGameObject() {
        let select = false;         //Выбрали ли объект
        let wasSelected = null;     //Какой до этого объект был выбран
        for(let n = 0; n < this.gameObjectStorage.length; n++) {
            for(let gameObject of this.gameObjectStorage[n]) {
                if (gameObject) {
                    if (gameObject.selectable) {
                        //Выбранный объект на данный момент сохраняем себе
                        if (gameObject.selected) wasSelected = gameObject;
                    
                        /*
                        Если никого сейчас не выбрали, то проверяем, находится ли мышь над объектом
                        Если уже выбрали объект, то со все остальные помечаем как невыбранные 
                        */
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
                    } 
                }
            }
        }

        /*
        Если никого не выбрали, то хотя-бы тот объект, 
        который был выбран раньше, помечаем как выбранный
        */
        
        if (!select && wasSelected) {
            wasSelected.selected = true;
        }

        if (this.selectedGameObject) {
            this.selectedGameobject.onMouseClick();
        }
        
    }
    //Обновление отрисовки интерфейса, относительно выбранного объекта
    gameObjectInterfaceUpdate() {
        this.gui.drawGameObjectInterface(this.selectedGameobject);
    }
    render() {
        this.ctx.clearRect(0,0,this.canvasW,this.canvasH);
        for(let n = this.gameObjectStorage.length-1; n >= 0; n--) {
            for(let gameObject of this.gameObjectStorage[n]) {
                if (gameObject) {
                    if (gameObject.sprite) {
                        this.ctx.drawImage(
                            gameObject.sprite.img,        //Ссылка на изображение
                            gameObject.length * 
                            gameObject.sprite.imageIndex, //Сколько отступить от левого края
                            0,                            //Сколько отспупить сверху                          
                            gameObject.length,            //Сколько от изображения взять по X
                            gameObject.length,            //Сколько от изображения взять по Y
                            gameObject.x,                 //Координаты
                            gameObject.y,
                            gameObject.length,            //На какую длину растянуть изображение
                            gameObject.length,            
                        )
                    }

                    //Отрисовка формы объекта, если она есть
                    //Удобно, когда нужно что-то еще для отрисовки кроме спрайта
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
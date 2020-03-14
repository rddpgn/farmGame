/*
    Все, что мы видим на экране игры - GameObject.
*/

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
    //Вызывается каждый игровой тик
    update() {
        if (this.sprite) {
            this.sprite.update();
        }
    }
    //Вызывается, когда мышь находится над объектом
    onMouseOver() {}
    //Вызывается, когда мышь покидает объект
    onMouseLeave() {}
    //Вызывается, когда на объект кликнули
    onMouseClick() {}
    //Что отрисовывать, если объект выбрали
    getInterface() {};
}
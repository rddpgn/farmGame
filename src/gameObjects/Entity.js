import GameObject from '../engine/GameObject';

/*
    Сущность, которая растет на поле, и дает ресурсы
*/

export default class Entity extends GameObject {
    constructor(x, y, length, depth, game, cost) {
        super(x, y, length, depth, game);
        this.selectable = false;

        this.name = 'name';         //Имя сущности
        this.cost = cost;           //Цена покупки сущности
        this.resource = 'resource'; //Ресурс, который дает сущность. 
                                    //Должно совпадать с ресурсом на складе (!)
        this.resourceAmount = 1;    //Количество ресурсов, которое дает сущость
        
        this.isFeed = false;        //Покормлена ли
        this.isGrew = false;        //Выросла ли
        this.food = 'Пшеница';      //Ресурс, которым нужно кормить сущность
        this.foodAmount = 0;        //Сколько нужно ресурса, чтобы прокормить
                                    //Если 0, то в кормлении не нуждается
        this.foodCycles = 0;        //На сколько единиц производства ресурсов хватает еды
        this.foodCyclesCounter = 0; 

        this.growTime = 0;          //Сколько игровых тиков должна расти сущность
        this.growCounter = 0;
    }
    //Чтобы как-то понять цену, перед тем как поставить объект
    static getEntityCost() {
        return 0;
    }
    reset() {
        this.isGrow = false;
        this.growCounter = 0;
        this.shape = null;
    }
    update() {
        super.update();
        if (!this.isGrow && (this.isFeed || this.foodAmount === 0)) {
            this.growCounter++;
            
            this.shape = {
                x: 4,
                y: this.length - 8,
                w: (this.length - 8) * (this.growCounter/this.growTime),
                h: 8,
                color: 'red',
            }

            if (this.growCounter === this.growTime) {
                this.isGrow = true;
                this.growCompleted();
            }
        }
    }
    growCompleted() {
        this.shape.color = 'green';
        this.foodCyclesCounter++; 

        if (this.foodCyclesCounter === this.foodCycles) {
            this.foodCyclesCounter = 0;
            this.isFeed = false;
        }
    }
}
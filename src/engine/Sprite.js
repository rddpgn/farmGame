/*
    Класс, для более удобной работы с изображениями
    Для анимации, необходимо задать frames > 1
    
    Каждый кадр изображения должен быть одного размера, а все кадры должны быть
    размещены в одном горизонтально вытянутом изображении
    
    (можно просто в assets посмотреть)
*/

export default class Sprite {
    constructor(src) {
        this.img = src;         //Ссылка на изображение
        this.imageIndex = 0;    //Текущий кадр изображения
        this.frames = 0;        //Количество кадров
        this.counter = 0;       //Счетчик
        this.maxCounter = 0;    //Количество тиков счетчика, чтобы перейти на новый кадр
                                //Чем больше, тем медленнее анимация
    }

    update() {
        if (this.frames > 1) {
            this.counter++;
            if (this.counter >= this.maxCounter) {
                this.imageIndex += 1;
                this.counter = 0;
            }

            if (this.imageIndex === this.frames) {
                this.imageIndex = 0;
            }
        }
    }
}
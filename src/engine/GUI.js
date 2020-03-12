export default class GUI {
    constructor(gameObjectInterfaceContainer = document.body, messageContainer) {
        this.gameObjectInterfaceContainer = gameObjectInterfaceContainer;
        this.messageContainer = messageContainer;
        this.drawGameObjectInterface();
        this.timer = setTimeout(0);
    }
    drawGameObjectInterface(gameObject) {
        this.gameObjectInterfaceContainer.innerHTML = '';
        if (!gameObject) {
            this.gameObjectInterfaceContainer.innerHTML = `Выберите клетку чтобы посадить ресурс`;
        } else {
            let objInterface = this.gameObjectInterfaceParse(gameObject.getInterface());
            if (objInterface) {
                for(let i = 0; i < objInterface.length; i++) {
                    this.gameObjectInterfaceContainer.appendChild(objInterface[i]);
                }
            } else {
                this.gameObjectInterfaceContainer.innerHTML = `Ребят, ну вы тут интерфейс проебали`;
            }
        }
    }
    gameObjectInterfaceParse(arr) {
        if (arr) {
            let elements = [];
            for(let i = 0; i < arr.length; i++) {
                let element = document.createElement(arr[i].type);
                element.innerHTML = arr[i].text;
                if (arr[i].type === 'button') {
                    element.onclick = function() {
                        arr[i].handler();
                    }
                }
                if (arr[i].hasOwnProperty('childNodes')) {
                    let childNodes = this.gameObjectInterfaceParse(arr[i].childNodes);
                    for(let i = 0; i < childNodes.length; i++) {
                        element.appendChild(childNodes[i]);
                    }
                }
                elements.push(element);
            }
            return elements;
        }
        return 0;
    }
    logMessage(message) {
        let _this = this;
        clearTimeout(this.timer);
        this.messageContainer.innerHTML = message;
        this.timer = setTimeout(function() {
            _this.messageContainer.innerHTML = '';
        }, 4000);
    }
}
/*
update -> gameObjectInterfaceUpdate
parseInterface -> gameObjectInterfaceParse
*/

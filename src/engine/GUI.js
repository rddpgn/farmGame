export default class GUI {
    constructor(gameObjectInterfaceContainer = document.body, storageContainer) {
        this.gameObjectInterfaceContainer = gameObjectInterfaceContainer;
        this.storageContainer = storageContainer;
        this.drawGameObjectInterface();
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
                        element.appendChild(childNodes[0]);
                    }
                }
                elements.push(element);
            }
            return elements;
        }
        return 0;
    }
    drawStorageInterface(storage) {
        this.storageContainer.innerHTML = '';
        let elements = this.storageParse(storage);

        for(let i = 0; i < elements.length; i++) {
            this.storageContainer.appendChild(elements[i]);
        }
    }
    storageParse(storage) {
        let elements = [];

        for(let res in storage) {
            let div = document.createElement('div');
            let name = document.createElement('span');
            name.innerHTML = `${storage[res].name}: ${storage[res].quantity}/${storage[res].maxQuantity}`;
            div.appendChild(name);

            if (storage[res].name != 'Золото') {
                let button = document.createElement('button');
                button.innerHTML = `Продать ${storage[res].name}`;
                div.appendChild(button);
            }
            
            elements.push(div);
        }
        return elements;
    }
}
/*
update -> gameObjectInterfaceUpdate
parseInterface -> gameObjectInterfaceParse
*/

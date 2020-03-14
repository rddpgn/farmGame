import Game from './engine/Game';
import Tile from './gameObjects/Tile';
import GUI from './engine/GUI';
import Storage from './gameObjects/Storage';

window.onload = function() {
  let canvas = document.getElementById('main-canvas');
  let ctx = canvas.getContext('2d');

  let gui = new GUI(document.getElementById('gameObject-gui'), document.getElementById('message-gui'));
  let game = new Game(canvas, ctx, 650, 500, gui, 3);

  //Создание склада
  let barn = game.createGameObject(Storage, 500, 50, 100, 0);

  //Добавляем ресурсы на склад
  barn.addResource('Пшеница', 0, 100, true, 2);
  barn.addResource('Молоко', 0, 25, true, 3);
  barn.addResource('Яйца', 0, 25, true, 5);
  barn.addResource('Золото', 0, 1000, false);

  //Создание поля 8x8
  for(let n = 1; n <= 8; n++) {
    for(let m = 1; m <= 8; m++) {    
      game.createGameObject(Tile, n * 50, m * 50, 50, 3, barn);
    }
  }
}
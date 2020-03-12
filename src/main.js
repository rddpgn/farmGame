import Game from './engine/Game';
import Tile from './gameObjects/Tile';
import GUI from './engine/GUI';
import Storage from './gameObjects/Storage';

window.onload = function() {
  let canvas = document.getElementById('main-canvas');
  let ctx = canvas.getContext('2d');

  let gui = new GUI(document.getElementById('gameObject-gui'), document.getElementById('message-gui'));
  let game = new Game(canvas, ctx, gui);
  let barn = game.createGameObject(Storage, 0, 0, 100, 0);

  barn.addResource('Пшеница', 0, 3, true);
  barn.addResource('Молоко', 0, 25, true);
  barn.addResource('Яйца', 0, 25, true);
  barn.addResource('Золото', 0, 25, false);

  for(let n = 1; n <= 8; n++) {
    for(let m = 1; m <= 8; m++) {    
      let tile = game.createGameObject(Tile, n * 50, m * 50, 50, 3);
      tile.barn = barn;
    }
  }
}
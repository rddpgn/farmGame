import Game from './engine/Game';
import Tile from './gameObjects/Tile';
import GUI from './engine/GUI';
import Storage from './gameObjects/Storage';

window.onload = function() {
  let canvas = document.getElementById('main-canvas');
  let ctx = canvas.getContext('2d');

  let gui = new GUI(document.getElementById('gameObject-gui'), document.getElementById('game-gui'));
  let game = new Game(canvas, ctx, gui);
  let barn = new Storage(gui.drawStorageInterface.bind(gui));

  barn.addResource('Пшеница', 0, 3);
  barn.addResource('Молоко', 0, 25);
  barn.addResource('Яйца', 0, 25);
  barn.addResource('Золото', 0, 25);

  barn.guiUpdate(barn.storage);

  for(let n = 1; n <= 8; n++) {
    for(let m = 1; m <= 8; m++) {    
      let tile = game.createGameObject(Tile, n * 50, m * 50, 50, 3);
      tile.barn = barn;
    }
  }
}
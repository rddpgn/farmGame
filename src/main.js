import Game from './engine/Game';
import Tile from './gameObjects/Tile';

window.onload = function() {
  let canvas = document.getElementById('main-canvas');
  let ctx = canvas.getContext('2d');

  let game = new Game(canvas, ctx);

  for(let n = 0; n < 8; n++) {
    for(let m = 0; m < 8; m++) {    
      game.createGameObject(Tile, n * 32, m * 32, 32, 3);
    }
  }
}
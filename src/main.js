import Game from './engine/Game';
import Tile from './gameObjects/Tile';

window.onload = function() {
  let canvas = document.getElementById('main-canvas');
  let ctx = canvas.getContext('2d');

  let game = new Game(canvas, ctx);

  for(let n = 1; n <= 8; n++) {
    for(let m = 1; m <= 8; m++) {    
      game.createGameObject(Tile, n * 50, m * 50, 50, 3);
    }
  }

  let btn = document.getElementById('place-wheat');
  btn.onclick = function() {
    if (game.selectedGameobject instanceof Tile) {
      game.selectedGameobject.placeWheat();
    }
  }
}
import Game from './engine/Game';

window.onload = function() {
  let canvas = document.getElementById('main-canvas');
  let ctx = canvas.getContext('2d');

  let game = new Game(canvas, ctx);

  for(let n = 0; n < 8; n++) {
    for(let m = 0; m < 8; m++) {
      game.createGameObject(n * 75, m * 75, 32);
    }
  }
}
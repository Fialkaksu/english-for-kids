import 'bootstrap';
import Game from './modules/game';

const game = new Game();

const startGame = () => {
  game.setMainWrapper();
  game.setMain();
};

window.addEventListener('DOMContentLoaded', startGame);

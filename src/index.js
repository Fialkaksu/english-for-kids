import Game from './modules/game';
import 'bootstrap';

const game = new Game();

const startGame = () => {
  game.setMainWrapper();
  game.setMain();
};

window.addEventListener('DOMContentLoaded', startGame);

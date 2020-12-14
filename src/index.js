import 'bootstrap';
import Game from './modules/game';
// Инициализируешь ты инстанс тут, а используешь потом в слушателе,
// не хватает проверки на то, что game существует
const game = new Game();

const startGame = () => {
  game.setMainWrapper();
  game.setMain();
};

window.addEventListener('DOMContentLoaded', startGame);

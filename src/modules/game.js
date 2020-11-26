/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import 'bootstrap';
import cards from './cards';

class Game {
  constructor() {
    this.body = document.querySelector('body');
    this.main_wrapper = this.createBlock();

    this.header = this.createBlock();
    this.nav_icon = this.createBlock();
    this.toggler = this.createBlock();

    this.main = this.createBlock('main');

    // this.main = this.createBlock('main');
    // this.cardWrapper = this.createBlock();
    // this.card = this.createBlock();
    // this.img = this.createBlock('img');
    // this.cardBody = this.createBlock();
    // this.link = this.createBlock('a');

    this.baseUrl = '../assets/';

    this.sections = {
      name: cards[0],
      img: cards[1],
    };
    this.dictionary = {
      first_card: cards[2],
      second_card: cards[3],
      third_card: cards[4],
      fourth_card: cards[5],
      fifth_card: cards[6],
      sixth_card: cards[7],
      seventh_card: cards[8],
      eighth_card: cards[9],
    };

    this.button_area = this.createBlock();
    this.score_area = this.createBlock();
    this.button_for_game_start = this.createBlock('button');

    this.isOpen = false;
    this.page_audio_arr = [];
    this.needed_information = {};
    this.first_time = true;
    this.total_mistakes = 0;
    this.number_of_tries = 0;
    this.victory = './audio/correct.mp3';
    this.lose = './audio/error.mp3';
    this.hidden_menu = this.createBlock();
  }

  setMainWrapper() {
    this.main_wrapper.classList.add('container-fluid');
    this.header.classList.add('row');
    this.nav_icon.classList.add('col-2', 'nav-icon');
    this.nav_icon.innerHTML = `
      <span>menu</span>
      <span>menu</span>
      <span>menu</span>
    `;
    this.toggler.classList.add('col-10', 'toggler');
    this.toggler.innerHTML = `
      <label class="switch">
        <input type="checkbox" id="togBtn">
        <div class="slider round unclickable" id="toggler"></div>
      </label>
    `;
    // this.button_area.classList.add('row', 'row-cols-1');

    this.header.append(this.nav_icon);
    this.header.append(this.toggler);
    this.main_wrapper.append(this.header);
    this.body.append(this.main_wrapper);
    // this.body.appendChild(this.button_area);
  }

  setMain() {
    this.cleanGameZone();

    this.main.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'row-cols-xl-4', 'justify-content-center', 'align-items-center');

    for (let i = 0; i < 8; i++) {
      const cardWrapper = this.createBlock();
      const card = this.createBlock();
      const img = this.createBlock('img');
      const cardBody = this.createBlock();
      const link = this.createBlock('a');

      cardWrapper.classList.add('col', 'mb-2');
      card.classList.add('card');
      img.classList.add('card-img-top');
      cardBody.classList.add('card-body', 'text-center');
      link.classList.add('h4', 'card-title', 'text-info');

      console.log(this.sections.img[i]);
      img.src = `${this.baseUrl}${this.sections.img[i]}`;
      link.innerHTML = this.sections.name[i];
      cardBody.append(link);
      card.append(img);
      card.append(cardBody);
      cardWrapper.append(card);
      this.main.append(cardWrapper);
    }

    // this.button_for_game_start.classList.add('button_for_game_start');
    // this.button_for_game_start.innerText = 'START GAME';

    // if (gameMode) {
    //   this.cleanGameZone();
    //   arr.map((el) => {
    //     card.id = el.word;
    //     card.setAttribute('data-audio', `${el.audioSrc}`);
    //     img.src = el.image;
    //     img.classList.add('big_img', 'full_picture');
    //   });
    //   this.button_area.appendChild(this.button_for_game_start);
    //   this.button_for_game_start.classList.remove('hide_button');
    //   this.toggler.classList.remove('unclickable');
    //   this.main.classList.add('unclickable');
    // }else{
    //   this.cleanGameZone();
    //   arr.map((el) => {
    //     card.id = el.word;
    //     card.setAttribute('data-audio', `${el.audioSrc}`);
    //     img.src = el.image;
    //     img.classList.add('big_img', 'full_picture');
    //   });
    // }

    this.main_wrapper.append(this.main);
  }

  setButtonArea() {

  }

  setScoreArea() {

  }

  createBlock(el) {
    if (!el) {
      el = 'div';
    }
    return document.createElement(el);
  }

  start() {

  }

  cleanGameZone() {
    this.main.innerHTML = '';
    // this.button_area.innerHTML = '';
    // this.score_area.innerHTML = '';
  }

  reloadPage() {
    window.location.reload();
  }

  playAudio(url) {
    new Audio(url).play();
  }
}

export default Game;
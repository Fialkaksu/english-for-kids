/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import 'bootstrap';
import cards from './cards';
// import Card from './card';

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

    // this.button_area = this.createBlock();
    // this.score_area = this.createBlock();
    // this.button_for_game_start = this.createBlock('button');

    // this.isOpen = false;
    // this.page_audio_arr = [];
    // this.needed_information = {};
    // this.first_time = true;
    // this.total_mistakes = 0;
    // this.number_of_tries = 0;
    // this.victory = './audio/correct.mp3';
    // this.lose = './audio/error.mp3';
    // this.hidden_menu = this.createBlock();
  }

  // make Base Container for app
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

  // make Base Main container for cards
  setMain() {
    this.main.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'row-cols-xl-4', 'justify-content-center', 'align-items-center');

    for (let i = 0; i < 8; i++) {
      const cardWrapper = this.createBlock();
      const card = this.createBlock();
      const img = this.createBlock('img');
      const cardBody = this.createBlock();
      const link = this.createBlock('a');

      cardWrapper.classList.add('col', 'mb-2', 'card_wrapper');
      card.classList.add('card', 'card-main');
      card.dataset.sectionId = `${i}`;
      img.classList.add('card-img-top');
      cardBody.classList.add('card-body', 'text-center');
      link.classList.add('h4', 'card-title', 'text-info');

      img.src = `${this.baseUrl}${this.sections.img[i]}`;
      link.innerHTML = this.sections.name[i];

      cardBody.append(link);
      card.append(img);
      card.append(cardBody);
      cardWrapper.append(card);
      this.main.append(cardWrapper);
    }

    this.main_wrapper.append(this.main);
    this.giveEventHandlerToSection();
  }

  // give event handler to sections on main page
  giveEventHandlerToSection() {
    const c = this;
    Array.from(document.querySelectorAll('.card_wrapper')).forEach((section, i) => {
      section.addEventListener('click', () => {
        c.cleanGameZone();
        c.getSection(cards[i + 2]);
      });
    });
  }

  // make cards page per section
  getSection(section) {
    const cardsPerPage = section;
    // console.log(cardsPerPage);

    this.main.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'row-cols-xl-4', 'justify-content-center', 'align-items-center');

    const goBack = this.createBlock();
    goBack.classList.add('btn', 'btn-info', 'col-2', 'go-back');
    goBack.innerHTML = 'Go Back';

    const c = this;

    for (let i = 0; i < cardsPerPage.length; i++) {
      const cardWrapper = this.createBlock();
      const card = this.createBlock();
      const img = this.createBlock('img');
      const cardBody = this.createBlock();
      const textFront = this.createBlock();
      const rotate = this.createBlock('img');

      cardWrapper.classList.add('col', 'mb-2');
      card.classList.add('card');
      card.dataset.cardAudio = `${cardsPerPage[i].audioSrc}`;
      img.classList.add('card-img-top');
      cardBody.classList.add('row', 'card-body', 'text-center');
      textFront.classList.add('h4', 'col', 'card-title', 'text-info');
      rotate.classList.add('img', 'col-2', 'rotate');

      card.addEventListener('click', () => {
        c.getVoice(`${c.baseUrl}${cardsPerPage[i].audioSrc}`);
      });
      rotate.addEventListener('click', () => {
        c.getVoice(`${c.baseUrl}${cardsPerPage[i].audioSrc}`);
      });

      // console.log(this.sections.img[i]);
      // console.log(card.dataset.sectionId);

      img.src = `${this.baseUrl}${cardsPerPage[i].image}`;
      textFront.innerHTML = cardsPerPage[i].word;
      rotate.src = `${this.baseUrl}img/rotate.png`;
      cardBody.append(textFront);
      cardBody.append(rotate);
      card.append(img);
      card.append(cardBody);
      cardWrapper.append(card);
      this.main.append(cardWrapper);
    }

    this.main.append(goBack);
    // const c = this;
    goBack.addEventListener('click', () => {
      c.backHandler();
    });
    this.main_wrapper.append(this.main);
  }

  setButtonArea() {

  }

  setScoreArea() {

  }

  // generate Element to append
  createBlock(el) {
    if (!el) {
      el = 'div';
    }
    return document.createElement(el);
  }

  // clean Base Main container for cards
  cleanGameZone() {
    while (this.main.firstChild) {
      this.main.removeChild(this.main.firstChild);
    }
  }

  // go back to main page
  backHandler() {
    this.cleanGameZone();
    this.setMain();
  }

  reloadPage() {
    window.location.reload();
  }

  playAudio(url) {
    new Audio(url).play();
  }

  getVoice(url) {
    new Audio(url).play();
  }
}

export default Game;

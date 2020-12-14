// Нельзя отключать правила eslint
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import 'bootstrap';
// по условию выполнения нельзя использовать jquery
import {
  event,
  isWindow
} from 'jquery';
import cards from './cards';
// import Card from './card';

// Весь класс получился очень большим, его трудно понять.
// Попробуй разбить его на основные компоненты своего приложения, выделить их в отдельные классы
class Game {
  constructor() {
    // конструктор получился очень большим, лучше разбить его тело на мелкие методы
    this.body = document.querySelector('body');
    this.main_wrapper = this.createBlock();

    this.header = this.createBlock('header');
    this.nav_icon = this.createBlock();
    this.toggler = this.createBlock();
    this.switch = this.createBlock('label');
    this.checkBox = this.createBlock('input');
    this.slider = this.createBlock();

    this.main = this.createBlock('main');

    // this.main = this.createBlock('main');
    // this.cardWrapper = this.createBlock();
    // this.card = this.createBlock();
    // this.img = this.createBlock('img');
    // this.cardBody = this.createBlock();
    // this.link = this.createBlock('a');

    this.baseUrl = './assets/';

    this.sections = {
      name: cards[0],
      img: cards[1],
    };
    this.allCards = cards;

    this.menu = this.createBlock('nav');
    this.isOpen = false;

    this.game_mode = false;
    this.start_game = this.createBlock();
    this.score_area = this.createBlock();

    this.countWinStars = 0;
    this.countLooseStars = 0;
    this.winnerVoice = `${this.baseUrl}/audio/correct.mp3`;
    this.looseVoice = `${this.baseUrl}/audio/error.mp3`;

    // this.dictionary = {
    //   first_card: cards[2],
    //   second_card: cards[3],
    //   third_card: cards[4],
    //   fourth_card: cards[5],
    //   fifth_card: cards[6],
    //   sixth_card: cards[7],
    //   seventh_card: cards[8],
    //   eighth_card: cards[9],
    // };

    // this.button_area = this.createBlock();
    // this.score_area = this.createBlock();
    // this.button_for_game_start = this.createBlock('button');

    // this.page_audio_arr = [];
    // this.needed_information = {};
    // this.first_time = true;
    // this.total_mistakes = 0;
    // this.number_of_tries = 0;
    // this.victory = './audio/correct.mp3';
    // this.lose = './audio/error.mp3';
  }

  // make Base Container for app
  setMainWrapper() {
    this.main_wrapper.classList.add('container-fluid');
    this.header.classList.add('row', 'text-right', 'p-3');
    this.nav_icon.classList.add('col-1', 'nav-icon');
    this.nav_icon.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    this.toggler.classList.add('col', 'toggler');
    // this.toggler.innerHTML = `
    //   <label class="switch">
    //     <input type="checkbox" id="togBtn">
    //     <div class="slider round" id="toggler"></div>
    //   </label>
    // `;
    this.switch.classList.add('switch');
    this.checkBox.classList.add('togBtn');
    // this.slider.classList.add('slider', 'train', 'unclickable');
    this.slider.classList.add('slider', 'train');

    this.switch.appendChild(this.checkBox);
    this.switch.appendChild(this.slider);
    this.toggler.append(this.switch);

    this.header.append(this.nav_icon);
    this.header.append(this.toggler);
    this.main_wrapper.append(this.header);
    this.body.append(this.main_wrapper);
    // this.body.appendChild(this.button_area);

    this.createNavigation();
    this.navIconHandler();
    this.modeHandler();
  }

  modeHandler() {
    const c = this;

    this.slider.addEventListener('click', () => {
      c.slider.classList.toggle('game');
      if (c.game_mode) {
        c.game_mode = false;
        console.log(`game_mode ${c.game_mode}`);
      } else {
        c.game_mode = true;
        console.log(`game_mode ${c.game_mode}`);
      }

      if (c.main.id) {
        c.cleanGameZone();
        c.getSection(cards[Number(c.main.id)], c.game_mode);
      }
    });
  }

  // make Base Main container for cards
  setMain() {
    this.main.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'row-cols-xl-4', 'justify-content-center', 'align-items-center', 'main_page');

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
        c.getSection(cards[i + 2], c.game_mode);
      });
    });

    // give event handler to sections on main page
    Array.from(document.querySelectorAll('.nav_item')).forEach((section, i) => {
      section.addEventListener('click', () => {
        c.cleanGameZone();
        c.getSection(cards[i + 2], c.game_mode);
      });
    });
  }

  // make cards page per section
  getSection(section, mode) {
    const cardsPerPage = section;
    // console.log(cardsPerPage);
    // старайся не дублировать код, я уже где-то похожую строчку видел,
    // они отличаются только последним классом
    this.main.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'row-cols-xl-4', 'justify-content-center', 'align-items-center', 'section_page');
    this.main.id = cards.indexOf(cardsPerPage);

    const goBack = this.createBlock();
    goBack.classList.add('btn', 'btn-info', 'col-2', 'go-back');
    goBack.innerHTML = 'Go Back';

    const c = this;

    if (mode) {
      // render cards for game mode
      for (let i = 0; i < cardsPerPage.length; i++) {
        const cardWrapper = this.createBlock();
        const card = this.createBlock();
        const img = this.createBlock('img');

        cardWrapper.classList.add('col', 'mb-2', 'card_wrapper');
        card.classList.add('card');
        // card.dataset.cardAudio = `${cardsPerPage[i].audioSrc}`;
        img.classList.add('card-img');
        img.dataset.cardAudio = `${cardsPerPage[i].audioSrc}`;

        img.src = `${this.baseUrl}${cardsPerPage[i].image}`;

        card.append(img);
        cardWrapper.append(card);
        this.main.append(cardWrapper);
      }

      // sets for start game
      this.score_area.classList.add('border', 'border-warning');
      this.start_game.classList.add('btn', 'btn-warning');
      this.start_game.innerHTML = 'Start Game';
      this.score_area.innerHTML = '';

      this.main.append(this.score_area);
      this.main.append(this.start_game);

      const cardsToFind = new Set();
      // let countWinStars = 0;
      // let countLooseStars = 0;
      let countStars = 0;
      this.start_game.onclick = (event) => {
        // console.log(this);
        // console.log(event);
        event.preventDefault();
        let cardToFind = this.getRandomCard(cardsPerPage);
        if (cardsToFind.has(cardToFind)) {
          cardToFind = this.getRandomCard(cardsPerPage);
        }
        cardsToFind.add(cardToFind);
        this.getVoice(`${this.baseUrl}${cardToFind.audioSrc}`);
        this.checkCard(cardToFind);
        // const check = this.checkCard(cardToFind);

        if (countStars < 8) {
          countStars += 1;
          console.log(countStars);
        } else {
          console.log('Game Over');
        }
      };
    } else {
      // render cards for train mode
      for (let i = 0; i < cardsPerPage.length; i++) {
        const cardWrapper = this.createBlock();
        const card = this.createBlock();
        const img = this.createBlock('img');
        const cardBody = this.createBlock();
        const textFront = this.createBlock();
        const rotate = this.createBlock('img');

        cardWrapper.classList.add('col', 'mb-2', 'card_wrapper');
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
          textFront.innerHTML = cardsPerPage[i].translation;
          cardWrapper.classList.toggle('rotation');
          cardWrapper.addEventListener('mouseleave', () => {
            cardWrapper.classList.remove('rotation');
            textFront.innerHTML = cardsPerPage[i].word;
          });
        });

        img.src = `${this.baseUrl}${cardsPerPage[i].image}`;
        textFront.innerHTML = cardsPerPage[i].word;
        rotate.src = `${this.baseUrl}img/rotate.gif`;
        cardBody.append(textFront);
        cardBody.append(rotate);
        card.append(img);
        card.append(cardBody);
        cardWrapper.append(card);
        this.main.append(cardWrapper);
      }
    }

    this.main.append(goBack);

    goBack.addEventListener('click', () => {
      c.backHandler();
    });

    this.main_wrapper.append(this.main);
    this.main.addEventListener('click', () => {
      if (this.isOpen === true && event.target.classList !== 'nav-icon' && event.target.id !== 'hidden_menu') {
        this.nav_icon.classList.toggle('open');
        this.menu.classList.toggle('dark_side_hidden');
        this.isOpen = false;
      }
    });
  }

  checkCard(cardToFind) {
    Array.from(document.querySelectorAll('.card-img')).forEach((card) => {
      card.addEventListener('click', (event) => {
        if (!event.target.dataset.cardAudio) event.stopPropagation();
        const check = event.target.dataset.cardAudio === cardToFind.audioSrc;
        if (check) {
          this.isWin();
        } else {
          this.isLoose();
        }
      });
    });
  }

  isWin() {
    this.score_area.append(this.createFullStar());
    this.getVoice(this.winnerVoice);
    return false;
  }

  isLoose() {
    this.score_area.append(this.createEmptyStar());
    this.getVoice(this.looseVoice);
    return false;
  }

  // create star for winner case
  createFullStar() {
    const fullStar = this.createBlock('img');
    fullStar.classList.add('full');
    fullStar.src = `${this.baseUrl}img/full_star.png`;
    // this.score_area.append(fullStar);
    // this.countWinStars += 1;
    return fullStar;
  }

  // create star for loose case
  createEmptyStar() {
    const emptyStar = this.createBlock('img');
    emptyStar.classList.add('empty');
    emptyStar.src = `${this.baseUrl}img/star.png`;
    // this.score_area.append(emptyStar);
    // this.countLooseStars += 1;
    return emptyStar;
  }

  getRandomCard(cardsArr) {
    return cardsArr[Math.floor(Math.random() * cardsArr.length)];
  }

  // create navigation menu for sections
  createNavigation() {
    this.menu.classList.add('navbar-nav', 'dark_side_of_navigation', 'dark_side_hidden', 'pt-5', 'pl-5');
    this.menu.id = 'hidden_menu';

    for (let i = 0; i < 9; i++) {
      const navItem = this.createBlock('a');
      navItem.classList.add('nav-link', 'text-info', 'h4');
      navItem.style.cursor = 'pointer';
      navItem.dataset.navId = `${i}`;
      navItem.innerHTML = this.sections.name[i];
      if (i === 8) {
        navItem.innerHTML = 'Statistic';
        navItem.classList.add('stat');
      } else {
        navItem.classList.add('nav_item');
      }
      this.menu.append(navItem);
    }

    this.body.append(this.menu);

    this.menuHandler();
  }

  navIconHandler() {
    this.nav_icon.addEventListener('click', () => {
      if (this.isOpen) {
        this.nav_icon.classList.toggle('open');
        this.menu.classList.toggle('dark_side_hidden');
        this.isOpen = false;
        return;
      }
      this.nav_icon.classList.toggle('open');
      this.menu.classList.toggle('dark_side_hidden');
      this.isOpen = true;
    });
  }

  menuHandler() {
    this.menu.addEventListener('click', () => {
      this.hideMenu();
      this.isOpen = false;
    });
  }

  hideMenu() {
    this.nav_icon.classList.toggle('open');
    this.menu.classList.toggle('dark_side_hidden');
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

  getVoice(url) {
    new Audio(url).play();
  }
}

export default Game;
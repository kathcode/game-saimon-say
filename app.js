// Global variables
const btnStart = document.querySelector('#btnStart');
const lightBlue = document.querySelector('#light-blue');
const violet = document.querySelector('#violet');
const orange = document.querySelector('#orange');
const green = document.querySelector('#green');
const level = document.createElement('div');
const showLevelInCircle = document.getElementById('show-level');
const showWinnerBox = document.getElementById('winner-box');
const audioCorrectColor = document.getElementById('correct-color');
const audioWrongColor = document.getElementById('wrong-color');
const showGameOverBox = document.getElementById('game-over-box');
level.className = 'level';
document.body.append(level);

class Game {
  constructor() {
    this.initializeGame();
    this.generateSequence();
    this.nextLevel();
  }

  initializeGame() {
    btnStart.classList.add('hide');
    this.level = 1;
    this.colors = {
      lightBlue,
      violet,
      orange,
      green,
    };

    this.chooseColor = this.chooseColor.bind(this);
  }

  /**
   * Generate an array with random numbers between 0 and 3 that
   * are the numbers of the colors
   */
  generateSequence() {
    this.sequence = new Array(10).fill(0).map(number => Math.floor(Math.random() * 4));
  }

  /**
   * Show the secuence of the colors and
   * add a listener for the clicks in the colors
   */
  nextLevel() {
    this.subLevel = 0;
    this.illuminateSequence();
    this.addEventClick();
  }

  /**
   * Illuminates the color of the parameter.
   * @param {string} color The color of the sequence to be illuminated
   */
  illuminateColor(color) {
    this.colors[color].classList.add('light');
    setTimeout(() => this.turnOffColor(color), 350);
  }

  /**
   * Turn off the color removing the class light
   * @param {*} color The color of the sequence to be off
   */
  turnOffColor(color) {
    this.colors[color].classList.remove('light');
  }

  addEventClick() {
    this.colors.lightBlue.addEventListener('click', this.chooseColor);
    this.colors.violet.addEventListener('click', this.chooseColor);
    this.colors.orange.addEventListener('click', this.chooseColor);
    this.colors.green.addEventListener('click', this.chooseColor);
  }

  /**
   * Convert number into a color string
   * @param {number} number Represents the color in number
   * 
   * @returns The color string according to the number
   */
  convertNumberToColor(number) {
    const colors = {
      0: 'lightBlue',
      1: 'violet',
      2: 'orange',
      3: 'green',
    };

    return colors[number];
  }
  
  /**
   * Convert color string into a number
   * @param {*} color Represents the color in string
   * 
   * @returns The number of the color
   */
  convertColorToNumber(color) {
    const colors = {
      lightBlue: 0,
      violet: 1,
      orange: 2,
      green: 3,
    };

    return colors[color];
  }

  /**
   * Will illuminate the sequence of the level
   */
  illuminateSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.convertNumberToColor(this.sequence[i]);
      setTimeout(() => this.illuminateColor(color), 1000 * i);
    }
  }

  /**
   * Check if the number of the color selected are in the sequence
   * in the same positon that the sublevel.
   * Also check if the user win the game or if is enabled to go to the next leve.
   * 
   * @param {object} ev Event of the click
   */
  chooseColor(ev) {
    const color = ev.target.dataset.color;
    const number = this.convertColorToNumber(color);
    if (number === this.sequence[this.subLevel]) {
      this.subLevel ++;
      audioCorrectColor.play();
    } else {
      showGameOverBox.innerHTML = 'Game over';
      showGameOverBox.classList.add('box-with');
      audioWrongColor.play();
    }

    if (this.subLevel === this.level) {
      this.level ++;
      this.nextLevel();
      level.innerHTML = "Level " + this.level;
      showLevelInCircle.innerHTML = this.level;
      showLevelInCircle.classList.add('show-level');
    }

    if (this.level === 10) {
      showWinnerBox.innerHTML = 'You win!!';
      showWinnerBox.classList.add('box-with');
    }
  }
}

function startGame() {
  var game = new Game();
}

function reloadGame() {
  window.location.reload();
}
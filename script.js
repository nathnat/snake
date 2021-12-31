CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const boxSize = 10;
const gameWidth = canvas.width / boxSize;
const gameHeight = canvas.height / boxSize;

class Apple {
  constructor() {
    this.position = this.generateRandomPosition();
  }

  update() {}

  show() {
    const padding = 0;
    context.fillStyle = 'red';
    context
      .roundRect(
        this.position.x * boxSize + padding,
        this.position.y * boxSize + padding,
        boxSize - padding,
        boxSize - padding,
        5
      )
      .fill();
  }

  generateRandomPosition() {
    let position = { x: getRandomInt(0, gameWidth), y: getRandomInt(0, gameHeight) };
    
    if (position.x == 40) position.x -= 1;
    else if (position.y == 40) position.y -= 1;

    for (let i = 0; i < snake.position.length; i++) {
      if (snake.position[i].x == position.x && snake.position[i].y == position.y) {
        return this.generateRandomPosition();
      }
    }
    return position;
  }
}

class Snake {
  constructor() {
    this.direction = 'right';

    this.position = [
      { x: gameWidth / 2 + 1, y: gameHeight / 2 },
      { x: gameWidth / 2 + 2, y: gameHeight / 2 },
      { x: gameWidth / 2, y: gameHeight / 2 },
    ];
  }

  update() {
    this.position.pop();
    this.position.unshift(this.generateNewPosition());

    if (this.position[0].x == apple.position.x && this.position[0].y == apple.position.y) {
      this.position.unshift(this.generateNewPosition());
      apple.position = apple.generateRandomPosition()
    }
  }

  generateNewPosition() {
    let newPosition = {
      x: this.position[0].x,
      y: this.position[0].y,
    };

    switch (this.direction) {
      case 'right':
        newPosition.x = newPosition.x + 1;
        break;
      case 'left':
        newPosition.x = newPosition.x - 1;
        break;
      case 'up':
        newPosition.y = newPosition.y - 1;
        break;
      case 'down':
        newPosition.y = newPosition.y + 1;
        break;
    }
    return newPosition;
  }

  show() {
    const padding = 0;
    context.fillStyle = 'green';
    for (let i = 0; i < this.position.length; i++) {
      context
        .roundRect(
          this.position[i].x * boxSize + padding,
          this.position[i].y * boxSize + padding,
          boxSize - padding,
          boxSize - padding,
          5
        )
        .fill();
    }
  }
}

const snake = new Snake();
const apple = new Apple();
let playing = true;
let interval = 100;
function loop() {
  if (playing) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.show();
    apple.show();
    snake.update();
    apple.update();
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowLeft' && snake.direction != 'right')
    snake.direction = 'left';
  else if (e.key == 'ArrowRight' && snake.direction != 'left')
    snake.direction = 'right';
  else if (e.key == 'ArrowUp' && snake.direction != 'down')
    snake.direction = 'up';
  else if (e.key == 'ArrowDown' && snake.direction != 'up')
    snake.direction = 'down';
});

setInterval(loop, interval);

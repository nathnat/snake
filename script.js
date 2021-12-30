window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
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
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

class Snake {
  constructor() {
    this.direction = 'right';
    this.boxSize = 20;
    this.gameWidth = canvas.width / this.boxSize;
    this.gameHeight = canvas.height / this.boxSize;

    this.position = [
      { x: this.gameWidth / 2, y: this.gameHeight / 2 },
      { x: this.gameWidth / 2 + 1, y: this.gameHeight / 2 },
      { x: this.gameWidth / 2 + 2, y: this.gameHeight / 2 },
    ];
  }

  update() {
    switch (this.direction) {
      case 'right':
        this.position.shift();
        let newPosition = this.position[this.position.length - 1].x + 1;
        if (newPosition > this.gameWidth) {
          newPosition = 0;
        }
        this.position.push({
          x: newPosition,
          y: this.position[this.position.length - 1].y,
        });
        break;
    }
  }

  show() {
    const padding = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'green';
    for (let i = 0; i < this.position.length; i++) {
      context
        .roundRect(
          this.position[i].x * this.boxSize + padding,
          this.position[i].y * this.boxSize + padding,
          this.boxSize - padding,
          this.boxSize - padding,
          5
        )
        .fill();
    }
  }

  setDirection(direction) {
    this.direction = direction;
  }
}

const snake = new Snake();
let playing = true;
let interval = 100;
function loop() {
  if (playing) {
    snake.show();
    snake.update();
  }
}

window.addEventListener('keydown', (e) => {
  console.log(e);
});

setInterval(loop, interval);

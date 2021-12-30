const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');



class Snake {
    constructor() {
        this.boxSize = 20;
        const width = canvas.width / this.boxSize;
        const height = canvas.height / this.boxSize;

        this.position = [
            
            { x:  width / 2, y: height / 2 },
            { x:  width / 2 + 1, y: height / 2 },
            { x:  width / 2 + 2, y: height / 2 },

        ]
    }

    update() {

    }

    show() {
        context.fillStyle = 'green';
        for (let i = 0; i < this.position.length; i++) {
            context.fillRect(this.position[i].x * this.boxSize, this.position[i].y * this.boxSize, this.boxSize, this.boxSize);
        }
    }
}

const snake = new Snake();
snake.show()
console.log(snake);
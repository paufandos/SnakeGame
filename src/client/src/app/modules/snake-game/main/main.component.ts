import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

interface SnakePart {
  x: number;
  y: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  private gameCanvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private snake: SnakePart[] = [];
  private food: SnakePart = { x: 0, y: 0 };
  private direction: Direction = Direction.RIGHT;
  private gameSpeed: number = 150;
  private intervalId: any;
  private blockSize: number = 5; // Tamaño de los cuadritos

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.gameCanvas = this.el.nativeElement.querySelector('canvas');
    this.ctx = this.gameCanvas.getContext('2d')!;
    this.resetGame();
    this.startGame();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.changeDirection(event);
  }

  resetGame() {
    this.snake = [{ x: 100, y: 100 }];
    this.food = this.generateFood();
    this.direction = Direction.RIGHT;
  }

  generateFood(): SnakePart {
    const x = Math.floor(Math.random() * (this.gameCanvas.width / this.blockSize)) * this.blockSize;
    const y = Math.floor(Math.random() * (this.gameCanvas.height / this.blockSize)) * this.blockSize;
    return { x, y };
  }

  startGame() {
    this.intervalId = setInterval(() => {
      this.move();
      if (this.checkCollision()) {
        this.stopGame();
        this.resetGame();
        this.startGame();
      }
      this.draw();
    }, this.gameSpeed);
  }

  stopGame() {
    clearInterval(this.intervalId);
  }

  changeDirection(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== Direction.DOWN) {
          this.direction = Direction.UP;
        }
        break;
      case 'ArrowDown':
        if (this.direction !== Direction.UP) {
          this.direction = Direction.DOWN;
        }
        break;
      case 'ArrowLeft':
        if (this.direction !== Direction.RIGHT) {
          this.direction = Direction.LEFT;
        }
        break;
      case 'ArrowRight':
        if (this.direction !== Direction.LEFT) {
          this.direction = Direction.RIGHT;
        }
        break;
    }
  }

  move() {
    const head = { ...this.snake[0] };
    switch (this.direction) {
      case Direction.UP:
        head.y -= this.blockSize;
        break;
      case Direction.DOWN:
        head.y += this.blockSize;
        break;
      case Direction.LEFT:
        head.x -= this.blockSize;
        break;
      case Direction.RIGHT:
        head.x += this.blockSize;
        break;
    }

    this.snake.unshift(head);
    if (head.x === this.food.x && head.y === this.food.y) {
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  checkCollision(): boolean {
    const head = this.snake[0];
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= this.gameCanvas.width ||
      head.y >= this.gameCanvas.height ||
      this.snake.slice(1).some(part => part.x === head.x && part.y === head.y)
    ) {
      return true;
    }
    return false;
  }

  draw() {
    if (this.ctx) {
      for (let x = 0; x < this.gameCanvas.width; x += this.blockSize) {
        for (let y = 0; y < this.gameCanvas.height; y += this.blockSize) {
          if ((x + y) % (this.blockSize * 2) === 0) {
            this.ctx.fillStyle = '#aad751';
          } else {
            this.ctx.fillStyle = '#a2d04a';
          }
          this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
        }
      }

      for (let i = 0; i < this.snake.length; i++) {
        const part = this.snake[i];
        this.ctx.fillRect(part.x, part.y, this.blockSize, this.blockSize);

        // Dibujar la cabeza de la serpiente (rectángulo blanco)
        if (i === 0) {
          this.ctx.fillStyle = 'white';
          this.ctx.fillRect(part.x, part.y, this.blockSize, this.blockSize);
        }

        this.ctx.fillStyle = 'black';
      }
      // Dibujar la manzana (manzana roja con 2 rabitos verdes)
      this.ctx.fillStyle = 'red';
      const appleX = this.food.x + this.blockSize / 2;
      const appleY = this.food.y + this.blockSize / 2;
      const appleSize = this.blockSize * 0.5;

      // Dibujar cuerpo de la manzana (círculo)
      this.ctx.beginPath();
      this.ctx.arc(appleX, appleY, appleSize, 0, Math.PI * 2);
      this.ctx.fill();

      // Dibujar rabitos verdes
      this.ctx.strokeStyle = 'green';
      this.ctx.lineWidth = this.blockSize / 4;
      this.ctx.beginPath();
      const tailStartX = appleX + appleSize * Math.cos(Math.PI / 6);
      const tailStartY = appleY - appleSize * Math.sin(Math.PI / 6);
      const tailEndX = tailStartX + appleSize * Math.cos(Math.PI / 3);
      const tailEndY = tailStartY - appleSize * Math.sin(Math.PI / 3);
      this.ctx.moveTo(tailStartX, tailStartY);
      this.ctx.lineTo(tailEndX, tailEndY);
      this.ctx.stroke();
    }
  }
}

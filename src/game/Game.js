import { Asteroid } from './Asteroid';
import { GameRenderer } from './GameRenderer';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.asteroids = [];
        this.crosshair = { x: canvas.width / 2, y: canvas.height / 2 };
        this.isGameOver = false;
        this.renderer = new GameRenderer(canvas);

        this.setupEventListeners();
        this.startAsteroidSpawner();
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => {
            this.crosshair.x = e.clientX;
            this.crosshair.y = e.clientY;
        });

        this.canvas.addEventListener('click', () => this.handleShot());
    }

    startAsteroidSpawner() {
        setInterval(() => {
            if (!this.isGameOver) {
                this.asteroids.push(new Asteroid(this.canvas.width));
            }
        }, 1000);
    }

    handleShot() {
        for (let i = this.asteroids.length - 1; i >= 0; i--) {
            const asteroid = this.asteroids[i];
            const dist = Math.hypot(this.crosshair.x - asteroid.x, this.crosshair.y - asteroid.y);
            if (dist < asteroid.size) {
                this.score += Math.floor(Math.random() * 41) + 10;
                this.asteroids.splice(i, 1);

                if (this.score >= this.level * 1500) {
                    this.level++;
                    this.lives++;
                }
            }
        }
    }

    update() {
        if (this.isGameOver) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderer.drawCityOutline();

        for (let i = this.asteroids.length - 1; i >= 0; i--) {
            const asteroid = this.asteroids[i];
            asteroid.update(this.level);
            asteroid.draw(this.ctx);

            if (asteroid.y - asteroid.size > this.canvas.height) {
                this.asteroids.splice(i, 1);
                this.lives--;
                
                if (this.lives <= 0) {
                    this.isGameOver = true;
                    alert('Game Over! Your score: ' + this.score);
                    location.reload();
                    return;
                }
            }
        }

        this.renderer.drawCrosshair(this.crosshair.x, this.crosshair.y);
        this.renderer.drawUI(this.score, this.lives, this.level);
        requestAnimationFrame(() => this.update());
    }
}
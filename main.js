import './style.css';
import { Game } from './src/game/Game';

const app = document.querySelector('#app');
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
app.appendChild(canvas);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const game = new Game(canvas);
game.update();
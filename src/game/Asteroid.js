export class Asteroid {
    constructor(canvasWidth) {
        this.x = Math.random() * canvasWidth;
        this.y = -20;
        this.size = 20 + Math.random() * 30;
        this.speed = 1 + Math.random() * 3;
    }

    update(level) {
        this.y += this.speed * (1 + (Math.floor(level / 5) * 0.02));
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'gray';
        ctx.fill();
        ctx.closePath();
    }
}
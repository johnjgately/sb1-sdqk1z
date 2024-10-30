export class GameRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cityOutline = this.generateCityOutline();
    }

    generateCityOutline() {
        const buildings = [];
        const buildingWidth = 50;
        for (let i = 0; i < this.canvas.width; i += buildingWidth + 10) {
            buildings.push({
                x: i,
                width: buildingWidth,
                height: 50 + Math.random() * 100
            });
        }
        return buildings;
    }

    drawCityOutline() {
        this.ctx.fillStyle = 'darkgray';
        this.ctx.beginPath();
        for (const building of this.cityOutline) {
            this.ctx.rect(
                building.x, 
                this.canvas.height - building.height, 
                building.width, 
                building.height
            );
        }
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawUI(score, lives, level) {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.fillText('Score: ' + score, 20, 30);
        this.ctx.fillText('Lives: ' + lives, 20, 60);
        this.ctx.fillText('Level: ' + level, 20, 90);
    }

    drawCrosshair(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
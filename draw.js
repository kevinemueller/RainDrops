function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var x = 0;
var y = 0;

function mousePos(event) {
    x = event.clientX;
    y = event.clientY;
}

class RainDrop {
    constructor() {
        this.MinSize = 0.5;
        this.Maxsize = 2.5;

        this.MinSpeed = 2;
        this.MaxSpeed = 10;

        // Opacity
        this.opacity = Math.random();

        // Set X-Pos
        this.XPos = random(1, window.innerWidth);

        // Set Size
        this.size = random(this.MinSize, this.Maxsize);

        // Set Speed
        this.speed = random(this.MinSpeed, this.MaxSpeed);

        // Set off screen YPos
        this.YPos = random(-1000, 0);
    }
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

// Rain Drops - (total drops)
var RainDrops = new Array(5000);

// Create and define each raindrop
for(var i = 0; i < RainDrops.length; i++)
    RainDrops[i] = new RainDrop();

function animate() {
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight

    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(var i = 0; i < RainDrops.length; i++) {
        
        ctx.fillStyle = `rgba(0, 122, 125, ${RainDrops[i].opacity}`;
        ctx.fillRect(RainDrops[i].XPos, RainDrops[i].YPos, RainDrops[i].size, RainDrops[i].size);

        // Update Y Pos
        RainDrops[i].YPos+=RainDrops[i].speed;

        // reset variable when limit is reached

        if(RainDrops[i].YPos >= window.innerHeight + 100 || RainDrops[i].XPos >= window.innerWidth || (x >= RainDrops[i].XPos - RainDrops[i].size && x <= RainDrops[i].XPos + RainDrops[i].size && y <= RainDrops[i].YPos + RainDrops[i].size && y >= RainDrops[i].YPos - RainDrops[i].size)) {
            RainDrops[i] = null;
            RainDrops[i] = new RainDrop();
        }
    }
}

animate();

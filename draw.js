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
        this.MinSize = 1;
        this.Maxsize = 3;

        this.MinSpeed = 7;
        this.MaxSpeed = 20;

        // Opacity
        this.opacity = Math.random();

        // Set X-Pos
        this.XPos = random(-100, window.innerWidth);

        // Set Size
        this.size = random(this.MinSize, this.Maxsize);

        // Set Speed
        this.speed = random(this.MinSpeed, this.MaxSpeed);

        // Set off screen YPos
        this.YPos = random(-1000, 0);
    }
}

// Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

// Rain Drops - (total drops)
var RainDrops = new Array(5000);

// Create and define each raindrop
for(var i = 0; i < RainDrops.length; i++)
    RainDrops[i] = new RainDrop();

function animate() {

    // Set Canvas width & height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight

    requestAnimationFrame(animate);

    // clear canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(var i = 0; i < RainDrops.length; i++) {
        
        ctx.fillStyle = `rgba(0, 122, 125, ${RainDrops[i].opacity}`;
        ctx.fillRect(RainDrops[i].XPos, RainDrops[i].YPos, RainDrops[i].size, RainDrops[i].size);

        // Update Y & X Pos
        RainDrops[i].YPos+=RainDrops[i].speed;
        RainDrops[i].XPos+=1;

        // reset variable when limit is reached
        if(RainDrops[i].YPos >= window.innerHeight + 100 || RainDrops[i].XPos >= window.innerWidth || (x >= RainDrops[i].XPos - RainDrops[i].size && x <= RainDrops[i].XPos + RainDrops[i].size && y <= RainDrops[i].YPos + RainDrops[i].size && y >= RainDrops[i].YPos - RainDrops[i].size)) {
            RainDrops[i] = new RainDrop();
        }
    }
}

animate();

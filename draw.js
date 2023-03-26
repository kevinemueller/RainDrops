// Cloud Objects
class Cloud {
    constructor() {

        // Set Velocity
        this.Velocity = 0.1;

        // Set Width
        this.width = window.innerWidth * 0.25;
        
        // Set Y-Pos
        this.YPos = window.innerHeight * 0.25;

        // Set X-Pos
        this.XPos = random(0, 0);
        
    }
}


// Rain Drop Object
class RainDrop {
    constructor() {
        // Min & Max raindrop sizes
        this.MinSize = 1;
        this.Maxsize = parseInt(document.getElementById("Rain-Size").value);

        // Min & Max velocity
        this.MinSpeed = 7;
        this.MaxSpeed = parseInt(document.getElementById("Rain-Speed").value);

        // Opacity
        this.opacity = Math.random();

        // Set X-Pos
        this.XPos = random(-100, window.innerWidth + 100);

        // Set Size
        this.size = random(this.MinSize, this.Maxsize);

        // Set Speed
        this.speed = random(this.MinSpeed, this.MaxSpeed);

        // Set Y-Pos
        this.YPos = random(-1000, 0);
    }
}

// Global Variables
let img = document.getElementById("background-img");

let x = 0;
let y = 0;

// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// Rain Drops - (Max Drops)
let RainDrops = new Array(parseInt(document.getElementById("Rain-Amount").max));

// Cloud
//let Clouds = new Cloud();

// Create and define each raindrop
for(let i = 0; i < RainDrops.length; i++)
    RainDrops[i] = new RainDrop();

// Function returns a random int/float between min - max
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Function returns the mouse X & Y Pos.
function mousePos(event) {
    x = event.clientX;
    y = event.clientY;
}

function animate() {

    // Set Canvas width & height
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;

    window.requestAnimationFrame(animate);

    // clear canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Loop through each raindrop class and update it's variables
    for(let i = 0; i < parseInt(document.getElementById("Rain-Amount").value); i++) {
        
        // Rain Drop Style
        ctx.fillStyle = `rgba(0, 122, 125, ${RainDrops[i].opacity})`;

        // Rain Drop
        ctx.beginPath();
        ctx.arc(RainDrops[i].XPos, RainDrops[i].YPos, RainDrops[i].size, Math.PI, 3*Math.PI);
        ctx.fill();

        // Update Y & X Pos
        RainDrops[i].YPos+=RainDrops[i].speed;

        // Current Settings Selected
        RainDrops[i].XPos+=parseInt(document.getElementById("Rain-Direction").value);

        // reset variables when limit is reached
        if(RainDrops[i].YPos >= canvas.height + 100 || RainDrops[i].XPos >= img.clientWidth || (x >= RainDrops[i].XPos - RainDrops[i].size && x <= RainDrops[i].XPos + RainDrops[i].size && y <= RainDrops[i].YPos + RainDrops[i].size && y >= RainDrops[i].YPos - RainDrops[i].size)) {
            RainDrops[i] = new RainDrop();
            //RainDrops[i].XPos = random(Clouds.XPos - 50, Clouds.XPos + Clouds.width + (150/2));
            //RainDrops[i].YPos = Clouds.YPos;
        }
    }
    /*
    // Cloud Style
    ctx.fillStyle = `rgba(116, 116, 116, 1)`;

    // Cloud
    ctx.fillRect(Clouds.XPos, Clouds.YPos, Clouds.width, 10);

    ctx.beginPath();
    ctx.arc(Clouds.XPos, Clouds.YPos + 10, 25, 1*Math.PI, 2*Math.PI);
    ctx.arc(Clouds.XPos + (Clouds.width / 2), Clouds.YPos + 10, 50, 1*Math.PI, 2*Math.PI);
    ctx.arc(Clouds.XPos + Clouds.width, Clouds.YPos + 10, 75, 1*Math.PI, 2*Math.PI);
    ctx.fill();

    Clouds.XPos+=Clouds.Velocity;

    if(Clouds.XPos >= img.clientWidth)
        Clouds = new Cloud();
    */
}


// Call animate function
animate();
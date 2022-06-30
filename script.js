class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    diff(other) {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    scaled(factor) {
        return new Vector(this.x * factor, this.y * factor);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

let ctx;
let canvas;
let time;
let position = new Vector(80, 80); // Pixels
let start = new Vector(Infinity, Infinity); // Pixels
let direction = new Vector(0, 0); // Pixels
let speed = 250.0; // Pixels per second
let step = 150.0; // Pixels

function tick(newTime){
    let delta = (newTime - time) / 1000.0;
    time = newTime;
    
    let distanceToCover = delta * speed;
    if (position.diff(start).length() + distanceToCover > step) {
        let angle = (Math.random() * Math.PI * 2.0) - Math.PI;
        direction = new Vector(Math.cos(angle), Math.sin(angle));
        start = position;
    }
    
    position = position.add(direction.scaled(distanceToCover));

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(position);
    requestAnimationFrame(tick);
}

function setup() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    time = performance.now();
    tick(time);
}

function drawBall(position) {
    ctx.save();
    {
        ctx.translate(position.x, position.y);
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(50, 50, 15, 0, 2 * Math.PI); // head
        ctx.fill();
    }
    ctx.restore();
}
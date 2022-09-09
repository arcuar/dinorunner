const backGround = document.querySelector("body");
backGround.style.backgroundColor = "black";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 350;

const dino = {
  x: 100,
  y: 200,
  width: 100,
  height: 100,
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

const ground = {
  x: 0,
  y: 200 + dino.height,
  width: canvas.width,
  height: 2,
  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

class Enermy {
  constructor() {
    this.x = canvas.width;
    this.y = 200 + dino.height / 2;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let timer = 0;
const enermys = [];
let score = 0;

let jump = false;
let jumpSpeed = 20;
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    jump = true;
  }
});
document.getElementById("jump").addEventListener("click", (event) => {
  jump = true;
});

let animation;
function main() {
  animation = requestAnimationFrame(main);

  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (jump == true) {
    dino.y -= jumpSpeed;
    jumpSpeed--;
    if (jumpSpeed < -20) {
      jump = false;
      jumpSpeed = 20;
    }
  }

  if (timer % 210 === 0) {
    const enermy = new Enermy();
    enermys.push(enermy);
    score++;
    document.querySelector("h1").innerText = score;
  }

  dino.draw();
  ground.draw();
  enermys.forEach((a) => {
    crashing(dino, a);
    if (a.x <= 0 - a.width) {
      enermys.splice(0, 1);
    }
    a.x -= 7;
    a.draw();
  });
}

function crashing(dino, enermy) {
  if (
    (dino.x < enermy.x + enermy.width) &
    (enermy.x < dino.x + dino.width) &
    (enermy.y - (dino.y + dino.height) < 0)
  ) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
    console.log(enermy.x);
  }
}

main();

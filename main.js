const backGround = document.querySelector("body");
backGround.style.backgroundColor = "black";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 350;

const imgDino = new Image();
imgDino.src = "316DC2E7-592E-4899-A0AA-765075912FFE.jpeg";

const imgEnermy = new Image();
imgEnermy.src = "enermy.jpg";

// 초록 사각형 공룡
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

// 이미지 공룡
const dino2 = {
  x: 100,
  y: 200,
  width: 100,
  height: 100,
  draw() {
    ctx.drawImage(imgDino, this.x, this.y, this.width, this.height);
  },
};

const ground = {
  x: 0,
  y: 200 + dino2.height,
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
    this.y = 200 + dino2.height / 2;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.drawImage(imgEnermy, this.x, this.y, this.width, this.height);
  }
}

let timer = 0;
const enermys = [];
let score = 0;

let enermySpeed = 5;

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
  enermySpeed += 0.01;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (jump == true) {
    dino2.y -= jumpSpeed;
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

  dino2.draw();
  ground.draw();
  enermys.forEach((a) => {
    crashing(dino2, a);
    if (a.x <= 0 - a.width) {
      enermys.splice(0, 1);
    }
    a.x -= enermySpeed;
    a.draw();
  });
}

function crashing(dino, enermy) {
  if (
    (dino2.x < enermy.x + enermy.width) &
    (enermy.x < dino2.x + dino2.width) &
    (enermy.y - (dino2.y + dino2.height) < 0)
  ) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

main();

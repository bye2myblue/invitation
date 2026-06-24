const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const printBtn = document.getElementById('printBtn');
const nameInput = document.getElementById('nameInput');

let CANVAS_WIDTH = 600;
let CANVAS_HEIGHT = 400;

const img = new Image();
img.src = 'invitation.png';

img.onload = function () {
  CANVAS_WIDTH = img.naturalWidth;
  CANVAS_HEIGHT = img.naturalHeight;
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  document.fonts.load('400 20px Epilogue').then(() => {
    drawImage();
  });
};

img.onerror = function () {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  drawPlaceholderBackground();
};

function drawPlaceholderBackground() {
  const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gradient.addColorStop(0, '#d0e8f2');
  gradient.addColorStop(1, '#f7d6e0');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.font = 'italic 20px Georgia';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('[ Your image will appear here ]', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}

function drawImage(name = '') {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (img.complete && img.naturalWidth > 0) {
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else {
    drawPlaceholderBackground();
  }

  if (name.trim() !== '') {
    printName(name.trim());
  }
}

function printName(name) {
  const displayName = name.toUpperCase();

  const boxLeft   = CANVAS_WIDTH  * 0.05;
  const boxRight  = CANVAS_WIDTH  * 0.41;
  const boxTop    = CANVAS_HEIGHT * 0.52;
  const boxBottom = CANVAS_HEIGHT * 0.59;

  const boxCenterX = (boxLeft + boxRight) / 2;
  const boxCenterY = (boxTop + boxBottom) / 2;
  const boxWidth   = boxRight - boxLeft;

  let fontSize = 40;
  ctx.font = `400 ${fontSize}px Epilogue, Arial, sans-serif`;

  while (ctx.measureText(displayName).width > boxWidth * 0.9 && fontSize > 10) {
    fontSize--;
    ctx.font = `400 ${fontSize}px Epilogue, Arial, sans-serif`;
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#000000';
  ctx.fillText(displayName, boxCenterX, boxCenterY);

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
}

printBtn.addEventListener('click', function () {
  const name = nameInput.value;
  if (name.trim() === '') {
    nameInput.focus();
    return;
  }
  drawImage(name);

  setTimeout(() => {
    const link = document.createElement('a');
    link.download = 'your great love letter.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, 100);
});

nameInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    printBtn.click();
  }
});

img.src = 'invitation.png';

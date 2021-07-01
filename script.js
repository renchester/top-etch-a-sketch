'use strict';

// DOM selectors
const r = document.querySelector(':root');

const canvasEl = document.querySelector('.canvas');
const overlayDiv = document.querySelector('.overlay-div');
const queryModal = document.querySelector('.query-modal');
const queryInput = document.querySelector('.query-input');
const warning = document.querySelector('.warning-container');

const colorsContainer = document.querySelector('.colors-container');
const pixelFillRainbow = document.querySelector('.pixel-fill-rainbow');

const btnRandom = document.querySelector('.btn-random');
const btnGray = document.querySelector('.btn-gray');
const btnPicker = document.querySelector('.btn-picker');

const slider = document.querySelector('.slider');
const btnSlider = document.querySelector('.btn-slider');
const btnEraseBrush = document.querySelector('.btn-brush');
const btnEraseAll = document.querySelector('.btn-erase');
const btnToggle = document.querySelector('.btn-toggle');
const btnNew = document.querySelector('.btn-new');
const btnQuery = document.querySelector('.btn-query');

// Game states
let brushState = true;
let eraseState = false;

let colorState = 'default';

// Functions
function init(size = 16) {
  canvasEl.innerHTML = '';
  for (let i = 1; i <= size ** 2; i++) {
    const canvasBox = document.createElement('div');
    canvasBox.classList.add('pixel', `pixel-${i}`);
    canvasEl.append(canvasBox);
  }
}

function displayModal(e) {
  overlayDiv.classList.add('overlay');
  queryModal.classList.remove('hidden');
}

function hideWarning(e) {
  warning.classList.add('hidden');
}

function makeCanvas(e) {
  e.preventDefault();
  queryModal.classList.add('hidden');
  overlayDiv.classList.remove('overlay');

  let size = e.target.classList.contains('btn-slider')
    ? slider.value
    : queryInput.value;

  if (size > 75) {
    size = 75;
    warning.classList.remove('hidden');
    setTimeout(hideWarning, 5000);
  }

  r.style.setProperty('--canvas-size', size);
  slider.value = size;
  init(size);
}

function fillPixel(e) {
  if (!brushState) return;
  const pixel = e.target;

  console.log(r.getProperty('--fill-color'));
  eraseState
    ? pixel.classList.remove('pixel-fill')
    : pixel.classList.add('pixel-fill');
}

function erasePixel(e) {
  if (!brushState) return;
  const pixel = e.target;
  pixel.classList.remove('pixel-fill');
}

function toggleErase(e) {
  eraseState = !eraseState;
  btnEraseBrush.textContent = eraseState ? 'Brush' : 'Eraser';
}

function eraseAllFills(e) {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => pixel.classList.remove('pixel-fill'));
}

function toggleDrawing(e) {
  if (e.key) {
    if (e.key !== 'v') return;
  }

  brushState = !brushState;
  btnToggle.textContent = brushState ? 'Stop drawing' : 'Start drawing';
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeColor(colorState) {
  canvasEl.removeEventListener('mouseover', fillPixel);

  if ((colorState = 'random')) {
    canvasEl.addEventListener('mouseover', fillRandom);
  } else if ((colorState = 'grayscale')) {
    canvasEl.addEventListener('mouseover', fillGray);
  } else if ((colorState = 'specified')) {
    canvasEl.addEventListener('mouseover', fillSpecified);
  }
}

function fillRandom() {
  if (!brushState) return;

  const pixel = e.target;
  pixel.style.backgroundColor = getRandomColor();
}

// Event listeners
canvasEl.addEventListener('mouseover', fillPixel);

btnRandom.addEventListener('click', changeColor);

btnEraseAll.addEventListener('click', eraseAllFills);
btnEraseBrush.addEventListener('click', toggleErase);
btnToggle.addEventListener('click', toggleDrawing);
window.addEventListener('keydown', toggleDrawing);
btnNew.addEventListener('click', displayModal);
btnSlider.addEventListener('click', makeCanvas);
btnQuery.addEventListener('click', makeCanvas);
overlayDiv.addEventListener('click', makeCanvas);

// Initialize game
init();

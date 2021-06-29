'use strict';

// DOM selectors
const canvasEl = document.querySelector('.canvas');

const btnEraseBrush = document.querySelector('.btn-brush');
const btnEraseAll = document.querySelector('.btn-erase');
const btnToggle = document.querySelector('.btn-toggle');
const btnNew = document.querySelector('.btn-new');

// Populate canvas
let row = 16;

for (let i = 1; i <= row ** 2; i++) {
  const canvasBox = document.createElement('div');
  canvasBox.classList.add('pixel', `pixel-${i}`);
  canvasEl.append(canvasBox);
}

// Other logic
let brushState = true;
let eraseState = false;

// Functions
function fillPixel(e) {
  if (!brushState) return;
  const pixel = e.target;

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
  brushState = !brushState;
  btnToggle.textContent = brushState ? 'Stop drawing' : 'Start drawing';
}

// Event listeners
canvasEl.addEventListener('mouseover', fillPixel);
btnEraseBrush.addEventListener('click', toggleErase);
btnEraseAll.addEventListener('click', eraseAllFills);
btnToggle.addEventListener('click', toggleDrawing);

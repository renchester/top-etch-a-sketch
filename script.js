'use strict';

// DOM selectors
const canvasEl = document.querySelector('.canvas');

// Populate Block
let row = 16;

for (let i = 1; i <= row ** 2; i++) {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel');
  pixel.setAttribute('id', `block-${i}`);
  canvasEl.append(pixel);
}

canvasEl.addEventListener('mouseover', fillPixel);

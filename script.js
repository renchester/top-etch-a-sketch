'use strict';

// DOM selectors
const r = document.querySelector(':root');

const canvasEl = document.querySelector('.canvas');
const overlayDiv = document.querySelector('.overlay-div');
const queryModal = document.querySelector('.query-modal');
const queryInput = document.querySelector('.query-input');
const warning = document.querySelector('.warning-container');

const btnContainer = document.querySelector('.btn-container');
const colorsContainer = document.querySelector('.colors-container');

const btnRandom = document.querySelector('.btn-random');
const btnWarm = document.querySelector('.btn-warm');
const btnCool = document.querySelector('.btn-cool');
const btnGray = document.querySelector('.btn-gray');
const btnSpecify = document.querySelector('.btn-specify');

const slider = document.querySelector('.slider');
const btnBorder = document.querySelector('.btn-border');
const btnSlider = document.querySelector('.btn-slider');
const btnEraseBrush = document.querySelector('.btn-brush');
const btnEraseAll = document.querySelector('.btn-erase');
const btnToggle = document.querySelector('.btn-toggle');
const btnNew = document.querySelector('.btn-new');
const btnQuery = document.querySelector('.btn-query');

const bodyEl = document.querySelector('body');
const btnTheme = document.querySelector('.btn-theme');
const footerText = document.querySelector('.footer-desc');

// Game states
let brushState = true;
let eraseState = false;

let colorState = 'default';
let fillColor = 'rgb(116, 116, 116)';

// Functions
function init(size = 16) {
  canvasEl.innerHTML = '';
  for (let i = 1; i <= size ** 2; i++) {
    const emptyPixel = document.createElement('div');
    emptyPixel.classList.add('pixel', `pixel-${i}`);
    canvasEl.append(emptyPixel);
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

  if (eraseState) {
    pixel.style.backgroundColor = 'white';
    return;
  }

  switch (colorState) {
    case 'random':
      pixel.style.backgroundColor = getRandomColor();
      break;
    case 'warm':
      pixel.style.backgroundColor = getWarmColor();
      break;
    case 'cool':
      pixel.style.backgroundColor = getCoolColor();
      break;
    case 'gray':
      pixel.style.backgroundColor = fillColor;
      break;
    default:
      pixel.style.backgroundColor = fillColor;
      break;
  }
}

function erasePixel(e) {
  if (!brushState) return;
  const pixel = e.target;
  pixel.style.backgroundColor = 'white';
}

function toggleErase(e) {
  eraseState = !eraseState;
  btnEraseBrush.textContent = eraseState ? 'Brush' : 'Eraser';

  btnEraseBrush.classList.toggle('btn-active');
}

function eraseAllFills(e) {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => (pixel.style.backgroundColor = 'white'));
}

function toggleDrawing(e) {
  if (e.key) {
    if (e.key !== 'v') return;
  }

  brushState = !brushState;
  btnToggle.textContent = brushState ? 'Stop drawing' : 'Start drawing';

  btnToggle.classList.toggle('btn-active');
}

function toggleBorder(e) {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => pixel.classList.toggle('pixel-border'));
}

////// Color-related functions

function changeColor(e) {
  if (!e.target.classList.contains('btn-color')) return;
  colorState = e.target.id.split('-').pop();

  makeActive(e.target);
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let randomColor = '#';
  for (let i = 0; i < 6; i++) {
    randomColor += letters[Math.floor(Math.random() * 16)];
  }

  return randomColor;
}

function getWarmColor() {
  let color1 = Math.floor(Math.random() * 255);
  let color2 = Math.floor(Math.random() * 100);
  return `rgb(${color1}, ${color2}, 0)`;
}

function getCoolColor() {
  let color1 = Math.floor(Math.random() * 200);
  let color2 = Math.floor(Math.random() * 255);
  return `rgb(0, ${color1}, ${color2})`;
}

function makeActive(target) {
  const childrenArr = Array.from(colorsContainer.children);
  childrenArr.forEach((btn) => btn.classList.remove('btn-color-active'));
  target.classList.add('btn-color-active');
}

// Light Mode

function toggleTheme(e) {
  e.target.classList.contains('theme--light')
    ? changeTheme('lightMode', 'darkMode')
    : changeTheme('darkMode', 'lightMode');

  btnTheme.classList.toggle('theme--light');
  btnTheme.classList.toggle('theme--dark');
}

function changeTheme(current, desired) {
  const buttonsArr = Array.from(btnContainer.children);
  const colorsArr = Array.from(colorsContainer.children);

  let darkMode = 'rgba(53, 53, 53, 0.9)';
  let lightMode = 'rgb(255, 249, 237)';
  let color, other;

  if (desired === 'darkMode') {
    color = darkMode;
    other = lightMode;
  } else {
    color = lightMode;
    other = darkMode;
  }

  bodyEl.style.backgroundColor = other;
  btnTheme.style.color = color;
  btnTheme.textContent = `${desired.split('Mode')[0]}_mode`;
  footerText.style.color = color;

  buttonsArr.forEach(
    (btn) => (btn.style.boxShadow = `0px 4px 0px 4px ${color}`)
  );

  colorsArr.forEach(
    (btn) => (btn.style.boxShadow = `0px 4px 0px 4px ${color}`)
  );
}

// Event listeners
canvasEl.addEventListener('mouseover', fillPixel);

btnEraseBrush.addEventListener('click', toggleErase);
btnEraseAll.addEventListener('click', eraseAllFills);
btnToggle.addEventListener('click', toggleDrawing);
window.addEventListener('keydown', toggleDrawing);
btnNew.addEventListener('click', displayModal);
btnSlider.addEventListener('click', makeCanvas);
btnQuery.addEventListener('click', makeCanvas);
overlayDiv.addEventListener('click', makeCanvas);
btnBorder.addEventListener('click', toggleBorder);

colorsContainer.addEventListener('click', changeColor);

btnTheme.addEventListener('click', toggleTheme);

// Initialize game
init();

/* DECLARATIONS */
const DEFAULT_COLOR = "rgba(248, 250, 240, 0.609)";
const grid = document.querySelector(".grid");
const clearButton = document.querySelector(".clearGrid");
const colorPicker = document.getElementById("colorPicker");
const colorButton = document.querySelector(".colorButton");
const rainbowButton = document.querySelector(".rainbowColors");
const eraserButton = document.querySelector(".eraserButton");
const sizeSlider = document.querySelector('.slider');
const sliderValue = document.querySelector('.sliderValue');

console.log(sliderValue);

let size = 16;
let color = "#000000";
let colorMode = true;
let rainbowMode = false;
let eraserMode = false;

/* FUNCTIONS */
function createGrid() {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        div.addEventListener("mouseover", changeColor);
        grid.appendChild(div);
    }
}

function changeColor(e) {
    if (rainbowMode == true) {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (eraserMode == true) {
        e.target.style.backgroundColor = DEFAULT_COLOR;
    } else {
        e.target.style.backgroundColor = color;
    }
}

function clearGrid() {
    grid.innerHTML = "";
    createGrid();
}

/* EVENT LISTENERS */
clearButton.addEventListener("click", clearGrid);

colorPicker.addEventListener("change", function (e) {
    rainbowMode = false;
    eraserMode = false;
    color = e.target.value;
});

rainbowButton.addEventListener("click", function () {
    rainbowMode = true;
    eraserMode = false;
    colorMode = false;
});

eraserButton.addEventListener("click", function () {
    eraserMode = true;
    colorMode = false;
    rainbowMode = false;
});

colorButton.addEventListener("click", function () {
    colorMode = true;
    eraserMode = false;
    rainbowMode = false;
});

sizeSlider.addEventListener('mousemove', function (e) {
    console.log(e.target.value);
    size = e.target.value;
    sliderValue.textContent = `${e.target.value} x ${e.target.value}`;
})

sizeSlider.addEventListener('change', function (e) {
    console.log(e.target.value);
    size = e.target.value;
    sliderValue.textContent = `${e.target.value} x ${e.target.value}`;
    clearGrid();
})

createGrid();

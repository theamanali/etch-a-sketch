// Colors each grid-box could change to when hovered
const colorStrings = [
    // 40% opacity to start, will be added onto with later hovers
    "rgba(232,20,22,0.4)",
    "rgba(255,165,0,0.4)",
    "rgba(250,235,54,0.4)",
    "rgba(121,195,20,0.4)",
    "rgba(72,125,231,0.4)",
    "rgba(75,54,157,0.4)",
    "rgba(112,54,157,0.4)"
];

const gridContainer = document.querySelector('.grid-container');
const containerWidth = gridContainer.clientWidth;
const adjustGridSlider = document.querySelector("input");
const resetButton = document.querySelector(".reset");
let currentGridWidth = 16

createGrid(currentGridWidth);

let isMouseDown = false;
document.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    const targetDiv = e.target;
    if (targetDiv.id === "grid-box") {
        const currentBgColor = window.getComputedStyle(targetDiv).backgroundColor;

        if (currentBgColor === "rgba(0, 0, 0, 0)") {
            targetDiv.style.backgroundColor = generateRandomColor();
        } else {
            changeOpacity(targetDiv);
        }
    }
})

document.addEventListener("mouseup", () => {
    isMouseDown = false;
})
// Changes color of each grid-box when hovered
gridContainer.addEventListener("mouseover", (e) => {
    if (!isMouseDown) return;

    const targetDiv = e.target;
    if (targetDiv.id === "grid-box") {
        let currentBgColor = window.getComputedStyle(targetDiv)
            .backgroundColor;

        // check if grid-box is default color
        if (currentBgColor === "rgba(0, 0, 0, 0)") {
            targetDiv.style.backgroundColor = generateRandomColor();
        } // increase opacity if already colored
        else{
            changeOpacity(targetDiv);
        }

    }
})

adjustGridSlider.addEventListener("change", e => {
    currentGridWidth = e.target.value;
    createGrid(currentGridWidth);
})

resetButton.addEventListener("mouseenter", (e) => {
    const button = e.target;
    button.style.border = "2px solid white";
})

resetButton.addEventListener("mouseleave", (e) => {
    const button = e.target;
    button.style.border = "none";
})

resetButton.addEventListener("click", () => {
    resetGrid()
    createGrid(currentGridWidth);
})

function createGrid(gridWidth) {
    const hasExistingGrid = gridContainer.hasChildNodes();
    // If not checked will append to bottom, causing overflow
    if (hasExistingGrid) {
        resetGrid()
    }

    let amountOfDivs = gridWidth ** 2;

    // Create grid-box divs
    for (let i = 0; i < amountOfDivs; i++) {
        const newDiv = document.createElement('div');
        // Disregard border when determining height/width
        newDiv.style.width = findBestSquareSize();
        newDiv.style.height = findBestSquareSize();
        newDiv.id = "grid-box";

        gridContainer.appendChild(newDiv);
    }
}

function resetGrid() {
    gridContainer.replaceChildren();
}

function findBestSquareSize() {
    // Find width of each grid-box in pixels
    return (containerWidth / currentGridWidth) + "px";
}

function generateRandomColor() {
    const randomIndex = Math.floor(Math.random() * 7);
    return colorStrings[randomIndex];
}

function changeOpacity(element) {
    const rgbaString = window.getComputedStyle(element).backgroundColor;
    const [r, g, b, a] = rgbaString.replace(
        /^rgba?\(|\s+|\)$/g, '').split(",").map(Number)
    const newA = Math.min(a + 0.2, 1);
    element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${newA}`;
}








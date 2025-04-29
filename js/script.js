const colorStrings = [
    "rgba(232,20,22,0.2)",
    "rgba(255,165,0,0.2)",
    "rgba(250,235,54,0.2)",
    "rgba(121,195,20,0.2)",
    "rgba(72,125,231,0.2)",
    "rgba(75,54,157,0.2)",
    "rgba(112,54,157,0.2)"
];

const gridContainer = document.querySelector('.grid-container');
const resizeButton = document.querySelector(".resize_btn")
const containerWidth = gridContainer.clientWidth;

let currentGridWidth = 16
createGrid(currentGridWidth);

// Changes color of each grid-box when hovered
gridContainer.addEventListener("mouseover", (e) => {
    const targetDiv = e.target;
    if (targetDiv.id === "grid-box") {
        let currentBgColor = window.getComputedStyle(targetDiv).backgroundColor;

        // check if grid-box is default color
        if (currentBgColor === "rgba(0, 0, 0, 0)") {
            targetDiv.style.backgroundColor = generateRandomColor();
        } // increase opacity if already colored
        else{
            changeOpacity(targetDiv);
        }

    }
})

resizeButton.addEventListener("click", promptResizing)

function generateRandomColor() {
    const randomIndex = Math.floor(Math.random() * 7);
    return colorStrings[randomIndex];
}

function changeOpacity(element) {
    const rgbaString = window.getComputedStyle(element).backgroundColor;
    const [r, g, b, a] = rgbaString.replace(/^rgba?\(|\s+|\)$/g, '').split(",").map(Number)
    const newA = Math.min(a + 0.2, 1);
    element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${newA}`;
}


function promptResizing() {
    let userGridWidthString = prompt("What grid size would you like? (1 - 100)");
    let userGridWidth = Number(userGridWidthString);
    let isNotValidWidth = true;

    // Keep prompting user until valid input
    while(isNotValidWidth) {
        if (userGridWidth > 0 && userGridWidth <= 100){
            isNotValidWidth = false;
            currentGridWidth = userGridWidth;
            createGrid(userGridWidth);
        }
        else {
            userGridWidthString = prompt("That is not a valid size! Has to be 1 - 100 (inclusive)");
            userGridWidth = Number(userGridWidthString)
        }
    }
}

function createGrid(gridWidth) {
    const hasExistingGrid = gridContainer.hasChildNodes();
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



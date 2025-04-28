const CONTAINER_SIZE = 960;

const gridContainer = document.querySelector('.grid-container');

let gridWidth = 16;
let amountOfDivs = gridWidth ** 2;
const gridArray = [];

for(let i = 0; i < amountOfDivs; i++) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('grid');
    newDiv.style.border = '1px solid grey';
    newDiv.style.width = findBestSquareSize()
    newDiv.style.height = findBestSquareSize()
    
    gridContainer.appendChild(newDiv);
    gridArray[i] = newDiv;
}


function findBestSquareSize() {
    return ((CONTAINER_SIZE / gridWidth) - 2) + "px";
}

console.log(gridArray);

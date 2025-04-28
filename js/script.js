const CONTAINER_SIZE = 960;

const gridContainer = document.querySelector('.grid-container');

let gridWidth = 16;
let amountOfDivs = gridWidth ** 2;

for(let i = 0; i < amountOfDivs; i++) {
    const newDiv = document.createElement('div');
    newDiv.style.border = '1px solid grey';
    newDiv.style.width = findBestSquareSize();
    newDiv.style.height = findBestSquareSize();
    newDiv.id = "grid-box"
    
    gridContainer.appendChild(newDiv);
}


gridContainer.addEventListener("mouseover", (e) => {
    if (e.target.id === "grid-box") {
        e.target.style.backgroundColor = "black";
    }
})

function findBestSquareSize() {
    return (CONTAINER_SIZE / gridWidth) - 2 + "px";
}



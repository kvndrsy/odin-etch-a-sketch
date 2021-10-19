const container = document.querySelector(".container");
const slider = document.querySelector(".slider");
const resolutionHeader = document.querySelector(".resolution-header");
const resetButton = document.querySelector(".reset-grid");

function colorCell(event) {
  let currentColor = this.style.backgroundColor;

  if (!currentColor) this.style.backgroundColor = getRandomColor();
  else if (currentColor !== "rgb(0, 0, 0)") {
    let currentRgbValues = currentColor.slice(0, -1).split("(")[1].split(", ");

    // Divide each RGB value by the 9th root of 256 to darken any cell to black in at most 10 mouseovers. 
    let newRgbValues = currentRgbValues.map(value => Math.floor(value / 256 ** (1/9)));

    this.style.backgroundColor = `rgb(${newRgbValues[0]}, ${newRgbValues[1]}, ${newRgbValues[2]})`
  }
}

function generateGrid() {
  const sideDimension = slider.valueAsNumber;

  // Empty the container of all currently existing children.
  container.replaceChildren();

  for (let i = 0; i < sideDimension; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
  
    for (let j = 0; j < sideDimension; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
  
      row.appendChild(cell);
    }
  
    container.appendChild(row);
  }

  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.addEventListener("mouseenter", colorCell));
}

function getRandomColor() {
  // There are 16**6 possible hexadecimal color values.
  return `#${Math.floor(Math.random() * 16 ** 6).toString(16).padStart(6, "0")}`;
}

function updateResolutionHeader() {
  resolutionHeader.textContent = `${slider.valueAsNumber} x ${slider.valueAsNumber}`;
}

slider.addEventListener("change", updateResolutionHeader);
resetButton.addEventListener("click", generateGrid)

updateResolutionHeader();
generateGrid();
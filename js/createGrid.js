const container = document.querySelector('#gridContainer')

const gridSize = 16

const createGrid = () => {
  container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`
  container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
  for (let i = 0; i < gridSize ** 2; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    container.appendChild(cell)
  }
}

createGrid()

const cells = document.querySelectorAll('.cell')

for (let i = gridSize - 1; i < cells.length; i++) {
  if ((i + 1) % gridSize === 0) {
    cells[i].style.borderRight = '1px solid #c7c7c7'
  }
}
for (let i = cells.length - gridSize; i < cells.length; i++) {
  cells[i].style.borderBottom = '1px solid #c7c7c7'
}

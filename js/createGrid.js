const container = document.querySelector('#gridContainer')
const gridSizeInput = document.querySelector('#gridSizeInput')
const gridSizeLabel = document.querySelector('#gridSizeLabel')
const gridClearButton = document.querySelector('#gridClearButton')

let gridSize = 16

const createGrid = size => {
  container.style.gridTemplateRows = `repeat(${size},1fr)`
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  for (let i = 0; i < size ** 2; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    container.appendChild(cell)
  }
}

createGrid(gridSize)

let cells = document.querySelectorAll('.cell')

const createGridBorders = size => {
  for (let i = size - 1; i < cells.length; i++) {
    if ((i + 1) % size === 0) {
      cells[i].style.borderRight = '1px solid var(--grid-border-color)'
    } else if (i >= cells.length - size || i === size ** 2 - 2) {
      cells[i].style.borderBottom = '1px solid var(--grid-border-color)'
      cells[i + 1].style.borderBottom = '1px solid var(--grid-border-color)'
    }
  }
}

createGridBorders(gridSize)

gridSizeInput.addEventListener('change', ({ target }) => {
  gridSize = target.value
  gridSizeLabel.textContent = `${gridSize}x${gridSize}`
  container.innerHTML = ''
  createGrid(gridSize)
  cells = document.querySelectorAll('.cell')
  createGridBorders(gridSize)
})

gridClearButton.addEventListener('click', () => {
  gridClearButton.classList.add('active')
  console.log('Clearing')
  container.innerHTML = ''
  createGrid(gridSize)
  console.log('Cleared')
  gridClearButton.classList.remove('active')
})

const container = document.querySelector('#gridContainer')
let root = document.documentElement
let gridSize = 16

document.querySelector('#gridSize').addEventListener('input', e => {
  gridSize = e.target.value
})

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

const createGridBorders = () => {
  for (let i = gridSize - 1; i < cells.length; i++) {
    if ((i + 1) % gridSize === 0) {
      cells[i].style.borderRight = '1px solid var(--grid-border-color)'
      cells[i].style.background = 'green'
      setTimeout(() => {
        cells[i].style.background = ''
      }, 500)
    } else if (i >= cells.length - gridSize || i === gridSize ** 2 - 2) {
      cells[i].style.borderBottom = '1px solid var(--grid-border-color)'
      cells[i + 1].style.borderBottom = '1px solid var(--grid-border-color)'
    }
  }
}

createGridBorders()

document.querySelector('#gridSize').addEventListener('change', e => {
  container.innerHTML = 'Loading'
  gridSize = e.target.value
  setTimeout(() => {
    container.innerHTML = ''
    createGrid(gridSize)
    cells = document.querySelectorAll('.cell')
    createGridBorders()
  }, 1)
})

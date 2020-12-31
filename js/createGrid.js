const container = document.querySelector('#gridContainer')

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

document.querySelector('#gridSize').addEventListener('change', e => {
  container.innerHTML = 'Loading'
  gridSize = e.target.value
  setTimeout(() => {
    container.innerHTML = ''
    createGrid(gridSize)
  }, 1)
})

const cells = document.querySelectorAll('.cell')

for (let i = gridSize - 1; i < cells.length; i++) {
  if ((i + 1) % gridSize === 0) {
    cells[i].style.borderRight = '1px solid #c7c7c7'
  }
}
for (let i = cells.length - gridSize; i < cells.length; i++) {
  cells[i].style.borderBottom = '1px solid #c7c7c7'
}

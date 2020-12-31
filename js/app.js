let brushColorCurrent = 'red'
let brushColorValue = 'red'

const fillCell = (cell, color = 'red') => {
  if (cell.target.classList.contains('cell')) {
    cell.target.style.background = color
  }
}

document.querySelector('#gridBackgroundColor').addEventListener('input', e => {
  root.style.setProperty('--grid-background-color', e.target.value)
})

document.querySelector('#brushColor').addEventListener('input', e => {
  brushColorCurrent = e.target.value
  brushColorValue = e.target.value
})

document.querySelector('#gridColor').addEventListener('input', e => {
  root.style.setProperty('--grid-border-color', e.target.value)
})

document.querySelector('#brush').addEventListener('click', e => {
  brushColorCurrent = brushColorValue
})

document.querySelector('#eraser').addEventListener('click', e => {
  brushColorCurrent = ''
})

document.querySelector('#clear').addEventListener('click', e => {
  console.log('Clearing')

  container.innerHTML = ''
  createGrid(gridSize)

  console.log('Cleared')
})

let clicking = false
container.addEventListener('mousedown', () => {
  clicking = true
})
container.addEventListener('mouseup', () => {
  clicking = false
})
container.addEventListener('mousemove', e => {
  clicking && fillCell(e, brushColorCurrent)
})
container.addEventListener('click', e => {
  clicking = true
  clicking && fillCell(e, brushColorCurrent)
  clicking = false
})

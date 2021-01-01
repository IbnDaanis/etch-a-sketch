const root = document.documentElement

let brushColorCurrent = 'red'
let brushColorValue = 'red'
let brushColorRandom = false
let gridBorderHide = false
let gridBorderColorCurrent = '#c7c7c7'
let gridBorderColorValue = '#c7c7c7'

const fillCell = (cell, color = 'red') => {
  if (cell.target.classList.contains('cell')) {
    cell.target.style.background = color
  }
}

document.querySelector('#gridBackgroundColor').addEventListener('input', e => {
  root.style.setProperty('--grid-background-color', e.target.value)
})

document.querySelector('#gridColor').addEventListener('input', e => {
  gridBorderColorValue = e.target.value
  root.style.setProperty('--grid-border-color', gridBorderColorValue)
})

document.querySelector('#gridBorderHide').addEventListener('click', e => {
  gridBorderHide = !gridBorderHide
  if (gridBorderHide) {
    root.style.setProperty('--grid-border-color', 'none')
  } else {
    root.style.setProperty('--grid-border-color', gridBorderColorValue)
  }
})
document.querySelector('#brushColor').addEventListener('input', e => {
  brushColorCurrent = e.target.value
  brushColorValue = e.target.value
})

const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`

document.querySelector('#randomBrushColor').addEventListener('click', e => {
  brushColorRandom = !brushColorRandom
  brushColorCurrent = brushColorValue
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
document.body.addEventListener('mousedown', e => {
  clicking = true
})

document.addEventListener('mouseup', () => {
  clicking = false
})

document.addEventListener('mouseover', e => {
  if (e.target.classList.contains('cell') && brushColorRandom) {
    brushColorCurrent = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    console.log('hi')
  }
})

document.body.addEventListener('mousemove', e => {
  if (e.target.classList.contains('cell')) {
    if (clicking) {
      fillCell(e, brushColorCurrent)
    }
  }
})

container.addEventListener('click', e => {
  clicking = true
  clicking && fillCell(e, brushColorCurrent)
  clicking = false
})

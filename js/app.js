const root = document.documentElement
const gridBackgroundColorInput = document.querySelector(
  '#gridBackgroundColorInput'
)
const gridBorderColorInput = document.querySelector('#gridBorderColorInput')
const gridBorderHideButton = document.querySelector('#gridBorderHideButton')
const brushColorInput = document.querySelector('#brushColorInput')
const brushColorRandomButton = document.querySelector('#brushColorRandomButton')
const brushColorDarkenButton = document.querySelector('#brushColorDarkenButton')
const brushSelect = document.querySelector('#brushSelect')
const eraserSelect = document.querySelector('#eraserSelect')

// Application Settings
let gridBorderColorCurrent = '#c7c7c7'
let gridBorderColorValue = '#c7c7c7'
let brushColorCurrent = '#ff0000'
let brushColorValue = '#ff0000'
let brushColorRandom = false
let gridBorderHide = false
let brushMode = true
let darkenMode = false
let eraserMode = false

// Helper Functions
const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`

const fillCell = (cell, color = '#ff0000') => {
  if (cell.classList.contains('cell')) {
    cell.style.background = color
  }
}

const changeGridBackgroundColor = color => {
  root.style.setProperty('--grid-background-color', color)
}

const changeGridBorderColor = color => {
  gridBorderColorValue = color
  root.style.setProperty('--grid-border-color', gridBorderColorValue)
}

const toggleGridBorderHidden = () => {
  gridBorderHide = !gridBorderHide
  gridBorderHideButton.classList.toggle('active')
  if (gridBorderHide) {
    root.style.setProperty('--grid-border-color', 'none')
  } else {
    root.style.setProperty('--grid-border-color', gridBorderColorValue)
  }
}

const changeBrushColor = color => {
  brushColorCurrent = color
  brushColorValue = color
}

const toggleBrushColorRandom = () => {
  eraserMode && toggleEraserMode()
  darkenMode && toggleDarkenMode()
  brushColorRandom = !brushColorRandom
  brushColorCurrent = brushColorValue
  brushColorRandomButton.classList.toggle('active')
  console.log('Random mode ', brushColorRandom)
}

const toggleDarkenMode = () => {
  eraserMode && toggleEraserMode()
  brushColorRandom && toggleBrushColorRandom()
  darkenMode = !darkenMode
  brushColorDarkenButton.classList.toggle('active')
  console.log('Darken mode ', darkenMode)
}

const toggleBrushMode = () => {
  brushColorRandom && toggleBrushColorRandom()
  darkenMode && toggleDarkenMode()
  eraserMode && toggleEraserMode()
  brushColorCurrent = brushColorValue
  brushMode = !brushMode
  brushSelect.classList.toggle('active')
}

const toggleEraserMode = () => {
  brushColorRandom && toggleBrushColorRandom()
  darkenMode && toggleDarkenMode()
  brushMode && toggleBrushMode()
  eraserMode = !eraserMode
  eraserSelect.classList.toggle('active')
  eraserMode ? (brushColorCurrent = '') : (brushColorCurrent = brushColorValue)
  console.log('Eraser mode ', eraserMode)
}

const darkenCell = color => {
  let backgroundColor = color || 'rgb(247, 255, 255)'
  let splitted = backgroundColor
    .split('')
    .filter(a => +a === +a)
    .join('')
    .split(' ')
    .map(a => {
      return a < 25 ? 0 : Math.round(+a - 255 / 10)
    })
    .join(',')
  brushColorCurrent = `rgb(${splitted})`
}

// Event Listeners
gridBackgroundColorInput.addEventListener('input', ({ target }) => {
  changeGridBackgroundColor(target.value)
})

gridBorderColorInput.addEventListener('input', ({ target }) => {
  changeGridBorderColor(target.value)
})

gridBorderHideButton.addEventListener('click', () => {
  toggleGridBorderHidden()
})

brushColorInput.addEventListener('input', ({ target }) => {
  changeBrushColor(target.value)
})

brushColorRandomButton.addEventListener('click', () => {
  toggleBrushColorRandom()
})

brushColorDarkenButton.addEventListener('click', () => {
  toggleDarkenMode()
})

brushSelect.addEventListener('click', () => {
  toggleBrushMode()
})

eraserSelect.addEventListener('click', () => {
  toggleEraserMode()
})

// Logic for Interacting with the Grid

let clicking = false

document.body.addEventListener('mousedown', e => {
  clicking = true
})

document.body.addEventListener('mouseup', () => {
  clicking = false
})

document.body.addEventListener('mouseover', ({ target }) => {
  if (target.classList.contains('cell') && brushColorRandom) {
    brushColorCurrent = randomColor()
  } else if (target.classList.contains('cell') && darkenMode) {
    darkenCell(target.style.background)
  }
})

document.body.addEventListener('mousemove', ({ target }) => {
  if (target.classList.contains('cell')) {
    if (clicking) {
      fillCell(target, brushColorCurrent)
    }
  }
})

container.addEventListener('click', ({ target }) => {
  clicking = true
  clicking && fillCell(target, brushColorCurrent)
  clicking = false
})

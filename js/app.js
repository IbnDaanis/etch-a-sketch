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
let brushColorCurrent = '#ff0000'
let brushColorValue = '#ff0000'
let brushColorRandom = false
let gridBorderHide = false
let gridBorderColorCurrent = '#c7c7c7'
let gridBorderColorValue = '#c7c7c7'
let toggleDarkenMode = false

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
  brushColorRandom = !brushColorRandom
  brushColorCurrent = brushColorValue
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
  toggleDarkenMode = !toggleDarkenMode
})

brushSelect.addEventListener('click', () => {
  brushColorCurrent = brushColorValue
})

eraserSelect.addEventListener('click', () => {
  brushColorCurrent = ''
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
  } else if (target.classList.contains('cell') && toggleDarkenMode) {
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

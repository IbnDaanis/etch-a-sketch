let brushColor = 'red'

const fillCell = (cell, color = 'red') => {
  if (cell.target.classList.contains('cell')) {
    cell.target.style.background = color
  }
}

document.querySelector('#brushColor').addEventListener('input', e => {
  brushColor = e.target.value
})

let clicking = false
container.addEventListener('mousedown', () => {
  clicking = true
})
container.addEventListener('mouseup', () => {
  clicking = false
})
container.addEventListener('mousemove', e => {
  clicking && fillCell(e, brushColor)
})
container.addEventListener('click', e => {
  clicking = true
  clicking && fillCell(e, brushColor)
  clicking = false
})

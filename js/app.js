const fillCell = (cell, color = 'red') => {
  cell.target.style.background = color
}

let clicking = false
container.addEventListener('mousedown', e => {
  clicking = true
})
container.addEventListener('mouseup', e => {
  clicking = false
})
container.addEventListener('mousemove', e => {
  clicking && fillCell(e)
})
container.addEventListener('click', e => {
  clicking = true
  clicking && fillCell(e)
  clicking = false
})

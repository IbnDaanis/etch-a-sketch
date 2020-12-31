const container = document.querySelector('#container')

const createGrid = () => {
  container.style.gridTemplateRows = 'repeat(100, 1fr)'
  container.style.gridTemplateColumns = 'repeat(100, 1fr)'
  for (let i = 0; i < 100 ** 2; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    container.appendChild(cell)
  }
}
createGrid()
const cells = document.querySelectorAll('.cell')
console.log(cells.length)
let clicking = false
container.addEventListener('mousedown', e => {
  clicking = true
  console.log('clicking')
})
container.addEventListener('mouseup', e => {
  clicking = false
})
container.addEventListener('mousemove', e => {
  if (e.target.classList.contains('cell')) {
    clicking ? (e.target.style.background = 'red') : null
  }
})

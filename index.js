const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
const gameOver = document.getElementById('game-over')
const leftBtn = document.getElementById('left-btn')
const upBtn = document.getElementById('up-btn')
const rightBtn = document.getElementById('right-btn')
const downBtn = document.getElementById('down-btn')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid() {
    for (let i=0; i < width*width; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square) 
    squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    gameOver.style.display = 'none'
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApple()
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
    return clearInterval(timerId), gameOver.style.display = 'block'
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(timerId)
        console.log(intervalTime)
        intervalTime = intervalTime * speed
        console.log(intervalTime)
        timerId = setInterval(move, intervalTime)
    }
    
    squares[currentSnake[0]].classList.add('snake')
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 
generateApple()

function control(e) {
    if (e.keyCode) {
        switch (e.keyCode) {
            case (39): 
                direction = 1
                break
            case (38):
                direction = -width
                break
            case (37):
                direction = -1
                break
            case (40):
                direction = +width
                break
            default:
                console.log('You pressed the wrong button!')
        }
    }
}

document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)
rightBtn.addEventListener('click', () => control({
    keyCode: 39
}))

upBtn.addEventListener('click', () => control({
    keyCode: 38
}))

leftBtn.addEventListener('click', () => control({
    keyCode: 37
}))

downBtn.addEventListener('click', () => control({
    keyCode: 40
}))
const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let squares = []
let score = 0
let pacManIsAlive = true;

// make the layout for the Game
//     28 * 28 = 784
// 0 = pac dots
// 1 = wall    
// 2 = ghost
// 3 = power - pellet
// 4 = empty 

const layout = [

    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

]

// CODE FOR THE BOARD FUNCTION
// there are 784 sqaures

function createBoard() {

    // for loop 784 times
    for (let i = 0; i < layout.length; i++) {
        // create the square
        const square = document.createElement('div')
        // put squares in the grid
        grid.appendChild(square)
        // put the square in squares array
        squares.push(square)
        // console.log(squares)

        // this should show up in the grid as a pattern
        // Currently working Now  ////////////////        
        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')

        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')

        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }

    }


}
createBoard()

// the position of pacman. 490 is in the bottom middle of the grid.

let pacmanCurrentIndex = 49
squares[pacmanCurrentIndex].classList.add('pacman')

function control(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman')
    //key code of each key that the user has pressed. 40 = down arrow key 
    //info was found on http://keycode.info/

    //using switch states instead of else if statements for a cleaner look. Rework!
    switch (e.keyCode) {
        case 40:
            console.log('pressed down')
            ///////if you try to move pacman where there is a wall he will not move. both state
            /////must be true in order to run pacmanCurrentIndex += width/////
            if (
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                pacmanCurrentIndex + width < width * width)
                pacmanCurrentIndex += width

            break
        case 38:
            console.log('pressed up')
            if (
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex - width >= 0)
                pacmanCurrentIndex -= width
            break
        case 37:
            console.log('pressed left')
            if (
                !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0)
                pacmanCurrentIndex -= 1
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            }
            break
        case 39:
            console.log('pressed right')
            if (
                !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                pacmanCurrentIndex % width < width - 1)
                pacmanCurrentIndex += 1
            if (pacmanCurrentIndex === 391) {
                // Pac-Man disappears before you go to the edge of the gride
                pacmanCurrentIndex = 364
            }
            break
    }
    squares[pacmanCurrentIndex].classList.add('pacman')
    
    pacDotEaten()
    powerFoodEaten()
    pacmanEaten()
    

}
document.addEventListener('keyup', control)

// *****************MY TO DO LIST*****************
// When getting caught by the ghost loose 5 pts each time until you are dead (points are zeroed out)
// When all of the pellets are eaten change the back ground to green and say "YOU WON"


function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        //if Pac-Man ate the Pac-Dot then it has to be removed from the game
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score
    }


}
function powerFoodEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        score += 10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScaredGhosts, 10000)
    }
}
function unScaredGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)

}

function pacmanEaten() {
    if (!pacManIsAlive) return 
    if (squares[pacmanCurrentIndex].classList.contains('ghost')) {
        score -= 5
        scoreDisplay.innerHTML = score
        pacManIsAlive = false
    }
 
}

class Ghost {
    constructor(className, speed, startIndex) {
        this.className = className
        this.speed = speed
        this.startIndex = startIndex
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('nas', 250, 348),
    new Ghost('eve', 400, 376),
    new Ghost('jcole', 300, 351),
    new Ghost('brittany', 500, 379)
]



// creating the ghost on the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})


ghosts.forEach(ghost => ghostOnTheMove(ghost))

function ghostOnTheMove(ghost) {
    console.log('moved ghost')
    
    const directions = [-1, +1, -width, +width]
    //Math.floor is rounding down.
    let direction = directions[Math.floor(Math.random() * directions.length)]
    console.log(direction)

    ghost.timerId = setInterval(function () {
        // for the ghost to move around it can not contain a wall or another ghost
        if (!squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
            // will allow the ghost to move throughout the gride using timer id.
            // remove any class that is ghost
            // add the direction to the current index
            // then add the ghost class back to it again.
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost')
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add('ghost')
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared') 
            } else {
                squares[ghost.currentIndex].classList.remove('scared')
            }
        } else direction = directions[Math.floor(Math.random() * directions.length)]

    }, ghost.speed)


}


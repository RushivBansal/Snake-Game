// Constants and Variables
let inputDir = {x:0, y:0};
const gameover = new Audio('Gameover.mp3');
const Bite = new Audio('Bite.wav');
const move = new Audio('move.mp3');
const gamemusic = new Audio('game_music.mp3');
let speed = 5;
let lastPainttime = 0;
let snakeArray = [
    {x : 4, y : 5}
];
let food = {x:3, y:4};
let score = 0;

//Functions and methods


//Game Loop
function main(ctime){

    window.requestAnimationFrame(main);
    if((ctime - lastPainttime)/1000 < 1/speed){
        // console.log(ctime);
        return;
    }
    lastPainttime = ctime;
    gameEngine();
}

function isCollide(snake){

    //colliding with itself
    for(let i = 1; i < snake.length; i++){

        if(snake[i].x === snake[0].x && snake[i].y == snake[0].y){

            return true;
        }

    }
    
    // colliding with top or bottom wall
    if(snakeArray[0].x <= 0 || snakeArray[0].x >= 26){

        return true;
    }

    // colliding with right or left wall
    if(snakeArray[0].y <= 0 || snakeArray[0].y >= 20){

        return true;
    }

    return false;    
}

function gameEngine(){

    // Part 1 : updating the snake array and food

    //checking collision
    if(isCollide(snakeArray)){
        gamemusic.pause();
        gameover.play();
        //restarting the game
        inputDir = {x: 0 , y : 0};
        alert("Game Over! Press any key to play again");
        snakeArray = [ {x : 4, y : 5}];
        score = 0;
        score_count.innerHTML = "Score : " + score;
    }

    //if food eaten
    if(snakeArray[0].x == food.x && snakeArray[0].y == food.y){

        score++;
        score_count.innerHTML = "Score : " + score;
        if(score > highscoreval){

            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscore_count.innerHTML = "Highscore : " + highscoreval;
        }
        Bite.play();
        Bite.volume = 0.55;
        snakeArray.unshift({x : snakeArray[0].x + inputDir.x, y : snakeArray[0].y + inputDir.y});
        let a = 1;
        let b = 20;
        let c = 26;
        food = {x : Math.round(a + (c-a)*Math.random()), y : Math.round(a + (b-a)*Math.random())}
    }

    //moving the snake
    for(let i = snakeArray.length - 1; i > 0; i--){

        snakeArray[i].x = snakeArray[i-1].x;
        snakeArray[i].y = snakeArray[i-1].y;
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;


    //Part 2 : creating food and snake

    //clearing the board
    board.innerHTML = "";

    //creating snake head and body
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('sbody');
        }
        board.appendChild(snakeElement);
    });

    //creating food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//main logic
let highscore = localStorage.getItem("highscore");
if(highscore == null){

    let highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore);
    highscore_count.innerHTML = "Highscore : " + highscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    gamemusic.play();
    gamemusic.volume = 0.08;
    inputDir = { x:0, y:1}; //gamestarts

    switch (e.key) {
        case 'ArrowUp':
            // console.log("ArrowUp");
            move.play();
            move.volume = 0.25;
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case 'ArrowDown':
            // console.log("ArrowDown");
            move.play();
            move.volume = 0.25;
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case 'ArrowLeft':
            // console.log("ArrowLeft");
            move.play();
            move.volume = 0.25;
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case 'ArrowRight':
            // console.log("ArrowRight");
            move.play();
            move.volume = 0.25;
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// blok o velikosti 32px
const box = 32;

// obrazky

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";


// vytvoření hada

var snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// jidlo

var food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// skore

var score = 0;

//ovládání hada

var d;

document.addEventListener("keydown", direction);

function direction(event) {
    var key = event.keyCode;
    if (key == 37 && d != "RIGHT") {


        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";


    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";


    } else if (key == 40 && d != "UP") {
        d = "DOWN";

    }
}

// když narazí had sám do sebe
function collision(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// vykreslování

function draw() {

    ctx.drawImage(ground, 0, 0);

    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "red" : "orange";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);


    }

    ctx.drawImage(foodImg, food.x, food.y);

    // pozice stare hlavy
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    // směr
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;


    // Když sní jídlo
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            }
            // tady neodstranujeme ocas, aby se had zvětšil 
    } else {
        // odstraní ocas
        snake.pop();
    }

    // nová hlava
    var newHead = {
        x: snakeX,
        y: snakeY
    }


    // game over

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        gameOverScreen();
    }
    //Pridani nove hlavy
    snake.unshift(newHead);
    //score
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// Zavolá funkci draw každých 100ms

var game = setInterval(draw, 100);

//Resetuje hru
document.getElementById('button').addEventListener('click', function() {
    document.location.reload();
});







//Obrazovka na konci hry
function gameOverScreen() {
    ctx.fillStyle = "gray";
    ctx.fillRect(3.25 * box, 6 * box, 400, 250);
    ctx.fillStyle = "black";

    ctx.strokeStyle = "red";
    ctx.strokeRect(3.25 * box, 6 * box, 400, 250);


    ctx.fillText('GAME OVER!', 6 * box, 9 * box);
    ctx.fillText('Your score is:' + ' ' + score, 5 * box, 11 * box);
}
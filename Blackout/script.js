canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 25;
var x = canvas.width/2;
var y = canvas.height-100;
var dx = 6;
var dy = 6;
var paddleHeight = 40;
var paddleWidth = 300;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 20;
//actually columns just switched
var brickColumnCount = 6;
//actually rows just switched
var brickWidth = 55;
var brickHeight = 35;
var brickPadding = 20;
var brickOffsetTop = 60;
var brickOffsetLeft = 50;
var speed = 6;
var score = 0;
var lives = 5;
var bricks = [];
var opacity= 0.5;
var quit = false;
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    speed+=0.1;
                    dy = -dy;
                    b.status = 0;
                    score++;
                    }
                if(score>= brickColumnCount*brickRowCount){
                    alert ("You Did It! You Did The Impossible! Retry If You Want, Or Check Out Some Of The Other Games!")
                    quit = true;
                    }
                }
            }
        }
    }
function blackscreen(){
    if(opacity>=1.0)
        opacity = 0.0;
    ctx.globalAlpha=opacity;
    ctx.fillStyle="black"; 
    ctx.fillRect(0,0,1550,670); 
    opacity+=0.003;
    console.log(opacity);
    if(opacity<=1.0)
        setInterval(blackscreen, 3000)
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#FF0000";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.globalAlpha=1.0;
    ctx.font = "32px Lucky Guy";
    ctx.fillStyle = "#00FF44";
    ctx.fillText("Score: "+score, 50, 50);
}
function drawLives() {
    ctx.globalAlpha=1.0;
    ctx.font = "32px Lucky Guy";
    ctx.fillStyle = "#00FF44";
    ctx.fillText("Lives: "+lives, canvas.width-113, 50);
}
function draw() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(lives==0) {
                alert("Nice Attempt! There Is Always More Time To Practice! Click Top Try Again, Or Try Some Other Games!");
                quit = true;
            }
            else {
                x = canvas.width/2;
                y = canvas.height-100;
                dx = speed;
                dy = (-1)*speed;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 20-speed;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 20-speed;
    }
    x += dx;
    y += dy;
    setInterval(blackscreen(),5000);
    drawScore();
    drawLives();
    requestAnimationFrame(draw);
    
}
if(quit == false)
    draw();
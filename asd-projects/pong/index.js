/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();

  var KEY = {
    "UP": 38,
    "DOWN": 40,
    "w": 87,
    "s": 83,
  };

  // Game Item Objects
  var paddle1 = GameObject("#paddle1");
  var paddle2 = GameObject("#paddle2");
  var ball = GameObject("#ball");


  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);
  startBall();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  /*
 On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
 by calling this function and executing the code inside.
 */
  function newFrame() {
    wallCollision();
    movePaddle(paddle1);
    movePaddle(paddle2);
    moveBall();
    paddleInside(paddle1);
    paddleInside(paddle2);
  }
  /*
 Called in response to events.
 */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      paddle1.speedY = -5;
    } else if (event.which === KEY.DOWN) {
      paddle1.speedY = 5;
    } else if (event.which === KEY.w) {
      paddle2.speedY = -5;
    } else if (event.which === KEY.s) {
      paddle2.speedY = 5;
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.UP) {
      paddle1.speedY = 0;
    } else if (event.which === KEY.DOWN) {
      paddle1.speedY = 0;
    } else if (event.which === KEY.w) {
      paddle2.speedY = 0;
    } else if (event.which === KEY.s) {
      paddle2.speedY = 0;
    }
  }
  function GameObject(elementId) {  //factory function
    var gameItem = {};
    gameItem.id = elementId;
    gameItem.x = parseFloat($(elementId).css("left"));
    gameItem.y = parseFloat($(elementId).css("top"));
    gameItem.width = $(elementId).width();
    gameItem.height = $(elementId).height();
    gameItem.speedX = 0;
    gameItem.speedY = 0;
    gameItem.score = 0;
    return gameItem;
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
  }

  function startBall() {
    ball.x = BOARD_WIDTH / 2;
    ball.y = BOARD_HEIGHT / 2;

    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function moveBall() {
    if (doCollide(paddle1)) {
      ball.speedX = -ball.speedX
    } if (doCollide(paddle2)) {
      ball.speedX = -ball.speedX
    }
    ball.y += ball.speedY;
    $(ball.id).css("top", ball.y);
    ball.x += ball.speedX;
    $(ball.id).css("left", ball.x);
  }

  function movePaddle(gameItem) {
    gameItem.y += gameItem.speedY;
    //gameItem.x += gameItem.speedX;
    $(gameItem.id).css("top", gameItem.y);
    // $(gameItem.id).css("left", gameItem.x);
  }

  function paddleInside(gameItem) {
    if (gameItem.y > BOARD_HEIGHT - gameItem.height) {
      gameItem.y = BOARD_HEIGHT - gameItem.height;
    } if (gameItem.y < 0) {
      gameItem.y = 0;
    }
  }

  function wallCollision() {
    if (ball.x > BOARD_WIDTH - ball.width) {
      ball.speedX *= -1;
      paddle1.score += 1;
      $("#player1").text(paddle1.score);
      startBall();
    } else if (ball.x < 0) {
      ball.speedX += 3;
      paddle2.score += 1;
      $("#player2").text(paddle2.score);
      startBall();
    } else if (ball.y > BOARD_HEIGHT - ball.height) {
      ball.speedY *= -1;
    } else if (ball.y < 0) {
      ball.speedY += 3;
    }if (paddle1.score === 11 || paddle2.score === 11) {
      endGame(); 
     }
  }

  function doCollide(paddle) {
    return (paddle.x < ball.x + ball.width &&
      paddle.x + paddle.width > ball.x &&
      paddle.y < ball.y + ball.height &&
     paddle.height + paddle.y > ball.y
    )
  }
}



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
  //var updatedScore = ;


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
    wallCollision(ball);
    wallCollision(player1);
    wallCollision(player2);
    moveObject(paddle1);
    moveObject(paddle2);
    moveBall();
    movePaddle(paddle1);
    movePaddle(paddle2);
    doCollide(paddle1);
    doCollide(paddle2);
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
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function moveBall() {
    ball.y += ball.speedY;
    $(ball.id).css("top", ball.y);
    ball.x += ball.speedX;
    $(ball.id).css("left", ball.x);
  }

  function moveObject(gameItem) {
    gameItem.y += gameItem.speedY;
    //gameItem.x += gameItem.speedX;
    $(gameItem.id).css("top", gameItem.y);
    // $(gameItem.id).css("left", gameItem.x);
  }

  function movePaddle(gameItem) {
    if (gameItem.y > BOARD_HEIGHT - gameItem.height) {
      gameItem.y = BOARD_HEIGHT - gameItem.height;
    } if (gameItem.y < 0) {
      gameItem.y = 0;
    }
  }


  function wallCollision(gameItem) {
    if (gameItem.x > BOARD_WIDTH - gameItem.width) {
      gameItem.speedX *= -1;
      gameItem.score += 1;
    } else if (gameItem.x < 0) {
      gameItem.speedX += 3;
      gameItem.score += 1;
    } else if (gameItem.y > BOARD_HEIGHT - gameItem.height) {
      gameItem.speedY *= -1;
    } else if (gameItem.y < 0) {
      gameItem.speedY += 3;
    }
  }
}

function doCollide(paddle1, paddle2) {
  if (paddle1.left < paddle2.right &&
    paddle1.right > paddle2.left &&
    paddle1.top < paddle2.bottom && 
    paddle1.bottom > paddle2.top) {
    return true;
  } else false;
}


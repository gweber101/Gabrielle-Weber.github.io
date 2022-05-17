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
    moveObject(paddle1);
    moveObject(paddle2);
    //redrawGameItem(gameItem);
    moveObject(ball);
    wallCollision();
  }
  /*
 Called in response to events.
 */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      paddle1.speedY = -5;
    } else if (event.which === KEY.DOWN) {
      paddle1.speedY = 5;
      console.log(paddle1.y);
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
}
function startBall() {
  ball.y = 10;
  ball.x = 10;
  ball.speedY = 5;
  ball.speedX = 5;
}

function moveObject(gameItem) {
  gameItem.y += gameItem.speedY;
  $(gameItem.id).css("top", gameItem.y);
}

function wallCollision(gameItem) {
if (gameItem.x > BOARD_WIDTH) {
  gameItem.x = BOARD_WIDTH;
}else if(gameItem.x < 0) {
  gameItem.x = 0;
}if (gameItem.y > BOARD_HEIGHT) {
  gameItem.y = BOARD_HEIGHT;
}else if (gameItem.y < 0) {
  gameItem.y = 0;
}
}
// function redrawGameItem(gameItem) {
  
// }


/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var KEY = {
    "UP": 38,
    "DOWN": 40,
    "W": 87,
    "S": 83,
  };
  var positionY = 0;
  var speedY = 0;
  
  startBall();

  // Game Item Objects
  var paddle1 = gameItem(paddle1);
  var paddle2 = gameItem(paddle2);
  var ball = gameItem(ball);

  

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem(positionY);
  }
  
  /* 
  Called in response to events.
  */
    function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      paddle1.y + speedY  -5;
    }else if(event.which === KEY.DOWN) {
      speedY = 5;
    }else if(event.which === KEY.W) {
      speedY = -5;
    }else if(event.which === KEY.S) {
      speedY = 5;
    }
    }

    function handleKeyUp(event) {
      if (event.which === KEY.UP) {
        speedY = 0;
      }else if(event.which === KEY.DOWN) {
        speedY = 0;
      }else if(event.which === KEY.W) {
        speedY = 0;
      }else if(event.which === KEY.S) {
        speedY = 0;
      }
      }
    function GameObject(elementId) {  //factory function
      var gameItem = {};
      gameItem.id = elementId;
      gameItem.x = $(elementId).css("left");
      gameItem.y =$(elementId).css("top");
      gameItem.width = $(elementId).width();
      gameItem.height =$(elementId).height();
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
function repositionGameItem() {
  positionY += speedY;
}

function redrawGameItem(positionY) {
  $("#paddle1").css("top", positionY);
  $("#paddle2").css("top", positionY);
  // added in boardwidth and height
}
 function startBall() {

 }


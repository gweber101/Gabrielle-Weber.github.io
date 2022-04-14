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
  
  // var W_pressed = false;
  // var S_pressed = false;

  // Game Item Objects


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
    

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyUp(event) {
  if (event.key ===   87) {
    W_pressed = false;
  }else if(event.key === 83) {
    S_pressed = false;
  }
  }

  function handleKeyDown(event) {
    if (event.key === 87) {
     W_pressed = true;
    }else if(event.key === 83) {
      S_pressed = true;
    }
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
function GameObject(elementId) {
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

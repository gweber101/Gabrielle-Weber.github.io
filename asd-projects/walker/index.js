/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
  };

  var positionX = 0;
  var speedX = 0;
  var positionY = 0;
  var speedY = 0; // changed speeds to 10
  var boardWidth = $("#board").width() - $("#walker").width();
  var boardHeight = $("#board").height() - $("#walker").height();

  
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on ("keyup", handleKeyUp); // created for todo 6
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
     repositionGameItem(); // added the helper function to this function
     redrawGameItem(positionX, positionY); // added the helper function to this function
     stopWalker();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      speedX = -5;
      console.log("LEFT PRESSED");
    }else if (event.which === KEY.RIGHT) {
      speedX = 5;
      console.log("RIGHT PRESSED");
    }else if (event.which === KEY.UP) {
      speedY = -5;
      console.log("UP PRESSED");
    }else if (event.which === KEY.DOWN) {
      speedY = 5;
      console.log("DOWN PRESSED");
    }
       
  }
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT) {
      speedX = 0;
      console.log("LEFT RELEASED");
    }else if (event.which === KEY.RIGHT) {
      speedX = 0;
      console.log("RIGHT RELEASED");
    }else if (event.which === KEY.UP) {
      speedY = 0;
            console.log("UP RELEASED");
    }else if (event.which === KEY.DOWN) {
      speedY = 0;
            console.log("DOWN RELEASED");
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
  }// end of first helper function

  function repositionGameItem() {
    positionX += speedX;
    positionY += speedY;
    
  } // second helper function
    
  
  function redrawGameItem(positionX, positionY) {
     $("#walker").css("left", positionX);
     $("#walker").css("top", positionY);
     $("#walker").css("top", positionY);
     $("#walker").css("left", positionX); // added in boardwidth and height
  } // third helper fuction
  
  function stopWalker() {
    if (positionX > boardWidth) {
      positionX = boardWidth;
  }if  (positionX < 0) {
    positionX = 0;
  }if (positionY > boardHeight){
    positionY  = boardHeight;
  }if (positionY < 0) {
    positionY = 0;
  }
  }

}
/* Tic Tac Toe */

/* global variables */
var grid = [null, null, null, null, null, null, null, null, null];
var available = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var player = 1;
var timerWin;
var compTurn;
var turn;
var move;
var isSinglePlayer = false;
var newAvailable = [0, 1, 2, 3, 4, 5, 6, 7, 8];

/* functions */

function playTurn (index) {
  if (isSinglePlayer === false) {
    // if (grid[index] !== null || whoWon() !== false)
    if (grid[index] || isGameOver()) {
    // no more turns can be played. game is over
    console.log("failed");
    console.log(grid);
      return false;
    } else {
      // assign player move to grid[index]
      grid[index] = player;
      // change player turn
        if (player === 1) setPlayer2(), player = 2;
        // function that makes div change

        else setPlayer1(), player = 1;

        console.log('winner: ' + whoWon());
      console.log("works");
      console.log(grid);
      // turn successfully played
      return true;
    }
    } else {
      if (isGameOver()) {
        return false;
      } else {
        // assign player move to grid[index]
        grid[index] = player;
        // change player turn
          if (player === 1) setPlayer2(), player = 2;
          // function that makes div change
          else setPlayer1(), player = 1;
        // turn successfully played
        return true;
    }
  }
}

function isGameOver () {
  // if (whoWon() === 1 || 2 || 3) end game
  if (whoWon()) return true;
  // if (whoWon() === 0) game is not over, play on
  return false;
}

function whoWon () {
  // win
  if (grid[0] && grid[0] === grid[1] && grid[0] === grid[2]) return grid[0];
  if (grid[3] && grid[3] === grid[4] && grid[3] === grid[5]) return grid[3];
  if (grid[6] && grid[6] === grid[7] && grid[6] === grid[8]) return grid[6];
  if (grid[0] && grid[0] === grid[3] && grid[0] === grid[6]) return grid[0];
  if (grid[1] && grid[1] === grid[4] && grid[1] === grid[7]) return grid[1];
  if (grid[2] && grid[2] === grid[5] && grid[2] === grid[8]) return grid[2];
  if (grid[0] && grid[0] === grid[4] && grid[0] === grid[8]) return grid[0];
  if (grid[2] && grid[2] === grid[4] && grid[2] === grid[6]) return grid[2];
  // draw
  if (grid[0] && grid[1] && grid[2] && grid[3] && grid[4] &&
    grid[5] && grid[6] && grid[7] && grid[8]) return 3;
  // game ain't over
  return 0;
}

/* jQuery */
$(document).ready(function () {
  $("#sd").click(timerStart);
  // playerMove
  if (player) grid = [null, null, null, null, null, null, null, null, null];
    $("#0").click(playerMove);
    $("#1").click(playerMove);
    $("#2").click(playerMove);
    $("#3").click(playerMove);
    $("#4").click(playerMove);
    $("#5").click(playerMove);
    $("#6").click(playerMove);
    $("#7").click(playerMove);
    $("#8").click(playerMove);
  $(".button").click(newGame);
  $("#singlePlayer").click(singlePlayer);

});

/* Timer */

var countdown = 15;
var timerId;
function timerStart () {
  timerId = window.setInterval(updateTime, 1000);
}

function updateTime () {
  --countdown;
  $("#sudden-death").text('Time Left: ' + countdown);
  if (timerWin) {
      clearInterval(timerId);
      $("#sudden-death").text('SUDDEN DEATH');
      countdown = 15;
      timerWin = false;
    } else if (countdown === 0) {
      clearInterval(timerId);
      alert("NOOOOO!");
      $("#sudden-death").text('SUDDEN DEATH');
      countdown = 15;
      newGame();
  }
}

function setPlayer1 () {
  $("#X").addClass("current-player");
  $("#O").removeClass("current-player");
}

function setPlayer2 () {
  $("#O").addClass("current-player");
  $("#X").removeClass("current-player");
}

function resetPlayer() {
  $("#O").removeClass("current-player");
  $("#X").addClass("current-player");
}

function restart () {
  grid = [null, null, null, null, null, null, null, null, null];
  available = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  newAvailable = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  player = 1;
  resetPlayer();
  $("td").css("background-color",getRandomColor())
  console.log("restart");
}

function newGame () {
  // initialize game, enable playerMove;
  // turn .td boxes into pink;
  $("td").empty();
  if (whoWon()) timerWin = true;
  isSinglePlayer = false;
  restart();
  console.log(player);
}

function playerMove () {
  if (isSinglePlayer === false) {
    turn = parseInt($(this).attr('id'));
    if (player === 1) {
      move = "x";
    } else {
      move = "o";
    }
    playTurn(turn);
    whoWon();
    $(this).text(move);
    console.log(player);
    if (whoWon() === 1) {
      alert("Congratulations, Player X! You are the Tic Tac Toe Master.");
      console.log("game over");
      newGame();
    }
    if (whoWon() === 2) {
      alert("Congratulations, Player O! You are the Tic Tac Toe Master.");
      console.log("player 2 wins")
      newGame();
    }
    if (whoWon() === 3) {
      alert("Whoops! It's a draw. You are both masters at this game.");
      console.log('tie');
      newGame();
    }
  } else {
    if (player === 1) {
      turn = parseInt($(this).attr('id'));
      move = "x";
      playTurn(turn);
      $(this).text(move);
      playerMove();
    } else {
      console.log("computer moved");
      move = "o";
      randomMove();
      console.log("random move made")
      playTurn(compTurn);
      $("#" + compTurn).text(move);
      if (whoWon() === 1) {
        alert("Congratulations, Player X! You are the Tic Tac Toe Master.");
        console.log("game over");
        newGame();
      }
      if (whoWon() === 2) {
        alert("You Lost! Go polish up your skillz.");
        console.log("player 2 wins")
        newGame();
      }
      if (whoWon() === 3) {
        alert("Whoops! It's a draw. Try harder next time.");
        console.log('tie');
        newGame();
      }
    }
    whoWon();
  }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
/* AI */
// build AI
// trigger AI using button
// knows if move has been made
// runs playTurn(randomFrom1to8)
// waits for another move to be made

function singlePlayer () {
isSinglePlayer = true;
}

/* splice method to get computer move */
// function randomMove () {
//   if (turn === 0) {
//     available[0] = null
//   }
//   if (turn === 1) {
//     available[1] = null
//   }
//   if (turn === 2) {
//     available[2] = null
//   }
//   if (turn === 3) {
//     available[3] = null
//   }
//   if (turn === 4) {
//     available[4] = null
//   }
//   if (turn === 5) {
//     available[5] = null
//   }
//   if (turn === 6) {
//     available[6] = null
//   }
//   if (turn === 7) {
//     available[7] = null
//   }
//   if (turn === 8) {
//     available[8] = null
//   }
//
//   compTurn = Math.floor(Math.random() * 9);
//   console.log(compTurn)
//   if(available[compTurn] === null) {
//     return randomMove()
//   } else {
//     if (compTurn === 0) {
//       available[0] = null;
//     }
//     if (compTurn === 1) {
//       available[1] = null;
//     }
//     if (compTurn === 2) {
//       available[2] = null;
//     }
//     if (compTurn === 3) {
//       available[3] = null;
//     }
//     if (compTurn === 4) {
//       available[4] = null;
//     }
//     if (compTurn === 5) {
//       available[5] = null;
//     }
//     if (compTurn === 6) {
//       available[6] = null;
//     }
//     if (compTurn === 7) {
//       available[7] = null;
//     }
//     if (compTurn === 8) {
//       available[8] = null;
//     }
//   }
//
//   console.log(available);
// }

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

function randomMove () {
    var z = newAvailable.indexOf(turn);
    newAvailable.splice(z, 1);
    console.log(newAvailable);
    console.log(turn);
    shuffle(newAvailable);
    var selectRandom = newAvailable;
    while (selectRandom[0] === turn) shuffle(newAvailable);
    compTurn = selectRandom.splice(0, 1);
    console.log(compTurn);
    console.log(selectRandom);
    // break;
}



// array of randomized numbers from 0 to 8
// playturn === index of box clicked splice out
//compTurn splice out array[0];

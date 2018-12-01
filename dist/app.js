// declare variable
let scores, roundScores, activePlayer, gamePlaying, highScore;

init();

//new game
selectQuery(".btn-new").addEventListener("click", init);

selectQuery(".btn-roll").addEventListener("click", function() {
  if (gamePlaying === true) {
    //random number for dice
    let dice1 = Math.floor(Math.random() * 6 + 1);
    let dice2 = Math.floor(Math.random() * 6 + 1);

    //display result
    let diceDOM = selectQuery(".dice");
    let diceDOM2 = selectQuery(".dice2");

    selectQuery(".dice").style.display = "block";
    selectQuery(".dice2").style.display = "block";

    diceDOM.src = "./img/dice-" + dice1 + ".png";
    diceDOM2.src = "./img/dice-" + dice2 + ".png";

    //set the current value to each dice roll if value not 1
    if (dice1 !== 1 && dice2 !== 1) {
      //update score
      roundScores += dice1 + dice2;
      selectQuery("#current-" + activePlayer).textContent = roundScores;
    } else {
      nextPlayer();
    }
  }
});

selectQuery(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //update player current score
    scores[activePlayer] += roundScores;

    //update UI
    getID("score-" + activePlayer).textContent = scores[activePlayer];

    //check if player won
    if (scores[activePlayer] >= 100) {
      getID("name-" + activePlayer).textContent = "Winner!";
      selectQuery(".dice").style.display = "none";
      selectQuery(".dice2").style.display = "none";
      selectQuery(".player-" + activePlayer + "-panel").classList.add("winner");
      selectQuery(".player-" + activePlayer + "-panel").classList.remove(
        "active"
      );

      //end game
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //toggle to next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // reset roundscore
  roundScores = 0;

  //reset currentScore
  getID("current-0").textContent = 0;
  getID("current-1").textContent = 0;

  //toggle active classes
  selectQuery(".player-0-panel").classList.toggle("active");
  selectQuery(".player-1-panel").classList.toggle("active");

  //display no dice
  selectQuery(".dice").style.display = "none";
  selectQuery(".dice2").style.display = "none";
}

//seclector
function selectQuery(selector) {
  return document.querySelector(selector);
}
function getID(id) {
  return document.getElementById(id);
}

//function init
function init() {
  scores = [0, 0];
  roundScores = 0;
  activePlayer = 0;
  gamePlaying = true;

  //set init value to 0 and hide dice
  selectQuery(".dice").style.display = "none";
  selectQuery(".dice2").style.display = "none";
  getID("score-0").textContent = 0;
  getID("score-1").textContent = 0;
  getID("current-0").textContent = 0;
  getID("current-1").textContent = 0;
  getID("name-0").textContent = "player 1";
  getID("name-1").textContent = "player 2";

  // init classes
  selectQuery(".player-0-panel").classList.remove("winner");
  selectQuery(".player-1-panel").classList.remove("winner");
  selectQuery(".player-0-panel").classList.remove("active");
  selectQuery(".player-1-panel").classList.remove("active");
  selectQuery(".player-0-panel").classList.add("active");
}

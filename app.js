/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, dice, gamePlaying;
init();

// dice = Math.floor(Math.random() * 6) + 1;
//sellecting the content on the web page
// document.querySelector('#current-' + activePlayer).textContent = dice;
// we can also insert an html tag to the element we want to display in the page
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice + '</em>';
 // we can also set the value we are displaying in the text content to be a get variable
// var x = document.querySelector('#score-0').textContent;
// console.log(x);



document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying) {


    //1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    //2. display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

  //3. update the round score IF the rolled number is NOT 1.
    if (dice !== 1){
    //Add score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
    nextPlayer();
    }
  }

} );


  document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {

    //add current round score to global scores
    scores[activePlayer] += roundScore;
    //it can also be written as below, but for best practice its better to have it as above.
    // socres[activePlayer] = scores[activePlayer] + roundScore;
    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //check if player win the game
      if (scores[activePlayer] >= 100){
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
      } else {
      //next PLAYERS
      nextPlayer();

      }
    }

  });


  function nextPlayer() {

    //Next Player function
      //Nexts player turn
      //ternary statement
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
      //set round score back to zero
      roundScore = 0;
      // this is also the same with the below if statement
      // if(activePlayer ===0 ){
      //   activePlayer = 1;
      // } else {
      //   activePlayer = 0;
      //}

    //this code below will set the visible element on the browser back to zero
      document.getElementById('current-0').textContent = 0;
      document.getElementById('current-1').textContent = 0;


      //he following statement will set the class of active player to active
      // removing and adding classes inside css using the js script
      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');

      //settingn the dice not to display after each player looses turn
      document.querySelector('.dice').style.display = 'none'
    //document.querySelector('.player-0-panel').classList.remove('active');
      //document.querySelector('.player-1-panel').classList.add('active');

  }

  document.querySelector('.btn-new').addEventListener('click', init);

  function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //this following statement will set an element displayed in the webpage to none, this done done by calling the css function with the id or class style.display = 'none'
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
  }

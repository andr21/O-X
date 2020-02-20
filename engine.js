var banana = new MindObject


var gameState = '---------';

banana.makeMove('---------','O');
banana.makeMove('------OX-','O');
banana.makeMove('-X---OOX-','O');
banana.makeMove('------OX-','O');

banana.gameOver('Draw');


function humanMove(move,OorX){

 gameState = gameState.replaceAt(move,OorX);

}


function mindMove(OorX){
 var move = banana.makeMove(gameState,OorX);
 
 gameState = gameState.replaceAt(move,OorX);
 
 return move;
}


isGameDone('XXX------');

function isGameDone(gameState) {

var gameArray = [];

for (var i = 0; i < gameState.length; i++) {
 gameArray.push(gameState.charAt(i));
}
//console.log(gameArray);

if (gameArray[0] + gameArray[1] + gameArray[2] === 'XXX') {
 //console.log('x win');
 return 'X';
} else if(gameArray[0] + gameArray[1] + gameArray[2] === 'O'){

 return 'O'
}

if ( gameState.search('-') = -1 ) {
 return 'Draw';
}

return 'No';

}


function training(numberOfGames){

gameState = '---------';
var OorX = 'O';

var oposition = new MindObject;

 for (let gameNumber = 1; gameNumber <= numberOfGames; gameNumber++) {

  for (let gameMove = 1; gameMove < 10; gameMove++) {
  
 //alternating turns
 if ( (gameMove%2 + gameNumber%2)%2 === 0){
 
  var move = banana.makeMove(gameState,OorX);

gameState = gameState.replaceAt(move,OorX);
 
  if ( isGameDone(gameState) === 'X' || isGameDone(gameState) === 'O' ) {
  
  banana.gameOver('Win');
  oposition.gameOver('Loss');
  
  exit for
  } else if ( isGameDone(gameState) === 'Draw') {
  
  banana.gameOver('Draw');
  oposition.gameOver('Draw');
  
  exit for
  }
  
  
 } else {
 
var move = oposition.makeMove(gameState,OorX);

gameState = gameState.replaceAt(move,OorX);

 }
 
 
 
 if (OorX === 'X') {
 OorX = 'O'
} else if (OorX === 'O') {
 OorX = 'X'
}
 
  
  }
  //console.log('new game')
  gameState = '---------';

 }

}

/*

training (play vs self){
 Game state = 00000000

Loop {
 Odd/even Mind1/mind2.makemove
 UpdateGameState
 GameIsDone()? Exit loop
}


GameIsDone{
interesting.. this is the only rules of the game that is programmed!
loop through possibilities/is it full?
Return result
}

Mind1/2 reward/punishment

}



testing (play vs human) {

}


*/


String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
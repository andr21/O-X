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



//var kiwi = new MindObject;
//kiwi.makeMove();
//console.log(kiwi.banana);


/*
Mind1 = mind

Mind2 = mind



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
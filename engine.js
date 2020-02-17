var banana = new MindObject


banana.makeMove('---------','O');
banana.makeMove('------OX-','O');
banana.makeMove('-X---OOX-','O');
banana.makeMove('------OX-','O');

banana.gameOver('Draw');




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
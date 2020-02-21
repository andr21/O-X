function MindObject(){


this.network = [
/*['---------',[10,10,10,10,10,10,10,10,10]]*/

];

//console.log(this.network);

this.gameMemory = [];


this.makeMove = function(gameState,OorX){


if (OorX === 'O') {
 gameState = gameState.replace(/O/g,'p');
 gameState = gameState.replace(/X/g,'O');
 gameState = gameState.replace(/p/g,'X');
}

  
var networkPart= this.doIKnowThisState(gameState);

//console.log(networkPart);

var move = this.chooseFromNetworkPart(networkPart);
//console.log(move);

/* save into gameMemory */
this.gameMemory.push([networkPart, move]);

//console.log(this.gameMemory);

return move;

}


this.doIKnowThisState = function(gameState){


var arrayLength = this.network.length;

for (var i = 0; i < arrayLength; i++) {
    //console.log(this.network[i][0]);
    if (this.network[i][0] === gameState){
       //console.log('i know this state');
       return i
    }
}


/*
Yes:
Use network

Similar/something clever?:
E.g. mirror image? rotations?

No:
Add to network with random possibilities (of possible moves)

Returns bit of network
*/


//console.log('i dont know this state... adding..');

var arrayToAdd = [0,0,0,0,0,0,0,0,0];

for (var i = 0; i < gameState.length; i++) {

 if (gameState.charAt(i) === '-'){
 arrayToAdd[i] = 10;
}

}


this.network.push([gameState,arrayToAdd]);

return arrayLength;

}



this.chooseFromNetworkPart = function(networkPart){

/*
At random? Or clever logic?

(Output %chance of move?)

Return move
*/

var choices = this.network[networkPart][1]

var total = 0;

for (var i = 0; i < choices.length; i++) {

total = total + choices[i];

}
//console.log(total);


var selection = Math.floor(Math.random() * total) + 1

//console.log(selection);


for (var i = 0; i < choices.length; i++) {

selection = selection - choices[i];

 if(selection <= 0) {
    return i;
 }

}


}


this.gameOver = function(result){
/*
Win: give more
Draw: ?
Loss: take

Reset remember game
*/

/* will have to have a play with these to see what gives the best results */

var increment = 0;

   if (result === 'Win'){
     increment = 2;
   } else if (result === 'Draw'){
     increment = 1;
   } else if (result === 'Loss'){
     increment = -1;
   }



  for (var i = 0; i < this.gameMemory.length; i++) {
   
  this.network[this.gameMemory[i][0]][1][this.gameMemory[i][1]] += increment;

  }

gameMemory = [];
//console.log(this.network);

}




}






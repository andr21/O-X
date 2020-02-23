function MindObject(){


this.network = [
/*['---------',[10,10,10,10,10,10,10,10,10]]*/

];

this.numberOfGamesPlayed = 0;

//console.log(this.network);

this.gameMemory = [];


this.makeMove = function(gameState,OorX){

if (gameState.length != 9 ) {
 console.log('ERROR!!!!!');
}

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


if (this.gameMemory.length > 5) {
 console.log('Memory issue makemove');
 console.log(this.gameMemory);
}

//console.log(this.gameMemory);

return move;

}


this.doIKnowThisState = function(gameState){

var arrayLength = this.network.length;

//console.log(arrayLength);
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

if ( arrayToAdd === [0,0,0,0,0,0,0,0,0]) {
 console.log('shouldnt get here');
}


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

console.log('this shouldnt be reached');
console.log(total);
console.log('id: ' + networkPart);
console.log(this.network[networkPart][1]);
console.log(this.network[networkPart][0]);
}


this.gameOver = function(result){
/*
Win: give more
Draw: ?
Loss: take

Reset remember game
*/
this.numberOfGamesPlayed++;
var needCleaning = false;

/* will have to have a play with these to see what gives the best results */

if (this.gameMemory.length > 5) {
 console.log('Memory error');
 console.log(this.gameMemory);
}

if (this.gameMemory.length < 2) {
 console.log('this shouldnt be hit, game over error');
 console.log(this.gameMemory);
}

if (this.network.length < 2) {
 console.log('this shouldnt be hit, game over error with network');
 console.log(this.gameMemory);
}
//console.log(this.gameMemory);

var increment = 0;

   if (result === 'Win'){
     increment = 1;
   } else if (result === 'Draw'){
     increment = 0;
   } else if (result === 'Loss'){
     increment = -1;
   }



  for (var i = 0; i < this.gameMemory.length; i++) {
   

  this.network[this.gameMemory[i][0]][1][this.gameMemory[i][1]] += increment;


//need to remove from network if incremented down to 0

          var addy = 0;
          for (var j = 0; j < 9; j++) {
           
           addy = addy + this.network[this.gameMemory[i][0]][1][j]
          }
          if (addy <= 0) {
           //console.log('time for cleaning');
           //console.log(this.network[this.gameMemory[i][0]][1]);
           needCleaning = true;
          }

  }


 if (needCleaning === true){
  this.cleanNetwork();
  needCleaning = false;
 }
 this.gameMemory = [];
 //console.log('gameMemory emptied');
//console.log(this.network);

}


 
 this.cleanNetwork = function(){
 //console.log('cleaning...');
 
 var arrayLength = this.network.length;

 for (var i = 0; i < arrayLength; i++) {
    //console.log(this.network[i][0]);
    
    var addy = 0;
for (var j = 0; j < 9; j++) {
 
 addy = addy + this.network[i][1][j];
}
    
    
    
    if (addy <= 0){
       //console.log('removing from network');
       
       //console.log(this.network.length);
       this.network.splice(i,1);
       //console.log(this.network.length);
       i--;
       arrayLength = this.network.length;
    }
 }
 
  //console.log('cleaning done');
 }



}








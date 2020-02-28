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

//console.log(gameState)
//console.log(networkPart);

var move = this.chooseFromNetworkPart(networkPart[0]);
//console.log(move);

/* save into gameMemory */
this.gameMemory.push([networkPart[0], move,networkPart[3]]);


if (this.gameMemory.length > 5) {
 console.log('Memory issue makemove');
 console.log(this.gameMemory);
 console.log(this.network);
}

//console.log(this.gameMemory);

return convertMoveToOrginalState(move,networkPart[1],networkPart[2]);

}


this.doIKnowThisState = function(gameState){

var arrayLength = this.network.length;

for (var m = 0; m <= 1; m++) {
 for (var r = 0; r <= 3; r++) {

  for (var i = 0; i < arrayLength; i++) {
    if (this.network[i][0] === gameState){
       return [i,r,m,gameState];
    }
  }

 gameState = rotateState(gameState);
 }
 //gameState = rotateState(gameState);
 
 
 
 gameState = mirrorState(gameState);
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


return [arrayLength,0,0,gameState];

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
   
    //instead of using the index refinding it
  //this.network[this.gameMemory[i][0]][1][this.gameMemory[i][1]] += increment;

    var arrayLength = this.network.length;

    //console.log(arrayLength);
    for (var k = 0; k < arrayLength; k++) {
        //console.log(this.network[i][0]);
        if (this.network[k][0] === this.gameMemory[i][2]){
           //console.log('i know this state');
           this.network[k][1][this.gameMemory[i][1]] += increment;
           break;
        }
    }




//need to remove from network if incremented down to 0

          var addy = 0;
          for (var j = 0; j < 9; j++) {
           
           addy = addy + this.network[k][1][j]
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



this.reset = function() {
 this.gameMemory = [];
}

}





function rotateState(gameState){

return gameState.charAt(6) + gameState.charAt(3) + gameState.charAt(0) + gameState.charAt(7) + gameState.charAt(4) + gameState.charAt(1) + gameState.charAt(8) + gameState.charAt(5) + gameState.charAt(2);

}


function mirrorState(gameState){

return gameState.charAt(2) + gameState.charAt(1) + gameState.charAt(0) + gameState.charAt(5) + gameState.charAt(4) + gameState.charAt(3) + gameState.charAt(8) + gameState.charAt(7) + gameState.charAt(6);

}


function convertMoveToOrginalState(move,r,m){

if (r === 0 && m === 0) {
 return move;
}
var stringy = '---------'

stringy = stringy.replaceAt(move,'X');


 for (var i = 0; i < 4 - r; i++) {
   stringy = rotateState(stringy);
 }

 if (m === 1){
   stringy = mirrorState(stringy);
 }

return stringy.indexOf('X');
}




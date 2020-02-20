

var squareToMove = {
'a':0
,'b':1
,'c':2
,'d':3
,'e':4
,'f':5
,'g':6
,'h':7
,'i':8
};

var moveToSquare = {
0:'a'
,1:'b'
,2:'c'
,3:'d'
,4:'e'
,5:'f'
,6:'g'
,7:'h'
,8:'i'
};


// NOUGHTS AND CROSSES GAME TEST YO 

// Define all the elements
var game = "ul.game",
gameSquare = "ul.game li.blank",
nought = "ul.game li.nought",
cross = "ul.game li.cross";

var isGameOver = false;

// Define array for the noughts and crosses
var gameResult = [nought, cross];

// Grab each element square ID and push it to an array
var squareIDs = [];

// Count clicks so that every second click resets the X value
var x = 0;
function resetClick() {
x = 0;
gameSquare.value = x;
}

function count() {
if(x<1)
{
x += 1;
}
else 
{
x = 0;
}
}

$( "p.reset" ).click(function() {
         location.reload(true);
});

// 1 = NOUGHT, 0 = CROSS

// On clicking a square count the clicks and change the class, this will work only once per square

/*
$(gameSquare).bind("click", function(){

count();

if (x == 1) {

$(this).addClass("nought");
$(this).removeClass("blank");



} else if (x == 0) {

$(this).addClass("cross");
$(this).removeClass("blank"); 
resetClick(); 


}

squareIDs.push(x + " " + $(this).attr("id"));

console.log(squareIDs); 

// Set up the conditions for a "win", most likely there is a WAYYY better way to do this, which im learning to do.
var nought_win = 
  $.inArray("1 a", squareIDs) > -1 
&& $.inArray("1 b", squareIDs) > -1 
&& $.inArray("1 c", squareIDs) > -1
|| $.inArray("1 a", squareIDs) > -1
&& $.inArray("1 e", squareIDs) > -1
&& $.inArray("1 i", squareIDs) > -1
|| $.inArray("1 b", squareIDs) > -1
&& $.inArray("1 e", squareIDs) > -1
&& $.inArray("1 h", squareIDs) > -1
|| $.inArray("1 c", squareIDs) > -1
&& $.inArray("1 e", squareIDs) > -1
&& $.inArray("1 g", squareIDs) > -1
|| $.inArray("1 c", squareIDs) > -1
&& $.inArray("1 f", squareIDs) > -1
&& $.inArray("1 i", squareIDs) > -1
|| $.inArray("1 d", squareIDs) > -1
&& $.inArray("1 e", squareIDs) > -1
&& $.inArray("1 f", squareIDs) > -1
|| $.inArray("1 g", squareIDs) > -1
&& $.inArray("1 h", squareIDs) > -1
&& $.inArray("1 i", squareIDs) > -1
|| $.inArray("1 g", squareIDs) > -1
&& $.inArray("1 a", squareIDs) > -1
&& $.inArray("1 d", squareIDs) > -1; 

if(nought_win) {
console.log("NOUGHT WINS!");

$("h1").replaceWith("<h1><span class='nought'>NOUGHT WINS!</span></h1>");

$(nought).addClass("scale");
$(cross).addClass("fade");
    
     $(gameSquare).unbind();   
    
return;
}; 

// Set up the conditions for a "win"
var cross_win = 
  $.inArray("0 a", squareIDs) > -1 
&& $.inArray("0 b", squareIDs) > -1 
&& $.inArray("0 c", squareIDs) > -1
|| $.inArray("0 a", squareIDs) > -1
&& $.inArray("0 e", squareIDs) > -1
&& $.inArray("0 i", squareIDs) > -1
|| $.inArray("0 b", squareIDs) > -1
&& $.inArray("0 e", squareIDs) > -1
&& $.inArray("0 h", squareIDs) > -1
|| $.inArray("0 c", squareIDs) > -1
&& $.inArray("0 e", squareIDs) > -1
&& $.inArray("0 g", squareIDs) > -1
|| $.inArray("0 c", squareIDs) > -1
&& $.inArray("0 f", squareIDs) > -1
&& $.inArray("0 i", squareIDs) > -1
|| $.inArray("0 d", squareIDs) > -1
&& $.inArray("0 e", squareIDs) > -1
&& $.inArray("0 f", squareIDs) > -1
|| $.inArray("0 g", squareIDs) > -1
&& $.inArray("0 h", squareIDs) > -1
&& $.inArray("0 i", squareIDs) > -1
|| $.inArray("0 g", squareIDs) > -1
&& $.inArray("0 a", squareIDs) > -1
&& $.inArray("0 d", squareIDs) > -1; 

if(cross_win) {
console.log("CROSS WINS!");

$("h1").replaceWith("<h1><span class='cross'>CROSS WINS!</span></h1>");

$(cross).addClass("scale");
$(nought).addClass("fade");
    
$(gameSquare).unbind();    

return;
}; 


// Check if there are any blank tiles left, if there is keep going, if there ISN'T then game over :)
if ($("ul.game li.blank").length) {

} else {
console.log("TIE!");
};
  
// Unbind the button so it only fires once
   $(this).unbind();
  
});


*/



/*

this needs to tell the engine when a move has been made by a human.

the engine needs to tell this whether a move has been made by the machine/mind/thing

the engine needs to tell this whether there has been a win/loss/draw

this will have button to kick off training in the engine.

+ a button for machine goes first :)
*/








function squareClicked(move,OorX){
 humanMove(move,OorX);
 if (isGameOver === false) {
   setTimeout(mindToMove,500);
 }
 
}



function mindToMove(){

count();
var OorX = '-';

if (x == 1) {

OorX = 'O';

} else if (x == 0) {

resetClick(); 
OorX = 'X';

}

 var move = mindMove(OorX);
 
 var square = document.getElementById(moveToSquare[move]);

 
if (OorX === 'X') {

square.classList.add("cross");
square.classList.remove("blank"); 

} else if (OorX === 'O') {

square.classList.add("nought");
square.classList.remove("blank");

}

//hmmmm might need to handle this somewhere
//square.unbind();

}






$(gameSquare).bind("click", function(){

count();
var OorX = '-';

if (x == 1) {

$(this).addClass("nought");
$(this).removeClass("blank");

OorX = 'O';

} else if (x == 0) {

$(this).addClass("cross");
$(this).removeClass("blank"); 
resetClick(); 

OorX = 'X';

}

var move = squareToMove[$(this).attr("id")]

squareClicked(move,OorX);

// Unbind the button so it only fires once
   $(this).unbind();

});







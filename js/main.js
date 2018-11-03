//Global Variables
var tokenRadius;
var casingSize;
var tokenOffset;
var boardOffset;
var borderWidth = 5; //JQUERYYYYY
var colHeights = [0, 0, 0, 0, 0, 0, 0];


//Capture a user's move (dropping a token)
function dropToken(e)
{        
    var $token = $('#drop-token img');
    var relativeTokenPos = $token.offset().left + tokenRadius - boardOffset + 1.5; //FIGURE OUT WHY THIS 1.5 IS NEEDED
    var col = Math.floor(relativeTokenPos / casingSize);

    //PERFORM ANIMATION (move left/right downwards)
    alert("col = " + col);

    $token.css({
        top: 600 + "px"
    });

    var imgSrc = $token.prop('src');

    var row = colHeights[col]++;



    $('#token' + row + '-' + col).html($token.text()); //doesn't work

    //AT THIS POINT: Choose whether the drop token replaces the casing image with a token_in_casing img or if you try to overlap the drop-token img with the casing img



}

//Capture a user's movement when selecting a column to drop their token
function moveToken(e)
{
    //THIS DOESN'T WORK WHEN I ZOOM (PROBS DOESN'T WORK ON DIFFERENT SCREEN SIZES)

    if(e.clientX > ($('#top-slider').offset().left) && e.clientX < ($('#top-slider').offset().left + $('#top-slider').width()))
    {
        $('#drop-token img').css({
            left:  e.clientX - $('#top-slider').width() - $('#top-slider').position().left - tokenRadius + 10
        });
    }
}

//Perform all initial tasks needed for launch
function initialize() 
{    
    //Global Variable Initialization
    tokenRadius = $('#drop-token img').width() / 2;
    casingSize = $('#token0-0').width();
    boardOffset = $('#token-board').offset().left + 5;//GET 5 FROM border.width??     //CHECK FOR SCREEN RESIZING??? -> EVENT LISTENER??

    //Event Listeners
    $('.slider').css({
        width:  $('#token-board').width(), 
        height: tokenRadius * 2
    });

    $('#board-slider').css({
        width:  $('#token-board').outerWidth()  
    });

    //Event to capture a user's movement when selecting a column to drop their token
    $('#board-slider').mousemove(function(e){moveToken(e) });

    //Event to capture a user's move (dropping a token)
    $('#board-slider').click(function(e){ dropToken(e); });
}

//Call initialize method when window loads
window.onload = function() { initialize(); };
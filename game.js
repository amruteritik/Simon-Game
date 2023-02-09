
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var start = false;

$(document).keypress(function (event) {
    if (start === false) {
        $("#level-title").text("Level " + level);
        nextSequences();
        start = true;
    }
});


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});




function checkAnswer(currentlevel1) {
    if (userClickedPattern[currentlevel1] === gamePattern[currentlevel1]) {
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequences();
            }, 1000);    
        }
    }
    else {
       
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("OOPS!, Press A key to Retry");
        
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function nextSequences() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playsound(randomChosenColour);
    
    
}




function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    start= false;
  }





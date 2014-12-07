/**
 * Created by bharden on 9/26/14.
 */
var imageSet, wishSet;
var fadeInDiv, fadeOutDiv;
var imgDiv = ["#bImg1", "#bImg2", "#bImg3", "#bImg4"];
var inDivIndex = 0;
var outDivIndex = 1;

var txtDiv = ["#bTxt1", "#bTxt2"];
var txtIndex = 0;

var fontFamilies = ["alex-brush", "allura", "arizonia", "exo", "great-vibes", "oswald", "quicksand", "sansation",
    "yellowtail", "tangerine", "dancing-script-ot", "comfortaa", "candela", "calligraffiti", "sf-burlington-script",
    "bentham", "aleo", "abril-fatface"];

function imgFade() {
    // Set the fade in and out divs
    fadeInDiv = imgDiv[inDivIndex++];
    fadeOutDiv = imgDiv[outDivIndex++];

    // If the index is beyond the limit, the reset to 0
    if (inDivIndex >= imgDiv.length) {
        inDivIndex = 0;
    }
    if (outDivIndex >= imgDiv.length) {
        outDivIndex = 0;
    }

    //Determine start and ending position for sliding image
    startLeft = getRandomInteger(-50, 800);
    endLeft = getRandomInteger(-50, 800);
    startTop = getRandomInteger(-50, 50);
    endTop = getRandomInteger(-50, 50);
    startGrowth = getRandomInteger(-40, 40);
    endGrowth = getRandomInteger(-40, 40);


    // fade in the backup background, but first resize pic to starting size
    $(fadeInDiv).css("height", '+='+startGrowth+'%');
    $(fadeInDiv).css("width", '+='+startGrowth+'%');
    $(fadeInDiv).fadeIn({queue: false, duration: 2000});
    $(fadeInDiv).animate({
        left: endLeft,
        top: endTop,
        height:'+='+endGrowth+'%',
        width:'+='+endGrowth+'%'
    }, 2000);

    // fade out the existing background and change the image once the fadeout is complete, to get ready for the next time
    $(fadeOutDiv).fadeOut(2000, function(){
        $(fadeOutDiv).css("background", "url(\"/img/photos/" + imageSet[getRandomInteger(0, imageSet.length)] + "\") no-repeat");
        $(fadeOutDiv).css("background-size", "contain");
        $(fadeOutDiv).css("top", startTop);
        $(fadeOutDiv).css("left", startLeft);
        $(fadeOutDiv).css("height", "100%");
        $(fadeOutDiv).css("width", "100%");

        //reset indexes.  The next one to fade out will be lowest and on up
        tmpIndex = outDivIndex;
        for (i=0; i<imgDiv.length; i++, tmpIndex++ ) {
            if (tmpIndex >= imgDiv.length) {
                tmpIndex = 0;
            }

            tmpDiv = imgDiv[tmpIndex];
            $(tmpDiv).css("z-index", i+2);
        }
    });
}

function changeText() {
    txtFade('#bTxt1', '#bTxt2');
    setTimeout(function(){txtFade('#bTxt2', '#bTxt1')}, 12500);
}
function txtFade(divId1, divId2) {
    //Determine start and ending position for sliding image
    startLeft = getRandomInteger(0, 1000);
    endLeft = getRandomInteger(0, 1000);
    startTop = getRandomInteger(0, 500);
    endTop = getRandomInteger(0, 500);

    // fade in the backup background, but first resize pic to starting size
    $(divId1).fadeIn({queue: false, duration: 1500});
    $(divId1).animate({
        left: endLeft,
        top: endTop,
    }, 5000);

    // fade out the existing background and change the image once the fadeout is complete, to get ready for the next time
    nxtFont = fontFamilies[getRandomInteger(0, fontFamilies.length)];
    $(divId2).fadeOut(2000, function(){
        $(divId2).html(wishSet[getRandomInteger(0, wishSet.length)]);
        $(divId2).css("background-size", "contain");
        $(divId2).css("top", startTop);
        $(divId2).css("left", startLeft);
        $(divId2).css("font-family", nxtFont);
    });

    // if the intro is still displayed, then fade it out and don't display again
    if ($('#introTxt1').css("display") == 'block') {
        $('#introTxt1').fadeOut(2000);
    }
}

function populateImageSet(fileList)
{
    imageSet = fileList.split(",");;
}
function populateWishes(savedWishes) {
    wishSet = [];
    var obj = JSON.parse(savedWishes.replace(/&quot;/g,'"'));

    // loop through the well wishes and add to the wishSet
    for (var i = 0; i < obj.wishes.length; i++) {
        wishSet[i] = obj.wishes[i].message+"<br> - "+obj.wishes[i].name;
    }
}

function changeTotalChars() {
    // Count how many characters in the textarea
    var totalChars = $('#message').val().length;

    //If the total number is greater than 200, then remove the extra character
    if (totalChars > 200) {
        var modifiedMessage = $('#message').val().substring(0, 200);
        $('#message').val(modifiedMessage);
        totalChars = 200;
    }

    $('#messageChars').html('('+totalChars+'/200)');
}

$(document).ready(function(){
    // Display the last message that was entered first, followed by a random entry
    var firstMessage = wishSet[wishSet.length-1];
    $('#bTxt2').html(firstMessage);
    $('#bTxt1').html(wishSet[getRandomInteger(0, wishSet.length)]);

    // Start cycling through the images and text
    setInterval(function() {imgFade()}, 5000);
    setTimeout(function(){txtFade('#bTxt2', '#bTxt1')}, 12500);
    setInterval(function() {changeText()}, 25000);

    // set effect from select menu value
    $( "#wishesToggle" ).click(function() {
        // make the toggle switch a brighter white
        $("#wishesToggle").css("background", "rgba(255,255,255,.9)");

        $("#wishes").slideToggle("slow", function() {
            if ($('#wishes').css("display") != 'block')
            {
                $("#wishesToggle").css("background", "rgba(255,255,255,.4)");
            }
        });
    });

    // Also open the toggle if someone mouses over it
    $( "#wishesToggle" ).mouseover(function() {
        // make the toggle switch a brighter white
        $("#wishesToggle").css("background", "rgba(255,255,255,.9)");

        if ($('#wishes').css("display") != 'block')
        {
            $("#wishes").slideToggle("slow", function() {});
        }

    });


    // update the total chars for the message on all changes
    $( '#message' ).change(function() {changeTotalChars()});
    $( '#message' ).keyup(function() {changeTotalChars()});

    $( '#button2').click(function() {
        $('#messageChars').html('(0/200)');
    });
});
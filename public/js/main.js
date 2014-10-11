/**
 * Created by bharden on 9/26/14.
 */

var imageSet;
var fadeInDiv, fadeOutDiv;
var imgDiv = ["#bImg1", "#bImg2", "#bImg3", "#bImg4"];
var inDivIndex = 0;
var outDivIndex = 1;

var txtDiv = ["#bTxt1", "#bTxt2"];
var txtIndex = 0;

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
    $(divId2).fadeOut(2000, function(){
        $(divId2).css("background-size", "contain");
        $(divId2).css("top", startTop);
        $(divId2).css("left", startLeft);

    });
}

function populateImageSet(fileList)
{
    imageSet = fileList.split(",");;
}

$(document).ready(function(){
    setInterval(function() {imgFade()}, 5000);
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
});
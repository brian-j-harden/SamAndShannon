/**
 * Created by bharden on 9/26/14.
 */

var imageSet;
var fadeInDiv, fadeOutDiv;
var divSet = ["#bImg1", "#bImg2", "#bImg3", "#bImg4"];
var inDivIndex = 0;
var outDivIndex = 1;

function imgFade() {
    // Set the fade in and out divs
    fadeInDiv = divSet[inDivIndex++];
    fadeOutDiv = divSet[outDivIndex++];
    console.log("Called on "+fadeInDiv+" and "+fadeOutDiv);

    // If the index is beyond the limit, the reset to 0
    if (inDivIndex >= divSet.length) {
        inDivIndex = 0;
    }
    if (outDivIndex >= divSet.length) {
        outDivIndex = 0;
    }

    //Determine start and ending position for sliding image
    startLeft = getRandomInteger(-50, 1000);
    endLeft = getRandomInteger(-50, 1000);
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
        for (i=0; i<divSet.length; i++, tmpIndex++ ) {
            if (tmpIndex >= divSet.length) {
                tmpIndex = 0;
            }

            tmpDiv = divSet[tmpIndex];
            $(tmpDiv).css("z-index", i+2);
        }
    });
}

function populateImageSet(fileList)
{
    // Still need to remove .DS_Store and unnecessary files from the directory.  But otherwise, works great.
    console.log('Passed files: '+fileList);
    imageSet = fileList.split(",");;
}

$(document).ready(function(){
    setInterval(function() {imgFade()}, 5000);

    // set effect from select menu value
    $( "#wishesToggle" ).click(function() {
        $('#wishes').slideToggle("slow");
    });
});
/**
 * Created by bharden on 9/26/14.
 */
//var fs = require('fs');

var imageSet = ["DSC_0157.gif", "DSC_0404-2.gif", "DSC_0447.gif", "DSC_0492-2.gif", "DSC_0539.gif", "DSC_0160.gif", "DSC_0404.gif", "DSC_0452.gif", "DSC_0492.gif", "DSC_0568-2.gif", "DSC_0203.gif", "DSC_0423.gif", "DSC_0455.gif", "DSC_0501.gif", "DSC_0568.gif", "DSC_0204.gif", "DSC_0430.gif", "DSC_0466.gif", "DSC_0509-2.gif", "DSC_0572.gif", "DSC_0366-2.gif", "DSC_0434-2.gif", "DSC_0479.gif", "DSC_0509.gif", "DSC_0577.gif", "DSC_0366.gif", "DSC_0434.gif", "DSC_0480.gif", "DSC_0530-2.gif", "DSC_0581.gif", "DSC_0373-2.gif", "DSC_0443-2.gif", "DSC_0486-2.gif", "DSC_0530.gif", "DSC_0588.gif", "DSC_0373.gif", "DSC_0443.gif", "DSC_0486.gif", "DSC_0536.gif", "DSC_0601.gif"];
var imageIndex = -1;
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
    growth = getRandomInteger(-75, 75);

    console.log("growth: "+growth);

    // fade in the backup background
    $(fadeInDiv).fadeIn({queue: false, duration: 2000});
    $(fadeInDiv).animate({
        left: endLeft,
        top: endTop,
        height:'+='+growth+'%',
        width:'+='+growth+'%'
    }, 2000);

    // fade out the existing background and change the image once the fadeout is complete, to get ready for the next time
    $(fadeOutDiv).fadeOut(2000, function(){
        $(fadeOutDiv).css("background", "url(\"/img/" + imageSet[getRandomInteger(0, imageSet.length)] + "\") no-repeat");
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

$(document).ready(function(){
    setInterval(function() {imgFade()}, 5000);

    // set effect from select menu value
    $( "#wishesToggle" ).click(function() {
        $('#wishes').slideToggle("slow");
    });
});
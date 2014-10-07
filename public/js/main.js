/**
 * Created by bharden on 9/26/14.
 */
//var fs = require('fs');

var imageSet = ["2014-02-11 19.15.59.jpg", "2014-02-11 19.17.13.jpg", "2014-02-13 19.54.53.jpg", "2014-02-14 17.27.25.jpg", "2014-02-14 18.05.47.jpg", "2014-02-14 19.45.08.jpg"];
var imageIndex = -1;

function changeBackgroundImages() {
    imgFade('#bImg1', '#bImg2');
    setTimeout(function(){imgFade('#bImg2', '#bImg1')}, 4000);
}

function imgFade(divId1, divId2) {

    // Get a random number for the next index, but don't let it be the same as the previous value
    tmpIndex = imageIndex;
    imageIndex = getRandomInteger(0, imageSet.length);
    while (tmpIndex == imageIndex) {
        imageIndex = getRandomInteger(0, imageSet.length);
    }

    //Determine start and ending position for sliding image
    startLeft = getRandomInteger(-50, 300);
    endLeft = getRandomInteger(-50, 300);
    startTop = getRandomInteger(-50, 300);
    endTop = getRandomInteger(-50, 300);
    growth = getRandomInteger(-75, 75);

    console.log("growth: "+growth);

    // fade in the backup background
    $(divId2).fadeIn({queue: false, duration: 3000});
    $(divId2).animate({
        left: endLeft,
        top: endTop,
        height:'+='+growth+'%',
        width:'+='+growth+'%'
    }, 4000);

    // fade out the existing background and change the image once the fadeout is complete, to get ready for the next time
    $(divId1).fadeOut(2500, function(){
        $(divId1).css("background", "url(\"/img/" + imageSet[imageIndex] + "\") no-repeat");
        $(divId1).css("background-size", "contain");
        $(divId1).css("top", startTop);
        $(divId1).css("left", startLeft);
        $(divId1).css("height", "100%");
        $(divId1).css("width", "100%");
    });

}


$(document).ready(function(){
    setInterval(changeBackgroundImages, 8000);
});
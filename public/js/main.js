/**
 * Created by bharden on 9/26/14.
 */

var imageSet1 = ["2014-02-11 19.15.59.jpg", "2014-02-11 19.17.13.jpg", "2014-02-13 19.54.53.jpg"];
var currentImageSet1 = 0;

var imageSet2 = ["2014-02-14 17.27.25.jpg", "2014-02-14 18.05.47.jpg", "2014-02-14 19.45.08.jpg"];
var currentImageSet2 = 0;

function changeBackgroundImages() {
    img1Fade();
    setTimeout(img2Fade, 2000);

}

function img1Fade(){

    $('#bImg1').fadeOut('slow', function(){$('#bImg1').css("background", "url(\"/img/" + imageSet1[++currentImageSet1] + "\") no-repeat")});
    $('#bImg2').fadeIn('slow');
    console.log('img1 background: '+ $('#bImg1').css("background"));
    console.log('currentImageSet1 is '+currentImageSet1);
    console.log('image1 is '+imageSet1[currentImageSet1]);
    if (currentImageSet1 >= imageSet1.length - 1) {

        currentImageSet1 -= imageSet1.length;
        console.log('reset currentImageSet1 to ' + currentImageSet1);
    };
}

function img2Fade(){

    $('#bImg2').fadeOut('slow', function(){$('#bImg2').css("background", "url(\"/img/" + imageSet2[++currentImageSet2] + "\") no-repeat")});
    $('#bImg1').fadeIn('slow');
    console.log('currentImageSet2 is '+currentImageSet2);
    console.log('image2 is '+imageSet2[currentImageSet2]);
    if (currentImageSet2 >= imageSet2.length - 1) {

        currentImageSet2 -= imageSet2.length;
        console.log('reset currentImageSet2 to ' + currentImageSet2);
    };
}

$(document).ready(function(){

    setInterval(changeBackgroundImages, 4000);
});
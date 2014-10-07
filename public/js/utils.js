/**
 * Created by bharden on 10/1/14.
 */

function getRandomInteger(min, max) {
    // Returns a random integer between min (included) and max (excluded)
    return Math.floor(Math.random() * (max - min)) + min;
}
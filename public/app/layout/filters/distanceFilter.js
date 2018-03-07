/**
 * Created by DanGar on 1/22/16.
 * path: app/layout/filters/distanceFilter.js
 */


define(['layout/module'], function (module) {

    'use strict';

    module.registerFilter('length', function() {

        var conversionKey={
            inch:{
                ft:0.08333333,
                inch:1
            },
            ft:{
                inch:12,
                ft:1
            }
        };

        var calculateFeet = function(length){

            //Calculate the correct rounding decimal place. Inches * 0.083333333
            length = length.toString().split(".")[0];
            length = length * conversionKey['inch']['ft'];
            length = Math.round(length * 1000000)/1000000;

            //Remove decimals and get feet.
            var feet = Math.floor(length);

            //Calculate inches.
            var inchDecimal = length - feet;

            //If inches round to 12 then add one more foot to feet and omit inches.
            if(Math.round((inchDecimal) * 12) == 12)feet +=1;

            return feet;
        };
        var calculateInches = function(length){
            var getDecimal = length.toString().split(".")[1];
            length = parseInt(length.toString().split(".")[0])%12;

            ///Need to account for the decimal places regardless of inches.
            var stringify =  (length > 0 || getDecimal) ? (getDecimal ? Math.ceil(length)+'.'+getDecimal+'':Math.ceil(length)+'') : '';

            stringify = getDecimal ? parseFloat(stringify).toFixed(2) : stringify;

            return stringify;
        };

        var parseFeetForString = function(feet){
            return (feet) ? feet +"'" : '';
        };

        var parseInchesForString = function(stringify){
            return stringify ? stringify + '"': '';
        };

        var fromFeetToInches = function(calculation){
            return Math.floor(calculation * 100)/100+'"';
        };

        var convertInchesToFeet = function(length){

            var feet = calculateFeet(length);
            var inches = calculateInches(length);

            return parseFeetForString(feet) +" "+parseInchesForString(inches);

        };

        return function(distance, from, to){
            if(to == 'ft')
                return convertInchesToFeet(distance);
            if(to == 'inch')
                return fromFeetToInches(distance * conversionKey[from][to])
        };
    });
});
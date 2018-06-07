/**
 Created by svend on 7/06/2018.
 **/

module.exports = (function () {

    let generateRandomNumber = function (maxValue) {
      return Math.floor(Math.random() * maxValue) + 1;
    };

    let thatCanBeACertainNumber = function (thisNumberCantItBe, maxValue) {
        let generateNumber = thisNumberCantItBe;
        while (generateNumber === thisNumberCantItBe) {
            generateNumber = generateRandomNumber(maxValue)
        }
        return generateNumber;
    };


    return {
        thatCanBeACertainNumber: thatCanBeACertainNumber,
        generateRandomNumber: generateRandomNumber
    }

})();

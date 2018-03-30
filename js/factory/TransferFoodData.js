angular.module('gatorEats')
    .factory('TransferFoodData', TransferFoodData)

function TransferFoodData() {
    var savedFoodData = {};
    
    function setFood(foodData) {
        savedFoodData = foodData;
    }
    
    function getFood() {
        return savedFoodData;
    }
    
    return {
        setFood: setFood,
        getFood: getFood
    };
}
gatorEats.controller('FoodItemController', ['$scope', '$http', 'TransferFoodData', 'TransferUserData',
    function($scope, $http, TransferFoodData, TransferUserData) {
        $scope.foodData = TransferFoodData.getFood();
        var user = TransferUserData.getUser();

        $http.get('/api/foodItems')
            .then( (response) => {
                response.data.forEach( (item, i) => {
                    if(item.itemName == $scope.foodData.itemName 
                            && item.station == $scope.foodData.station 
                            && item.location == $scope.foodData.location) {
                        $scope.foodData = item;
                    }
                });
            })
            .catch( (err) => {
                console.log(err);
            });

        $scope.foodData.totalRating = 4;
         // Get number in html
        $scope.getNumber = (num) => {
            return new Array(num); 
        }



        // Get average rating to display
        // function averageStars(starsArray) {
        //     var total = 0;
    
        //     for(var i = 0; i < starsArray.length; i++) {
        //         total += starsArray[i].rating;
        //     }
    
        //     var avg = total / starsArray.length;
        //     return avg;
        // }
    }
]);
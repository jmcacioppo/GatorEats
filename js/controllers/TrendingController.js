gatorEats.controller('TrendingController', ['$scope', '$http', '$location', 'TransferFoodData',
    function($scope, $http, $location, TransferFoodData) {
        getLearboard();
        
        $scope.getFoodItem = function(item, station, location) {
            var foodData = {
                'itemName' : item,
                'station' : station,
                'location' : location
            }
            
            TransferFoodData.setFood(foodData);
            $location.path('/foodItem');
        }

        function getLearboard() {
            $http.get('/api/leaderboard')
                .then( (response) => {
                    $scope.leaderboard = response.data.trending;
                })
                .catch( (err) => {
                    console.log(err);
                });
        }
    }
]);
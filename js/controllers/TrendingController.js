gatorEats.controller('TrendingController', ['$scope', '$http', '$location', 'TransferFoodData',
    function($scope, $http, $location, TransferFoodData) {
        getLeaderboard();
        $scope.limit = 10;
        
        $scope.getFoodItem = function(item, station, location) {
            var foodData = {
                'itemName' : item,
                'station' : station,
                'location' : location
            }
            
            TransferFoodData.setFood(foodData);
            $location.path('/foodItem');
        }

        function getLeaderboard() {
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
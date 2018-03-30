gatorEats.controller('TrendingController', ['$scope', '$http',
    function($scope, $http) {
        getLearboard();
        
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
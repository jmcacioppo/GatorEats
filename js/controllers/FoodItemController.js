gatorEats.controller('FoodItemController', ['$scope', '$http', 'TransferFoodData', 'TransferUserData',
    function($scope, $http, TransferFoodData, TransferUserData) {
        $scope.foodData = TransferFoodData.getFood();
        var user = TransferUserData.getUser();

        if(user) $scope.loggedIn = true;
        else $scope.loggedIn = false;

        getReviews();
        
         // Get number in html
        $scope.getNumber = (num) => {
            return new Array(num); 
        }

        $scope.submittingReview = false;
        $scope.reviewRequest = function() {
            if($scope.submittingReview == true) $scope.submittingReview = false;
            else $scope.submittingReview = true;
        }

        $scope.getStars = function(number) {
            $scope.rating = number;
        }

        $scope.submitReview = function() {
            $scope.foodData.review = {
                rating: $scope.rating,
                comment: $scope.comment,
                reviewerUsername: user.username,
                reviewerImgURL: '../css/avatars/cool-guy.png'
            }

            if(!$scope.foodData.reviews) {
                $http.post('/api/foodItems', $scope.foodData)
                    .then( (response) => {
                        $scope.foodData = response.data;
                        $scope.comment = '';
                    })
                    .catch( (err) => {
                        console.log(err);
                    });
            }
            else {
                let id = $scope.foodData._id;
                
                $http.put('/api/foodItems/' + id, $scope.foodData)
                    .then( (response) => {
                        $scope.foodData = response.data;
                        $scope.comment = '';
                    })
                    .catch( (err) => {
                        console.log(err);
                    });
            }
        }

        function getReviews() {
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
        }
    }
]);
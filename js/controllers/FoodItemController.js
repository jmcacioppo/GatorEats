gatorEats.controller('FoodItemController', ['$scope', '$http', 'TransferFoodData', 'TransferUserData', '$mdToast',
    function($scope, $http, TransferFoodData, TransferUserData, $mdToast) {
        $scope.foodData = TransferFoodData.getFood();
        var user = TransferUserData.getUser();

        if(user.username) $scope.loggedIn = true;
        else $scope.loggedIn = false;

        getReviews();

        // Used for angular-material toast alert
        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        $scope.toastPosition = angular.extend({},last);

        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }
        
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
                reviewerImgURL: user.imgURL
            }

            if(!$scope.foodData.reviews) {
                $http.post('/api/foodItems', $scope.foodData)
                    .then( (response) => {
                        $scope.foodData = response.data;
                        $scope.comment = '';
                        var pinTo = $scope.getToastPosition();

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Review submitted')
                                .position(pinTo )
                                .hideDelay(3000)
                        );

                        $scope.reviewsExist = true;
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
                        var pinTo = $scope.getToastPosition();

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Review submitted')
                                .position(pinTo )
                                .hideDelay(3000)
                        );

                        $scope.reviewsExist = true;
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

                    if(!$scope.foodData.reviews) {
                        $scope.reviewsExist = false;
                    }
                    else $scope.reviewsExist = true;
                })
                .catch( (err) => {
                    console.log(err);
                });
        }
    }
]);
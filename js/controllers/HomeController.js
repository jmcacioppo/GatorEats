gatorEats.controller('HomeController', ['$scope', '$http', '$location', 'TransferUserData', '$mdToast',
    function($scope, $http, $location, TransferUserData, $mdToast) {
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
        
        $scope.login = function() {
    		$http.get('/api/users')
                 .then( (response) => {
                    var userData = '';
                    var users = response.data;
                    users.forEach( (user, i) => {
                        if(user.username == $scope.username && user.password == $scope.password) {
                            userData = user;
                        }
                    });

                    if(!userData) {
                        var pinTo = $scope.getToastPosition();

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Error: Incorrect username or password')
                                .position(pinTo )
                                .hideDelay(3000)
                        );
                    }
                    else {
                        TransferUserData.setUser(userData);
                        var pinTo = $scope.getToastPosition();

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('You are logged in!')
                                .position(pinTo )
                                .hideDelay(3000)
                        );
                        $location.path('/today');
                    }
                 })
                 .catch( (err) => {
                     console.log(err);
                 });
    	}

    	$scope.signup = function() {
    		var userData = {
                username: $scope.username,
                password: $scope.password
            }
            
            $http.post('/api/users', userData)
                .then( (response) => {
                    if(response.data.message) {
                        var pinTo = $scope.getToastPosition();

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Error: User already exists')
                                .position(pinTo )
                                .hideDelay(3000)
                        );
                    }
                    else {
                        TransferUserData.setUser(repsonse.data);
                        var pinTo = $scope.getToastPosition();

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('You are logged in!')
                                .position(pinTo )
                                .hideDelay(3000)
                        );
                        $location.path('/today');
                    }
                })
                .catch( (err) => {
                    alert('An error occurred');
                    console.log(err);
                });
    	}
    }
]);
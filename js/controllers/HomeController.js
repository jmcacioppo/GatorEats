gatorEats.controller('HomeController', ['$scope', '$http', '$location', 'TransferData',
    function($scope, $http, $location, TransferData) {
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

                    if(!userData) alert('Incorrect username or password');
                    else {
                        TransferData.setUser(userData);
                        alert('You are logged in!');
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
                    TransferData.setUser(repsonse.data);
                    alert('You are logged in!');
                    $location.path('/today');
                })
                .catch( (err) => {
                    alert('An error occurred');
                    console.log(err);
                });
    	}

    	
    }
]);
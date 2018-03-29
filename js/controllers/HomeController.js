gatorEats.controller('HomeController', ['$scope', '$http',
    function($scope, $http) {
    	$scope.login = function() {
    		console.log($scope.username);
    		console.log($scope.password);
    	}

    	$scope.signup = function() {
    		console.log($scope.username);
    		console.log($scope.password);
    	}

    	// $http.get('/api/users')
    	// 	.then( (response) => {
    	// 		console.log(response.data);
    	// 	})
    	// 	.catch( (err) => {
    	// 		console.log(err);
    	// 	});
    }
]);
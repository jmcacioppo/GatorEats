gatorEats.controller('ExtrasController', ['$scope', '$http',
    function($scope, $http) {
    	$http.get('menus/extras.json')
    		.then(function(response) {
    			$scope.menus = response.data;

    			// response.data.forEach()
    			// check availability, if available put in $scope.availableNow
    			// if not, in $scope.availableLater
    		})
    		.catch(function(error) {
    			console.log(error);
    		});
    }
]);
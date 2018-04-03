gatorEats.controller('ExtrasController', ['$scope', '$http',
    function($scope, $http) {
    	$http.get('menus/extras.json')
    		.then(function(response) {
				$scope.menus = response.data;
				$scope.availableNow = [];
				$scope.availableLater = [];

				var time = new Date();
				var hour = time.getHours();
				var mins = time.getMinutes();
				var myTime = hour * 100 + mins;

				angular.forEach($scope.menus, function(value, key){
					var theirStartTime = Number (value.startTime);
					var theirEndTime = Number (value.endTime);
					if(theirStartTime <= myTime && theirEndTime >= myTime){
						$scope.availableNow.push(value);
					}else{
						$scope.availableLater.push(value);
					}
				})
    		})
    		.catch(function(error) {
    			console.log(error);
    		});
    }
]);
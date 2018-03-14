gatorEats.controller('HomeController', ['$scope', '$http',
    function($scope, $http) {
    	$http.get('/api/get')
    		.then( (response) => {
    			console.log(response.data);
    		})
    		.catch( (err) => {
    			console.log(err);
    		});
    }
]);
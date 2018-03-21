gatorEats.controller('TodayMenuController', ['$scope', '$http',
    function($scope, $http){
        $http.get('menus/FFbreakfast.json')
            .then(function(res) {
            	let day = "wednesday";

            	res.data.forEach( function(menu, i) {
            		if(menu.day == day) $scope.menus = menu;
            		console.log(menu);
            	});
                
            });

        $scope.showThis = true;
    }
]);
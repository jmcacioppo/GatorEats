gatorEats.controller('TodayMenuController', ['$scope', '$http',
    function($scope, $http){
        $http.get('menus/FFbreakfast.json')
            .then(function(res){
                $scope.menus = res.data;
                console.log(res);
            });

        $scope.showThis = true;
    }
]);
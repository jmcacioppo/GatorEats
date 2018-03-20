var app = angular.module("gatorEats", []);

app.controller('TodayMenuController', function($scope, $http) {
        $http.get('menus/FFbreakfast.json')
            .success(function(res){
                $scope.menus = res;
            });
});
gatorEats.controller('HeaderController', ['$scope', '$location', 'TransferUserData',
    function($scope, $location, TransferUserData) {
        $scope.showTabs = false;
        if($location.path() != '/') $scope.showTabs = true;

        $scope.$watch(function() {
            return $location.path();
        }, function(value){
            var user = TransferUserData.getUser();

            if(value != '/') $scope.showTabs = true;
            else $scope.showTabs = false;

            if(user.username) $scope.showSettings = true;
            else $scope.showSettings = false;
        })
    }
]);
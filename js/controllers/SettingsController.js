gatorEats.controller('SettingsController', ['$scope', '$http', 'TransferUserData',
    function($scope, $http, TransferUserData) {
        $scope.user = TransferUserData.getUser();
        console.log($scope.user);

        $scope.saveChanges = function() {
            let id = $scope.user._id;
            
            $http.put('/api/users/' + id, $scope.user)
                .then( (response) => {
                    console.log(response.data);
                })
                .catch( (err) => {
                    console.log(err);
                });
        }
    }
]);
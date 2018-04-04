gatorEats.controller('SettingsController', ['$scope', '$http', 'TransferUserData', '$location', '$mdToast',
    function($scope, $http, TransferUserData, $location, $mdToast) {
        $scope.user = TransferUserData.getUser();
        $scope.pickedCool = false;
        $scope.pickedNanny = false;
        $scope.pickedProf = false;
        $scope.pickedHair = false;
        $scope.pickedStache = false;
        $scope.pickedJane = false;

        let id = $scope.user._id;
        var imgURL = '';
        
        checkImage();

        // Used for angular-material toast alert
        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        $scope.toastPosition = angular.extend({},last);

        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }

        $scope.saveChanges = function() {
            $http.put('/api/users/' + id, $scope.user)
                .then( (response) => {
                    var pinTo = $scope.getToastPosition();

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Settings saved!')
                            .position(pinTo )
                            .hideDelay(3000)
                    );
                })
                .catch( (err) => {
                    var pinTo = $scope.getToastPosition();

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('An error occurred.')
                            .position(pinTo )
                            .hideDelay(3000)
                    );
                });
        }

        function checkImage() {
            if($scope.user.imgURL == '../css/avatars/cool-guy.png')
                $scope.pickedCool = true;
            else if($scope.user.imgURL == '../css/avatars/mean-nanny.png')
                $scope.pickedNanny = true;
            else if($scope.user.imgURL == '../css/avatars/el-professor.png')
                $scope.pickedProf = true;
            else if($scope.user.imgURL == '../css/avatars/messy-hair.png')
                $scope.pickedHair = true;
            else if($scope.user.imgURL == '../css/avatars/mustache-dude.png')
                $scope.pickedStache = true;
            else if($scope.user.imgURL == '../css/avatars/plane-jane.png')
                $scope.pickedJane = true;
        }

        $scope.chooseImage = function(image) {
            if(image == 'cool') {
                imgURL = '../css/avatars/cool-guy.png';
                $scope.pickedCool = true;
                $scope.pickedNanny = false;
                $scope.pickedProf = false;
                $scope.pickedHair = false;
                $scope.pickedStache = false;
                $scope.pickedJane = false;
            }
            else if(image == 'nanny') {
                imgURL = '../css/avatars/mean-nanny.png';
                $scope.pickedCool = false;
                $scope.pickedNanny = true;
                $scope.pickedProf = false;
                $scope.pickedHair = false;
                $scope.pickedStache = false;
                $scope.pickedJane = false;
            }
            else if(image == 'prof') {
                imgURL = '../css/avatars/el-professor.png';
                $scope.pickedCool = false;
                $scope.pickedNanny = false;
                $scope.pickedProf = true;
                $scope.pickedHair = false;
                $scope.pickedStache = false;
                $scope.pickedJane = false;
            }
            else if(image == 'hair') {
                imgURL = '../css/avatars/messy-hair.png';
                $scope.pickedCool = false;
                $scope.pickedNanny = false;
                $scope.pickedProf = false;
                $scope.pickedHair = true;
                $scope.pickedStache = false;
                $scope.pickedJane = false;
            }
            else if(image == 'stache') {
                imgURL = '../css/avatars/mustache-dude.png';
                $scope.pickedCool = false;
                $scope.pickedNanny = false;
                $scope.pickedProf = false;
                $scope.pickedHair = false;
                $scope.pickedStache = true;
                $scope.pickedJane = false;
            }
            else if(image == 'jane') {
                imgURL = '../css/avatars/plane-jane.png';
                $scope.pickedCool = false;
                $scope.pickedNanny = false;
                $scope.pickedProf = false;
                $scope.pickedHair = false;
                $scope.pickedStache = false;
                $scope.pickedJane = true;
            }
        }

        $scope.saveImage = function() {
            $scope.user.imgURL = imgURL;

            $http.put('/api/users/' + id, $scope.user)
                .then( (response) => {
                    var pinTo = $scope.getToastPosition();

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('New image saved!')
                            .position(pinTo )
                            .hideDelay(3000)
                    );
                })
                .catch( (err) => {
                    var pinTo = $scope.getToastPosition();

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('An error occurred.')
                            .position(pinTo )
                            .hideDelay(3000)
                    );
                });
        }

        $scope.logout = function() {
            var pinTo = $scope.getToastPosition();

            $mdToast.show(
                $mdToast.simple()
                    .textContent('You are logged out')
                    .position(pinTo )
                    .hideDelay(3000)
            );

            var user = '';
            TransferUserData.setUser(user);
            $location.path('/');
        }
    }
]);
gatorEats.controller('SettingsController', ['$scope', '$http', 'TransferUserData',
    function($scope, $http, TransferUserData) {
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

        $scope.saveChanges = function() {
            $http.put('/api/users/' + id, $scope.user)
                .then( (response) => {
                    console.log(response.data);
                })
                .catch( (err) => {
                    console.log(err);
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
                    console.log(response.data);
                })
                .catch( (err) => {
                    console.log(err);
                });
        }
    }
]);
gatorEats.controller('TodayMenuController', ['$scope', '$http', '$location', 'TransferFoodData', 'TransferUserData',
    function($scope, $http, $location, TransferFoodData, TransferUserData) {
        var user = TransferUserData.getUser();
        if(user) $scope.loggedIn = true;
        else $scope.loggedIn = false;
        
        $scope.freshFoodBreakfast = false;
        $scope.freshFoodLunch = false;
        $scope.freshFoodDinner = false;
        $scope.gatorCornerBreakfast = false;
        $scope.gatorCornerLunch = false;
        $scope.gatorCornerDinner = false;

        var time = new Date();
        var hour = time.getHours();
        var mins = time.getMinutes();
        var myTime = hour * 100 + mins;
        // var myTime = Number(currentTime);

        console.log('myTime', myTime);

        // 0 - Sunday, 1 - Monday, and so on until 6 - Saturday
        var currentDay = time.getDay();

        function checkHours() {
            var startTime = 0;
            var endTime = 0;

            if(currentDay == 0) {
                startTime = 800;
                endTime = 2300;
            } 
            else if(currentDay == 5) {
                startTime = 700;
                endTime = 2200;
            }
            else if(currentDay == 6) {
                startTime = 830;
                endTime = 2200;
            }
            else {
                startTime = 700;
                endTime = 2300;
            }

            if(myTime >= startTime && myTime < 1100) {
                $scope.freshFoodBreakfast = true;
                $scope.nowServing = "Now Serving Breakfast";
            }
            else if(myTime >= 1100 && myTime < 1600) {
                $scope.freshFoodLunch = true;
                $scope.nowServing = "Now Serving Lunch";
            }
            else if(myTime >= 1600 && myTime < endTime) {
                $scope.freshFoodDinner = true;
                $scope.nowServing = "Now Serving Dinner";
            }
            else {
                $scope.freshFoodBreakfast = true;
                $scope.nowServing = "Currently Closed";
            }
        }

        checkHours();
        getMenus();

        $scope.getFoodItem = function(item, station) {
            var currentLocation = '';

            if($scope.freshFoodBreakfast == true || $scope.freshFoodLunch == true || $scope.freshFoodDinner == true)
                currentLocation = 'Fresh Food Company';
            else currentLocation = 'Gator Corner';
            
            var foodData = {
                'itemName' : item,
                'station' : station,
                'location' : currentLocation
            }
            
            TransferFoodData.setFood(foodData);
            $location.path('/foodItem');
        }

        $scope.showMenu = function(menu) {
            if(menu == 'FF Breakfast') showFFBreakfast();
            else if(menu == 'FF Lunch') showFFLunch();
            else if(menu == 'FF Dinner') showFFDinner();
            else if(menu == 'GC Breakfast') showGCBreakfast();
            else if(menu == 'GC Lunch') showGCLunch();
            else if(menu == 'GC Dinner') showGCDinner();
        }

        function showFFBreakfast() {
            $scope.freshFoodBreakfast = true;
            $scope.freshFoodLunch = false;
            $scope.freshFoodDinner = false;
            $scope.gatorCornerBreakfast = false;
            $scope.gatorCornerLunch = false;
            $scope.gatorCornerDinner = false;
        }

        function showFFLunch() {
            $scope.freshFoodBreakfast = false;
            $scope.freshFoodLunch = true;
            $scope.freshFoodDinner = false;
            $scope.gatorCornerBreakfast = false;
            $scope.gatorCornerLunch = false;
            $scope.gatorCornerDinner = false;
        }

        function showFFDinner() {
            $scope.freshFoodBreakfast = false;
            $scope.freshFoodLunch = false;
            $scope.freshFoodDinner = true;
            $scope.gatorCornerBreakfast = false;
            $scope.gatorCornerLunch = false;
            $scope.gatorCornerDinner = false;
        }

        function showGCBreakfast() {
            $scope.freshFoodBreakfast = false;
            $scope.freshFoodLunch = false;
            $scope.freshFoodDinner = false;
            $scope.gatorCornerBreakfast = true;
            $scope.gatorCornerLunch = false;
            $scope.gatorCornerDinner = false;
        }

        function showGCLunch() {
            $scope.freshFoodBreakfast = false;
            $scope.freshFoodLunch = false;
            $scope.freshFoodDinner = false;
            $scope.gatorCornerBreakfast = false;
            $scope.gatorCornerLunch = true;
            $scope.gatorCornerDinner = false;
        }

        function showGCDinner() {
            $scope.freshFoodBreakfast = false;
            $scope.freshFoodLunch = false;
            $scope.freshFoodDinner = false;
            $scope.gatorCornerBreakfast = false;
            $scope.gatorCornerLunch = false;
            $scope.gatorCornerDinner = true;
        }

        function getMenus() {
            //Fresh Food Menus
            $http.get('menus/FFbreakfast.json')
                .then( (res) => {
                    $scope.FFBreakfast = res.data;
                })
                .catch( (err) =>{
                    console.log(err);
                });

            $http.get('menus/FFlunch.json')
                .then( (res) => {
                    $scope.FFLunch = res.data;
                })
                .catch( (err) =>{
                    console.log(err);
                });

            $http.get('menus/FFdinner.json')
                .then( (res) => {
                    $scope.FFDinner = res.data;
                })
                .catch( (err) =>{
                    console.log(err);
                });

            // Gator Corner Menus
            $http.get('menus/GCbreakfast.json')
                .then( (res) => {
                    $scope.GCBreakfast = res.data;
                })
                .catch( (err) =>{
                    console.log(err);
                });

            $http.get('menus/GClunch.json')
                .then( (res) => {
                    $scope.GCLunch = res.data;
                })
                .catch( (err) =>{
                    console.log(err);
                });

            $http.get('menus/GCdinner.json')
                .then( (res) => {
                    $scope.GCDinner = res.data;
                })
                .catch( (err) =>{
                    console.log(err);
                });
        }
    }
]);
gatorEats.controller('WeekMenuController', ['$scope', '$http', 'TransferFoodData', '$location',
    function($scope, $http, TransferFoodData, $location) {
    	$scope.freshFoodBreakfast = true;
    	$scope.freshFoodLunch = false;
    	$scope.freshFoodDinner = false;
    	$scope.gatorCornerBreakfast = false;
    	$scope.gatorCornerLunch = false;
    	$scope.gatorCornerDinner = false;

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
    		// Fresh Food Menus
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
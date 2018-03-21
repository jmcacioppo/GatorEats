gatorEats.controller('WeekMenuController', ['$scope', '$http',
    function($scope, $http) {
    	$scope.freshFoodBreakfast = true;
    	$scope.freshFoodLunch = false;
    	$scope.freshFoodDinner = false;
    	$scope.gatorCornerBreakfast = false;
    	$scope.gatorCornerLunch = false;
    	$scope.gatorCornerDinner = false;

    	$scope.showMenu = function(menu) {
    		console.log(menu);
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
    }
]);
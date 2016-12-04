'use strict';

angular.module('moviecat', [
  'ngRoute',

	'moviecat.movie_detail',
	'moviecat.movie_search',
	'moviecat.movie_list'


]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.otherwise({redirectTo:'/in_theaters/1/'});
}]).controller('NavController',['$scope','$location',function($scope,$location){
		$scope.$location = $location;
		$scope.$watch('$location.path()',function(now){

			var $strArray = now.match("\/([^\/]*?)\/");
			$scope.thisModeName = $strArray[1];
		});
	}]);



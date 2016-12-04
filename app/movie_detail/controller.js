(function(angular){
	'use strict';


	//创建热映模块
	var module = angular.module(
		'moviecat.movie_detail',
		['ngRoute',
		'moviecat.services.http'
		]);

	module.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/detail/:id/', {
				templateUrl: 'movie_detail/view.html',
				controller: 'MovieDetailController'
			});
		}]);

	module.controller('MovieDetailController',
		['$scope','HttpService','$routeParams','$route',
		function($scope,HttpService,$routeParams,$route) {
			$scope.movie={};
			var id = $routeParams.id;
			var apiAddress = 'http://api.douban.com/v2/movie/subject/'+id;

			//初始化时给空
			$scope.loading = true;

			HttpService.jsonp(apiAddress,{},function(data){
				$scope.title=data.title;
				$scope.movie = data;
				$scope.loading = false;
				//$apply的作用是让指定的表达式重新同步
				$scope.$apply('movie');
				//console.log($scope.movie);
			});


		}
	]);


})(angular)

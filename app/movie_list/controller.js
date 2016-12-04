(function(angular){
	'use strict';


	//创建热映模块
	var module = angular.module(
		'moviecat.movie_list',
		['ngRoute',
		'moviecat.services.http',
		//'moviecat.services.pagination'
		]);

	module.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/:category/:page/', {
				templateUrl: 'movie_list/view.html',
				controller: 'MovieListController'
			});
		}]);

	module.controller('MovieListController',
		['$scope','HttpService','$routeParams','$route','$window',
		function($scope,HttpService,$routeParams,$route,$window) {
			var rqAdress = "https://api.douban.com/v2/movie/"+$routeParams.category;

			var count= 5; //每页显示

			var thisPage = parseInt($routeParams.page); //当前页
			var start = (thisPage-1)*count; //当前页开始条数


			$scope.thisPage=thisPage;
			//初始化时给空
			$scope.title='';
			$scope.loading = true;
			$scope.getCasts={};



			HttpService.jsonp(rqAdress,{count:count,start:start,q:$routeParams.q},function(data){
				$scope.title=data.title;
				$scope.totalCount=data.total;
				$scope.totalPages = Math.ceil($scope.totalCount/count);
				$scope.subjects = data.subjects;
				$scope.getCasts=function(cItem){
						var castsStr ='';
					 cItem.forEach(function(item,index){
							castsStr+= index < cItem.length-1 ? item.name+',':item.name;
					 });
					return castsStr;
				}

				$scope.loading = false;
				//$apply的作用是让指定的表达式重新同步
				$scope.$apply('subjects');


				$window.jQuery('#pagination-demo').twbsPagination({
					totalPages: $scope.totalPages,
					visiblePages: 7,
					initiateStartPageClick:false,  //初始化时执行一次分页
					href:true,
					//totalPagesVariable:'sdfsad',
					pageVariable:'/'+$routeParams.category+'/',
					onPageClick: function (event, page) {
						//console.log(1);
						//window.location='https://www.baidu.com/'
						//$route.updateParams();
					}
				});

			});








			//$scope.go=function(page){
			//	if (page >=1 && page <=$scope.totalPages)
			//		$route.updateParams({page:page});
			//};



		}
	]);


})(angular)

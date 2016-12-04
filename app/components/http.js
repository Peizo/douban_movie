'use strict';

(function(angular){
	//an的jsonp请求不支持 callback=fun.a1()  的方式
	var http= angular.module('moviecat.services.http',[]);

	http.service('HttpService',['$window','$document',function($window,$document){
		this.jsonp = function(url,data,callback){

        	//url字符串参数拼接
			var querystring = url.indexOf('?') == -1 ? '?' : '&';
			for(var key in data){
				querystring += key + "=" + data[key] + "&";
			}

			//jsonp随机函数处理
			var fnsuffix =  Math.random().toString().replace('.','');
			var cbFuncName = 'my_json_cb_'+fnsuffix;

			//实现请求url拼接
			querystring += "callback=" + cbFuncName;
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querystring;

			//随机函数挂载
			$window[cbFuncName] = function(data){
				//执行回调
				callback(data);
				//回调后清除追加的节点元素
				$document[0].body.removeChild(scriptElement);
			};


			$document[0].body.appendChild(scriptElement);
		}
	}]);

})(angular);

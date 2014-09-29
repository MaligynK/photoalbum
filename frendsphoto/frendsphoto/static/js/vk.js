app = angular.module('demo', ['ui.bootstrap', 'ngResource', 'ui.router']);

app.config(function($httpProvider){
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
});

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
        .state('album', {
            views: {
                '': {
                    templateUrl: "/static/partials/album.html",
                    controller: ['$scope', '$http',
                        function( $scope,   $http) {

							var text = 30053727;
							console.log('!!!');
							//$(document).ready(function() {
							//	text = $('#linkUser')[0].value;
							//});
							if(/[0-9]+/.test(text)){
								$scope.user = text;
								var path = 'https://api.vk.com/method/photos.getAlbums?owner_id='+$scope.user + '&need_covers=1' + '&callback=JSON_CALLBACK';
								console.log(path);

								var deferred = $q.defer();
									$http.jsonp(path).success(function (data) {
										deferred.resolve(data.response);
										$scope.albums = [];
										$scope.imgs = [];
										$scope.bigImage = [];
										console.log(data);
										$scope.frendName = {name:'test'};
									//	for(var i = 0, lngth = data.response.length; i<lngth; i++){
											$scope.albums = data.response;
									//	}
									
									}).error(function (err) {
										deferred.reject(err);
										console.log('err ',err);
									});


							}

                            
							
                        }
                    ]
                }
            }
        })


});

/*angular.module('demo', []).controller('MainCtrl', function($scope, $http, $q){
'use strict';

	VK.init({
	  apiId: 4565164
	});
	function authInfo(response) {
		console.log('!!!!!');
	  if (response.session) {
		alert('user: '+response.session.mid);
		$scope.userSession = response.session;
		getFrend();
	  } else {
		alert('not auth');
	  }
	}
	
	$scope.VKenter = function (){
			console.log('!2222!');
		VK.Auth.getLoginStatus(authInfo);
	};
	VK.UI.button('login_button');		


	function getFrend () {
		var path = 'https://api.vk.com/method/friends.get?user_id=' + $scope.userSession.mid + '&fields=photo_100&count=30' + '&callback=JSON_CALLBACK';
		var deferred = $q.defer();
			$http.jsonp(path).success(function (data) {
				deferred.resolve(data.response);
				$scope.frends = [];
				for(var i = 0, lngth = data.response.length; i<lngth; i++){
					$scope.frends.push([data.response[i].uid, data.response[i].photo_100, data.response[i].first_name+' '+data.response[i].last_name]);
				}
			}).error(function (err) {
				deferred.reject(err);
				console.log('err ',err);
			});
	};
	
	$scope.showUserAlbom = function (ind){
		var path = 'https://api.vk.com/method/photos.getAlbums?owner_id='+$scope.frends[ind][0] + '&need_covers=1' + '&callback=JSON_CALLBACK';
		$scope.frendName = $scope.frends[ind][2];
		$scope.user = $scope.frends[ind][0];
			var deferred = $q.defer();
				$http.jsonp(path).success(function (data) {
					deferred.resolve(data.response);
					$scope.albums = [];
					$scope.imgs = [];
					$scope.bigImage = [];
					for(var i = 0, lngth = data.response.length; i<lngth; i++){
						$scope.albums.push([data.response[i].aid, data.response[i].title, data.response[i].thumb_src]);
					}
				
				}).error(function (err) {
					deferred.reject(err);
					console.log('err ',err);
				});
	
	};
	
	
	$scope.showAlbum = function (ind){
		getImg($scope.user, $scope.albums[ind][0]);
		$scope.showImage = '';
		$scope.albomName = $scope.albums[ind][1];
	};
	
	$scope.album = function (){
		var text = 30053727;
		console.log('!!!');
		$(document).ready(function() {
			text = $('#linkUser')[0].value;
		});
		if(/[0-9]+/.test(text)){
			$scope.user = text;
			var path = 'https://api.vk.com/method/photos.getAlbums?owner_id='+$scope.user + '&need_covers=1' + '&callback=JSON_CALLBACK';
			console.log(path);

			var deferred = $q.defer();
				$http.jsonp(path).success(function (data) {
					deferred.resolve(data.response);
					$scope.albums = [];
					$scope.imgs = [];
					$scope.bigImage = [];
					console.log(data);
					$scope.frendName = {name:'test'};
				//	for(var i = 0, lngth = data.response.length; i<lngth; i++){
						$scope.albums = data.response;
				//	}
				
				}).error(function (err) {
					deferred.reject(err);
					console.log('err ',err);
				});


		}
	};			


	$scope.show = function (ind){
		$scope.showImage = $scope.bigImage[ind];
	};
	
	function getImg(idUser, idAlbum){
		var path = 'https://api.vk.com/method/photos.get?owner_id='+idUser+'&album_id='+idAlbum + '&callback=JSON_CALLBACK';

		var deferred = $q.defer();
			$http.jsonp(path).success(function (data) {
				deferred.resolve(data.response);
				$scope.imgs = [];
				$scope.bigImage = [];
				for(var i = 0, lngth = data.response.length; i<lngth; i++){
					$scope.imgs.push(data.response[i].src_small);
					$scope.bigImage.push(data.response[i].src_xbig);
				}
			
			}).error(function (err) {
				deferred.reject(err);
				console.log('err ',err);
			});
	
	};
	
});*/
app = angular.module('demo', ['ui.bootstrap', 'ngResource', 'ui.router']);

app.config(function($httpProvider){
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
});




app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider

        .state('enter', {
            views: {
                '': {
                    controller: ['$scope', '$http', '$q',
                        function ($scope, $http, $q) {


                            console.log('!!!!!!!!!!');
                            /*location.href='https://oauth.vk.com/authorize?client_id=4565164&scope=friends&redirect_uri=https://192.168.0.130:8080/vk_login/&response_type=token&display=popup';
                            VK.init({
			                    apiId: 4565164
			                });
                            VK.Auth.getLoginStatus(authInfo);
                            function authInfo(response) {
                                if (response.session) {
                                    $scope.userSession = response.session;
                                    console.log('!!!!', $scope.userSession);
                                } else {
                                    alert('not auth');
                                }
                            }*/





                            popup = window.open('https://oauth.vk.com/authorize?client_id=4565164&scope=friends&redirect_uri=https://192.168.0.130:8080/blank.html&response_type=token', 'Авторизация', "height=300, width=700, top=300, left=300, scrollbars=1")
                         //   popup.document.write('12321')
                         //   popup.location.assign('https://oauth.vk.com/authorize?client_id=4565164&scope=friends&redirect_uri=https://oauth.vk.com/blank.html&response_type=token&display=popup');

                            $scope.$watch(function () {
                                console.log('00');
                                return popup.location;
                            },
                            function(newVal, oldVal) {
                                if(newVal === true)
                                    console.log('1 ',popup.location.toString());
                                //$scope.isCollapsed = newVal;
                            }, true);


                          /*  var path = 'https://oauth.vk.com/authorize?client_id=4565164&scope=friends&redirect_uri=https://192.168.0.130:8080/vklogin/&response_type=code&display=popup';
                            var deferred = $q.defer();

                                $http({method: 'GET', url: path, withCredentials: true})
                                  .success(function(data, status, headers, config) {
                                    // this callback will be called asynchronously
                                    deferred.resolve(data);
                                    console.log('!!!');
                                    // when the response is available
                                  })
                                  .error(function(data, status, headers, config) {
                                    // called asynchronously if an error occurs
                                    deferred.reject(data);
                                    // or server returns response with an error status.
                                  });
                           /* 	$http.jsonp(path).success(function (data) {
                                    console.log('!!!');
                                    deferred.resolve(data);
                                }).error(function (err) {
                                    deferred.reject(err);
                                    console.log('err ',err);
                                });*/

                        }
                    ]
                }
            }
        })



        .state('album', {
            views: {
                '': {
                    templateUrl: "/static/partials/album.html",
                    controller: ['$scope', '$http', '$q',
                        function($scope,   $http, $q) {

							var text = 30053727;
							//$(document).ready(function() {
							//	text = $('#linkUser')[0].value;
							//});
							if(/[0-9]+/.test(text)){
								$scope.user = text;

								var path = 'https://api.vk.com/method/photos.getAlbums?owner_id='+$scope.user + '&need_covers=1' + '&callback=JSON_CALLBACK';
								var deferred = $q.defer();
									$http.jsonp(path).success(function (data) {
										deferred.resolve(data.response);
										$scope.albums = [];
										$scope.imgs = [];
										$scope.bigImage = [];
										console.log(data);
										$scope.frendName = 'test';
										$scope.albums = data.response;

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
        .state('album.show', {
            url: '/:albId',
            views: {
                '': {
                    templateUrl: "/static/partials/albumShow.html",
                    controller: ['$scope', '$http', '$q', '$stateParams',
                        function($scope, $http, $q, $stateParams) {
                            var index;
                            for(var i= 0, lngth = $scope.albums.length; i < lngth; i++){
                                if($scope.albums[i].aid == $stateParams.albId){
                                    index = i;
                                    break;
                                }

                            }

                            $scope.albName = $scope.albums[index].title;

				            $scope.showImage = '';
                            console.log();
                        	var path = 'https://api.vk.com/method/photos.get?owner_id='+ $scope.user +'&album_id='+ $stateParams.albId + '&callback=JSON_CALLBACK';
                            console.log(path);
                            var deferred = $q.defer();
                                $http.jsonp(path).success(function (data) {
                                    deferred.resolve(data.response);
                                    console.log(data);
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
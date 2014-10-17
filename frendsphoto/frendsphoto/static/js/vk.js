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
                    controller: ['$scope', '$http', '$q', '$window', '$interval',
                        function ($scope, $http, $q, $window, $interval) {

                            popup = $window.open('http://www.odnoklassniki.ru/oauth/authorize?client_id=1105229312&scope=VALUABLE_ACCESS;PHOTO_CONTENT&response_type=token&redirect_uri=http://192.168.0.130:8080/callback.html&layout=w', 'Авторизация', "height=380, width=700, top=300, left=300, scrollbars=1")


                            var getAlbums = function () {





                            }


                            var receiveMessage = function (event){
                                $interval.cancel(messageTimer);
                                popup.close();
                                if(event.data.indexOf('access_token')){

                                    $scope.sessionSettings = event.data.split(/=|&/);
                                    $scope.sessionSettings[0] = 'CBAHHBOCEBABABABA';

                                 //   var sig = hex_md5('application_key=' + $scope.sessionSettings[0] + 'method=photos.getAlbums' + $scope.sessionSettings[3]);
                                  /*  var sig = hex_md5('application_key=' + $scope.sessionSettings[0] +
                                                        'method=users.getCurrentUser' +
                                                        $scope.sessionSettings[3]);*/
                                    getAlbums();
                                //    var path = 'http://api.odnoklassniki.ru/fb.do?application_key=' + $scope.sessionSettings[0] + '&method=photos.getAlbums&access_token=' + $scope.sessionSettings[1] + '&sig=' + sig;
                                 /*   var path = 'http://api.odnoklassniki.ru/fb.do?application_key=' + $scope.sessionSettings[0] +
                                                '&method=users.getCurrentUser' +
                                                '&access_token=' + $scope.sessionSettings[1] +
                                                '&sig=' + sig;*/

                        /*                var deferred = $q.defer();
                                        $http.jsonp(path).success(function (data) {
                                            if (data.response) {
                                                console.log(data.response);
                                            } else {
                                                console.log('Error', data);
                                            }

                                            deferred.resolve(data);

                                        }).error(function (data, status, headers, config) {
                                            console.log('err ', data);
                                            deferred.reject(data);
                                        });*/



                                }
                            }
                            $window.addEventListener("message", receiveMessage, false);


                             var messageTimer = $interval(function(){
                                popup.postMessage({}, 'http://192.168.0.130:8080/');
                            }, 100)

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
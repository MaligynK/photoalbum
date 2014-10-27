/**
 * Created by worker on 27.10.2014.
 */
app = angular.module('demo2', ['ui.bootstrap', 'ngRoute', 'ngResource', 'ui.router']);

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


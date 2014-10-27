app = angular.module('demo', ['ui.bootstrap', 'ngRoute', 'ngResource', 'ui.router']);

app.config(function($httpProvider){
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
});



app.config(function($stateProvider, $routeProvider){

/*    $routeProvider
        .when('/index.html/photo:data?',
        {

                    controller: ['$scope', '$http', '$q', '$window', '$interval', '$location',
                        function ($scope, $http, $q, $window, $interval, $location) {
                            console.log('!@!!!');
                        }
                    ]

          //  templateUrl: '/static/app/partials/homeProfile.html'
        })*/

    $stateProvider

        .state('enter', {
            views: {
                '': {
                    templateUrl: "/static/partials/info.html",
                    controller: ['$scope', '$http', '$q', '$window', '$interval', '$rootScope',
                        function ($scope, $http, $q, $window, $interval, $rootScope) {

                            popup = $window.open('http://www.odnoklassniki.ru/oauth/authorize?client_id=1105229312&scope=VALUABLE_ACCESS;PHOTO_CONTENT&response_type=token&redirect_uri=http://192.168.0.119:8080/callback.html&layout=w', 'Авторизация', "height=380, width=700, top=300, left=300, scrollbars=1")



                            var receiveMessage = function (event){
                                $interval.cancel(messageTimer);
                                popup.close();
                                if(event.data.indexOf('access_token')){

                                    $scope.sessionSettings = event.data.split(/=|&/);

                                    $scope.sessionSettings[0] = 'CBAHHBOCEBABABABA';
                                 //   var sig = hex_md5('application_key=' + $scope.sessionSettings[0] + 'method=photos.getAlbums' + $scope.sessionSettings[3]);
                                    var sig = hex_md5('application_key=' + $scope.sessionSettings[0] +
                                                        'method=users.getCurrentUser' +
                                                        $scope.sessionSettings[3]);



                                    $http.get('/info/' + $scope.sessionSettings[0] + '/'
                                                    + $scope.sessionSettings[1] + '/'
                                                    + $scope.sessionSettings[3] + '/'
                                                    + sig + '/')
                                        .success(function(data) {

                                            $scope.user = data;
                                            console.log('yes',$scope.user);
                                    })  .error(function(data, status, headers, config) {
                                            console.log('err',data);
                                    })




                                //    var path = 'http://api.odnoklassniki.ru/fb.do?application_key=' + $scope.sessionSettings[0] + '&method=photos.getAlbums&access_token=' + $scope.sessionSettings[1] + '&sig=' + sig;
                                 /*   var path = 'http://api.odnoklassniki.ru/fb.do?application_key=' + $scope.sessionSettings[0] +
                                                '&method=users.getCurrentUser' +
                                                '&access_token=' + $scope.sessionSettings[1] +
                                                '&sig=' + sig ;

                                        var deferred = $q.defer();
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
                                        });
                            /*        var a = '?api_server=http://api.odnoklassniki.ru&apiconnection=CBAHHBOCEBABABABA&web_server=http://192.168.0.119:8080/';


                                    window.location.href = 'http://192.168.0.119:8080/index.html/photo' +
                                                                '?api_server=http://api.odnoklassniki.ru' +
                                                                '&apiconnection=' + '1105229312' +
                                                                '&web_server=http://192.168.0.119:8080/' +
                                                                '&application_key=' + $scope.sessionSettings[0] +
                                                                '&session_key=' + $scope.sessionSettings[1] +
                                                                '&session_secret_key=' + $scope.sessionSettings[3];
                                    console.log('111', window.location);


                               /*     var url = 'http://192.168.0.119:8080/index.html' +
                                                                '?api_server=http://api.odnoklassniki.ru/' +
                                                                '&apiconnection=' + $scope.sessionSettings[0] +
                                                                '&web_server=http://192.168.0.119:8080/' +
                                                                '&application_key=' +  '1105229312' +
                                                                '&session_key=' + $scope.sessionSettings[1] +
                                                                '&session_secret_key=' + $scope.sessionSettings[3];

                                  //  window.history.pushState(null, null, url);

                                //    $location.url(url);
                                 //   $location.path('/test');
                                  //  $location.search('apiconnection', $scope.sessionSettings[0]);
                                   // $location.search('web_server', 'http://192.168.0.119:8080/');
                                   // $location.replace();
                              /*      var rParams = FAPI.Util.getRequestParameters();
                                    console.log($urlRouterProvider);
                                    console.log(window.location);
                                 /*   FAPI.init(rParams["api_server"], rParams["apiconnection"],
                                          function() {
                                              alert("Инициализация прошла успешно");
                                              // здесь можно вызывать методы API
                                          },
                                          function(error) {
                                              alert("неа");
                                              console.log(error);
                                          }
                                    );

                                /*    FAPI.Client.initialize();

                                     // Sample function to getUserInfo
                                    FAPI.Client.apiServer = 'api.odnoklassniki.ru';
                                    FAPI.Client.baseUrl = 'fb.do';
                                    FAPI.Client.applicationKey = $scope.sessionSettings[0];
                                    console.log('!!!!!!!!!', FAPI);
                                     methodParams = {"method":"users.getCurrentUser", 'access_token': $scope.sessionSettings[1]};

                                      FAPI.Client.call( methodParams, function(status, data, error){
                                          if (status=="ok"){
                                              console.log("Current user info : ",data[0]);
                                          } else{
                                              console.log("ERROR : " +error.error_msg+"("+error.error_code+")");
                                          }
                                      });*/



                                }
                            }
                            $window.addEventListener("message", receiveMessage, false);


                             var messageTimer = $interval(function(){
                                popup.postMessage({}, 'http://192.168.0.119:8080/');
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


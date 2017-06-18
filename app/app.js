angular.module('tampico',
    [
        'ui.bootstrap',
        'ui.utils',
        'ui.router',
        'ngAnimate',
        "ngSanitize",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",
        "com.2fdevs.videogular.plugins.overlayplay",
        "com.2fdevs.videogular.plugins.poster"
    ]);

angular.module('tampico').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    /*$locationProvider.html5Mode({
     enabled: true,
     requireBase: false
     });*/

    $stateProvider.state('app', {
        url: '/',
        abstract: true,
        views: {
            'panel': {
                templateUrl: 'partial/panel//panel.html'
            }
        }
    });

    $stateProvider.state('app.loader', {
        url: '',
        parent: 'app',
        views: {
            '@': {
                templateUrl: 'partial/loader//loader.html'
            }
        }
    });

    $stateProvider.state('app.home', {
        url: 'home',
        parent: 'app',
        views: {
            '@': {
                templateUrl: 'partial/home//home.html'
            }
        }
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/');

});

angular.module('tampico').run(function ($rootScope) {

    $rootScope.safeApply = function (fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

angular.module('tampico').controller('MainCtrl', function ($scope, $state) {
    $scope.panel = {
        showPanel: function () {
            $('.contPanel').css('right', '0px');
        },
        closePanel: function () {
            var width = $(window).width();
            if (width <= 800) {
                $('.contPanel').css('right', '-100%');
            } else {
                $('.contPanel').css('right', '-300px');
            }
            $(window).resize(function () {
                var width = $(window).width();
                if (width <= 800) {
                    $('.contPanel').css('right', '-100%');
                } else {
                    $('.contPanel').css('right', '-300px');
                }
            });
        }
    };

    $scope.slideTab = {
        goTo: function (block) {
            $scope.panel.closePanel();
            setTimeout(function () {
                $("html,body").animate({scrollTop: $(block).offset().top}, 1200);
            }, 100)
        }
    };

    $scope.currentState = 1;
    $scope.state = {
        goState: function (next) {
            var self = this;
            if (next == 1) {
                self.goHome();
            }
            if ($scope.currentState == 1 && next == 2) {
                self.homeGoAbout();
            }
            if ($scope.currentState == 1 && next == 3) {
                self.homeGoPresentation();
            }
            if ($scope.currentState == 2 && next == 3) {
                self.aboutGoPresentation();
            }
            if (($scope.currentState == 3 || $scope.currentState == 4) && next == 2) {
                self.presentationGoAbout();
            }
            $scope.panel.closePanel();
        },
        goHome: function () {
            $('.contHome').css('top', '0px');
            $scope.currentState = 1;
        },
        homeGoAbout: function () {
            $('.contHome').css('top', '-100%');
            $('#column1').css('top', '0%');
            $('#column2').css('top', '-200%');
            $scope.currentState = 2;
        },
        homeGoPresentation: function () {
            $('.contHome').css('top', '-100%');
            $('#column1').css('top', '-100%');
            $('#column2').css('top', '-100%');
            $scope.currentState = 3;
            $('.slide4').css('background-color','transparent');
            $('.slide3').css('background-color','white');
        },
        presentationGoAbout: function () {
            $('#column1').css('top', '0%');
            $('#column2').css('top', '-200%');
            $scope.currentState = 2;
        },
        aboutGoPresentation: function () {
            $('#column1').css('top', '-100%');
            $('#column2').css('top', '-100%');
            $scope.currentState = 3;
            $('.slide4').css('background-color','transparent');
            $('.slide3').css('background-color','white');
        },
        item1GoItem2: function () {
            $('#column1').css('top', '-200%');
            $('#column2').css('top', '0');
            $scope.currentState = 4;
            $('.slide3').css('background-color','transparent');
            $('.slide4').css('background-color','white');
        },
        item2GoItem1: function () {
            this.aboutGoPresentation();
        }
    };

    $scope.scrollEvent = {
        init: function () {
            this.scroll();
        },
        scroll: function () {
            $('.wrapper').bind('mousewheel', function (e) {
                if ($scope.currentState == 3 || $scope.currentState == 4) {
                    if (e.originalEvent.wheelDelta / 120 > 0) {
                        $scope.state.item2GoItem1();
                    }
                    else {
                        $scope.state.item1GoItem2();
                    }
                }
            });
        }
    };
    $scope.scrollEvent.init();

    $scope.testSpeed = {
        solve: function () {

        }
    }

});

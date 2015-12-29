angular.module('starter', ['ionic','ngCordova','chart.js','ionic-datepicker','ionic-timepicker','starter.controllers','starter.services'])

  .constant('API_SERVER', appConfigs.API_SERVER)

  .constant('$ionicLoadingConfig', {template: '<ion-spinner icon="spiral"></ion-spinner>'})

  .run(function($http,$rootScope,$state,$ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
           cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
           cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
  })

  .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state('chart', {
            url: '/chart',
            templateUrl: 'templates/chart.html'
        })

        .state('shipment', {
            url: '/shipment',
            templateUrl: 'templates/shipment.html'
        })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/shipment');

    })

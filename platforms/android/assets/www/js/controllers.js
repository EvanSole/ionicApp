angular.module('starter.controllers', [])

.constant('$ionicLoadingConfig', {
    template: '<ion-spinner icon="spiral"></ion-spinner>'
})

.controller('AppCtrl', function($scope,$rootScope,$ionicModal,$timeout,$ionicLoading,$ionicLoadingConfig,LoginService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    console.log('Doing login', $scope.loginData);
    var usr = $scope.loginData.username;
    var pwd = $scope.loginData.password;
    if(!usr || !pwd) {
        $scope.loginMessage = "Invalid Username or password!";
        return false;
    }

    var result = LoginService.login(usr, pwd);

    $ionicLoading.show($ionicLoadingConfig);

    $timeout(function() {
      $ionicLoading.hide();
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CardCtrl',function($scope,Cards){
    $scope.cards = Cards.all();
    $scope.remove = function(card){
       Cards.remove(card);
    };
    $scope.edit = function(card){
        Cards.edit(card);
    };
})

.controller('CardDetailCtrl', function($scope, $stateParams, Cards) {
     $scope.card = Cards.get($stateParams.cardId);
     $scope.edit = function(card){

     }

})

.controller('FavoriteCtrl', function($scope, $stateParams) {
   console.log('FavoriteCtrl');

})

.controller('SettingCtrl', function($scope, $stateParams) {
   console.log('SettingCtrl');

})

.controller('ItemCtrl', function($scope,ItemService) {
    $scope.items = [];

    ItemService.GetFeed().then(function(items){
        $scope.items = items;
    });

    $scope.doRefresh = function() {
        //方式一下拉加载
        ItemService.GetNewUser().then(function(items){
            $scope.items = items.concat($scope.items);
        });
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

        //方式二上拉加载
        ItemService.GetNewUser().then(function(items){
            $scope.items.push($scope.items);
        });
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

})

.controller('UpLoad',function($scope,$cordovaImagePicker){

    $scope.images_list = [];

    // "添加附件"Event
    $scope.addAttachment = function() {
        nonePopover();
        $ionicActionSheet.show({
            buttons: [
                { text: '相机' },
                { text: '图库' }
            ],
            cancelText: '关闭',
            cancel: function() {
                return true;
            },
            buttonClicked: function(index) {
                switch (index){
                    case 0:appendByCamera();
                        break;
                    case 1:pickImage();
                        break;
                    default:
                        break;
                }
                return true;
            }
        });
    }

    $scope.pickImage = function(){
        var options = {
            maximumImagesCount: 1,
            width: 800,
            height: 800,
            quality: 80
        };
        $cordovaImagePicker.getPictures(options)
        .then(function (results) {
            $scope.images_list.push(results[0]);
        }, function (error) {
            // error getting photos
        });
    }

})


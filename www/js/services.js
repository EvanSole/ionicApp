angular.module('starter.services', [])

    .factory('ChartService',function($http,$ionicPopup,$ionicLoading,$timeout,API_SERVER) {
        var items ;
        return {
            GetDay:function(){
                console.log("GetDay...");
                return $http.get(API_SERVER+'/day').then(function(response){
                    items = eval('(' + response.data.result + ')');
                    return items;
                },function(error){
                    fail();
                    return false;
                });
            },
            GetWeek:function(){
                console.log("GetWeek...");
                return $http.get(API_SERVER+'/week').then(function(response){
                    items = eval('(' + response.data.result + ')');
                    return items;
                },function(error){
                    fail();
                    return;
                });
            },
            GetMonth:function(){
                console.log("GetMonth...");
                return $http.get(API_SERVER+'/month').then(function(response){
                    items = eval('(' + response.data.result + ')');
                    //items = monthDate;
                    return items;
                },function(error){
                    fail();
                    return;
                });
            },
            GetYear:function(){
                console.log("GetYear...");
                return $http.get(API_SERVER+'/year').then(function(response){
                    items = eval('(' + response.data.result + ')');
                    return items;
                },function(error){
                    fail();
                });
            }
        }

        function fail() {
            $ionicLoading.show({
                template: '服务无法访问，请稍后再试...'
            });
            $timeout($ionicLoading.hide, 2000);
        }
    })

    .factory('ShipmentService', function($http,$ionicPopup,$ionicLoading,$timeout,API_SERVER) {
        return {
            shipmentReport: function (warehouseNo,startTime,endTime) {
                return $http.get(API_SERVER + '/shipment/'+warehouseNo+'?startTime='+startTime+'&endTime='+endTime).then(function (response) {
                    var items = eval('(' + response.data.result + ')');
                    return items;
                }, function (error) {
                    fail();
                    return false;
                });
            },
            getWareHouse: function(){
                return $http.get(API_SERVER + '/warehouse').then(function (response) {
                    var items = eval('(' + response.data.result + ')');
                    return items;
                }, function (error) {
                    fail();
                    return false;
                });
            }
        }

        function fail() {
            $ionicLoading.show({
                template: '服务无法访问，请稍后再试...'
            });
            $timeout($ionicLoading.hide, 2000);
        }
    })




angular.module('starter.controllers', ['starter.services'])
    // Optional configuration
    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            colours: ['#49c7e0', '#f887a0', '#33b69a', '#fbb43b', '#b67ffa', '#49c7e0', '#4D5360'],
            responsive: true
        });
        // Configure all line charts
        ChartJsProvider.setOptions('Line', {
            datasetFill: false
        });
    }])

    .controller('ChartCtrl', function($scope,$timeout,$ionicLoading,$state,ChartService) {

        $ionicLoading.show();

        //init loading GetDay
        ChartService.GetDay().then(function(items){
            if(items) {
                successParamVal(items);
            }else{
                fail();
            }
        });

        /***
         * 下拉刷新列表
         */
        $scope.doRefresh = function() {
            location.reload();
            $scope.$broadcast('scroll.refreshComplete');
        }

        $scope.doGetChartData = function(index,obj){
            $ionicLoading.show();
            if(index===0){
                bg_color(obj);
                ChartService.GetDay().then(function(items){
                    if(items) {
                        successParamVal(items);
                    }else{
                        fail();
                    }
                });
            }
            if(index===1){
                 bg_color(obj);
                ChartService.GetWeek().then(function(items){
                    if(items) {
                        successParamVal(items);
                    }else{
                       fail();
                    }
                });
            }
            if(index===2){
                bg_color(obj);
                ChartService.GetMonth().then(function(items){
                    if(items) {
                        successParamVal(items);
                    }else{
                        fail();
                    }
                });
            }
            if(index===3){
                bg_color(obj);
                ChartService.GetYear().then(function(items){
                    if(items) {
                        successParamVal(items);
                    }else{
                        fail();
                    }
                });
            }
            hideLoading();
        }

        $scope.onHover = function (points) {

        };

        $scope.onDragRight = function(){
            console.log('onDragRight....');
        }

        $scope.onDragLeft = function(){
            console.log('onDragLeft....');
        }

        hideLoading();

        //设置tab高亮显示
        function bg_color(obj){
            var childrens = obj.toElement.parentNode.children;
            for(var i=0; i<childrens.length;i++){
                childrens[i].className =" button button-light button_light_tab";
            };
            obj.currentTarget.className +=" selected";
        }

        function fail() {
            $scope.labels = [0];
            $scope.inbData = [[0],[0]];
            $scope.oubData = [[0],[0]];
            $scope.onHandData = [[0],[0]];
            $scope.series_inb = ["上海仓","广州仓"];
            $scope.series_oub = ["上海仓","广州仓"];
            $scope.series_onHand  = ["上海仓","广州仓"];
            $scope.inbTotal = 0;
            $scope.oubTotal = 0;
            $scope.onHandTotal = 0;
            $ionicLoading.show({
                template: '数据加载失败，请稍后再试...'
            });
            hideLoading();
        }

        function hideLoading(){
            $timeout($ionicLoading.hide, 1500);
        }

        function successParamVal(items){
            var arrayObj = items.series;
            var inb = new Array(arrayObj.length);
            var oub = new Array(arrayObj.length);
            var onHand = new Array(arrayObj.length);
            var inbCount = 0;
            var oubCount = 0;
            var onHandCount = 0;
            for(var i=0; i<arrayObj.length;i++){
                inb[i] = arrayObj[i] + "["+items.inbTotal[i]+"]";
                oub[i] = arrayObj[i] + "["+items.oubTotal[i]+"]";
                onHand[i] = arrayObj[i] +"["+ items.onHandTotal[i]+"]";
                inbCount += items.inbTotal[i];
                oubCount += items.oubTotal[i];
                onHandCount += items.onHandTotal[i];
            }
            $scope.labels = items.labels;
            $scope.series_inb = inb;
            $scope.series_oub = oub;
            $scope.series_onHand  = onHand;
            $scope.inbData = items.inbData;
            $scope.oubData = items.oubData;
            $scope.onHandData = items.onHandData;
            $scope.inbTotal = inbCount;
            $scope.oubTotal = oubCount;
            $scope.onHandTotal = onHandCount;
        }

    })

    .controller('ShipmentCtrl', function($scope,$timeout,$ionicLoading,$state,ShipmentService) {

        var disabledDates = [new Date(1437719836326),
            new Date(),
            new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
            new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
            new Date("2015-01-01"), //Short format
            new Date(1439676000000) //UNIX format
        ];

        var weekDaysList = ["六","日","一", "二", "三", "四", "五"];

        var monthList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];


        $scope.datepickerObjectStart =  {
                titleLabel: '选择日期',  //Optional
                todayLabel: '今 天',  //Optional
                closeLabel: '关 闭',  //Optional
                setLabel: '确 认',  //Optional
                setButtonType : 'button-calm',  //Optional
                todayButtonType : 'button button-outline button-calm',  //Optional
                closeButtonType : 'button-calm',  //Optional
                inputDate: new Date(new Date()-24*60*60*1000),    //Optional
                mondayFirst: true,    //Optional
                disabledDates: disabledDates, //Optional
                weekDaysList: weekDaysList,   //Optional
                monthList: monthList, //Optional
                templateType: 'modal', //Optional   modal&popup
                showTodayButton: 'true', //Optional
                modalHeaderColor: 'bar-calm', //Optional
                modalFooterColor: 'bar-calm', //Optional
                from: new Date(2005, 01, 01),   //Optional
                to: new Date(2030, 12, 30),    //Optional
                callback: function (val) {    //Mandatory
                    datepickerCallbackStart(val);
                }
        };

        $scope.datepickerObjectEnd =  {
            titleLabel: '选择日期',  //Optional
            todayLabel: '今 天',  //Optional
            closeLabel: '关 闭',  //Optional
            setLabel: '确 认',  //Optional
            setButtonType : 'button-calm',  //Optional
            todayButtonType : 'button button-outline button-calm',  //Optional
            closeButtonType : 'button-calm',  //Optional
            inputDate: new Date(),    //Optional
            mondayFirst: true,    //Optional
            disabledDates: disabledDates, //Optional
            weekDaysList: weekDaysList,   //Optional
            monthList: monthList, //Optional
            templateType: 'modal', //Optional   modal&popup
            showTodayButton: 'true', //Optional
            modalHeaderColor: 'bar-calm', //Optional
            modalFooterColor: 'bar-calm', //Optional
            from: new Date(2005, 01, 01),   //Optional
            to: new Date(2030, 12, 30),    //Optional
            callback: function (val) {    //Mandatory
                datepickerCallbackEnd(val);
            }
        };


        var datepickerCallbackStart = function (val) {
            if (typeof(val) === 'undefined') {
            } else {
                $scope.startDate = formatDate(val);
            }
        };

        var datepickerCallbackEnd = function (val) {
            if (typeof(val) === 'undefined') {
            } else {
                $scope.endDate = formatDate(val);
            }
        };



        $scope.timePickerObjectStart = {
            inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
            step: 15,  //Optional
            format: 24,  //Optional
            titleLabel: '选择时间',  //Optional
            setLabel: '确定',  //Optional
            closeLabel: '关闭',  //Optional
            setButtonType: 'button button-clear button-calm',  //Optional
            closeButtonType: 'button button-clear button-calm',  //Optional
            callback: function (val) {    //Mandatory
                timePickerCallbackStart(val);
            }
        };

       function timePickerCallbackStart(val) {
            if (typeof (val) === 'undefined') {
            } else {
                $scope.startTime = formatTime(val);
            }
        }

        $scope.timePickerObjectEnd = {
            inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
            step: 15,  //Optional
            format: 24,  //Optional
            titleLabel: '选择时间',  //Optional
            setLabel: '确定',  //Optional
            closeLabel: '关闭',  //Optional
            setButtonType: 'button button-clear button-calm',  //Optional
            closeButtonType: 'button button-clear button-calm',  //Optional
            callback: function (val) {    //Mandatory
                timePickerCallbackEnd(val);
            }
        };

       function timePickerCallbackEnd(val) {
            if (typeof (val) === 'undefined') {
            } else {
                $scope.endTime = formatTime(val);
            }
       }



        $scope.barlabels = ['天猫', '京东', '唯品会', '苏宁易购', '聚美优品', '淘宝'];

        $ionicLoading.show();


        //初始化
        shipmentInit($scope,ShipmentService);

        //查询
        $scope.searchShipmentReport = function() {
            var warehouseNo = $scope.$$childHead.warehouseNo;
            var startDate = $scope.$$childHead.startDate;
            var startTime = $scope.$$childHead.startTime;
            var endDate = $scope.$$childHead.endDate;
            var endTime = $scope.$$childHead.endTime;
            var startDateTime = "",endDateTime = "";
            if (typeof (startDate) != 'undefined') {
                startDateTime += startDate;
            }
            if (typeof (startTime) != 'undefined') {
                startDateTime += " " + startTime;
            }
            if (typeof (endDate) != 'undefined') {
                endDateTime += endDate;
            }
            if (typeof (endTime) != 'undefined') {
                endDateTime += " " + endTime;
            }
            ShipmentService.shipmentReport(warehouseNo,startDateTime,endDateTime).then(function(items){
                if(items) {
                    $scope.barseries = new Array(items.series);
                    $scope.bardata = new Array(items.data);
                }else{
                    fail();
                }
            });
        }

        hideLoading();

        function fail() {
            $scope.barlabels = ['天猫', '京东', '唯品会', '苏宁易购', '聚美优品', '淘宝'];
            $scope.bardata = [[0,0,0,0,0,0]];
            $scope.barseries = ["华东"];
            $ionicLoading.show({
                template: '数据加载失败，请稍后再试...'
            });
            hideLoading();
        }
        function hideLoading(){
            $timeout($ionicLoading.hide, 1500);
        }

        //初始化加载 默认华东
        function shipmentInit($scope,ShipmentService){
            $scope.startDate = formatDate($scope.datepickerObjectStart.inputDate);
            $scope.startTime = "17:00";//formatTime($scope.timePickerObjectStart.inputEpochTime);
            $scope.endDate = formatDate($scope.datepickerObjectEnd.inputDate);
            $scope.endTime = "17:00";//formatTime($scope.timePickerObjectEnd.inputEpochTime);
            $scope.warehouseNo = "HD";
            var startDateTime = $scope.startDate+" "+$scope.startTime,endDateTime = $scope.endDate+" "+$scope.endTime;
            //init loading shipmentReport
            ShipmentService.shipmentReport($scope.warehouseNo,startDateTime,endDateTime).then(function(items){
                if(items) {
                    $scope.barseries = new Array(items.series);
                    $scope.bardata = new Array(items.data);
                }else{
                    fail();
                }
            });
        }

        function formatDate(val) {
            var date = new Date(val);
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate());
        }

        function formatTime(val) {
            var selectedTime = new Date(val * 1000);
            return selectedTime.getUTCHours() + ':' + (selectedTime.getUTCMinutes()>= 10 ? selectedTime.getUTCMinutes() : "0"+selectedTime.getUTCMinutes());
        }

    })
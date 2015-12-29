angular.module('starter.services', [])

.factory('Cards', function() {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var cards = [{
    id: 0,
    title: 'Spring',
    describe: 'You on your way?',
    face: 'img/spring.png'
  }, {
    id: 1,
    title: 'Summer',
    describe: 'Hey, it\'s me',
    face: 'img/summer.png'
  }, {
    id: 2,
    title: 'Autumn',
    describe: 'I should buy a boat',
    face: 'img/autumn.png'
  }, {
      id: 3,
      title: 'Winter',
      describe: 'What\'s your favorite season?',
      face: 'img/winter.png'
  }
  ];

  return {
    all: function() {
      return cards;
    },
    remove: function(card) {
      cards.splice(cards.indexOf(card), 1);
    },
    get: function(cardId) {
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].id === parseInt(cardId)) {
          return cards[i];
        }
      }
      return null;
    },
    edit: function (card) {
        console.log('Edit card');
    }
  };
})

.service('LoginService',function(){
    return {
        login: function(usr,pwd) {
            console.log('login time:'+ new Date().getTime());
            return null;
        }
    };
})

.service('ItemService',function($http){
    var BASE_URL = "http://api.randomuser.me/";
    var items = [];
    return {
        GetFeed: function(){
            return $http.get(BASE_URL+'?results=10').then(function(response){
                console.log("GetFeed...");
                items = response.data.results;
                return items;
            });
        },
        GetNewUser: function(){
            return $http.get(BASE_URL).then(function(response){
                items = response.data.results;
                console.log("GetNewUser...");
                return items;
            });
        }
    }
})
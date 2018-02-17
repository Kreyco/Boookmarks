( function () {
    "use strict"

    var  app = angular.module('Bookmarks',[
        //Dependencies here
    ])

    .controller( 'MainController', function( $scope ) {
        //Example app
        $scope.name = 'Jhon Doe';

        //Bookmarks app
        $scope.userName = 'Will';
        $scope.categories = [ 'HTML','JavaScript','CSS', 'Games' ];

        $scope.bookmarks = [ //<--- Adding the data
            {id:1,name:'Quizzpot.com',url:'https://quizzpot.com',category:'JavaScript'},
            {id:2,name:'Html5 Game Devs',url:'https://html5gamedevs.com',category:'Games'},
            {id:3,name:'CSS Tricks',url:'http://css-tricks.com',category:'CSS'},
            {id:4,name:'Bootstrap',url:'http://getbootstrap.com',category:'CSS'},
            {id:5,name:'Card',url:'http://jessepollak.github.io/card/',category:'JavaScript'}
        ];

        $scope.currentCategory = undefined;

        $scope.setCurrentCategory = function( category ) {
            $scope.currentCategory = category;
        };
        $scope.isCurrentCategory = function( category ) {
            return $scope.currentCategory === category;
        };
        $scope.save = function(bookmark){
            console.log(bookmark);
        };
    });
    console.log( app );
})();
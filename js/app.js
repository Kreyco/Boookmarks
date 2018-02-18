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
            {id:1,title:'Quizzpot.com',url:'https://quizzpot.com',category:'JavaScript'},
            {id:2,title:'Html5 Game Devs',url:'https://html5gamedevs.com',category:'Games'},
            {id:3,title:'CSS Tricks',url:'http://css-tricks.com',category:'CSS'},
            {id:4,title:'Bootstrap',url:'http://getbootstrap.com',category:'CSS'},
            {id:5,title:'Card',url:'http://jessepollak.github.io/card/',category:'JavaScript'}
        ];

        $scope.currentCategory = undefined;

        $scope.setCurrentCategory = function( category ) {
            $scope.currentCategory = category;
        };
        $scope.isCurrentCategory = function( category ) {
            return $scope.currentCategory === category;
        };
        $scope.showWindow = function(bookmark){ // Step 1
            $scope.bookmarkForm.$setPristine(); //Step 2
            $scope.bookmarkForm.$setUntouched();

            bookmark = bookmark || {category:$scope.currentCategory,url:''}; //Step 3
            $scope.bookmark = bookmark;
            $('#bookmarkModal').modal('show');  //Step 4
        };
        $scope.save = function(bookmark){
            if($scope.bookmarkForm.$valid){                //Step 1
                if(!bookmark.id){                          //Step 2
                    var record = angular.copy(bookmark);   //Step 3

                    record.id = $scope.bookmarks.length;   //Step 4
                    $scope.bookmarks.push(record);         //Step 5
                }
                $('#bookmarkModal').modal('hide');         //Step 6
            }
        };
        $scope.remove = function(id){                //Step 1
            for(var i=0,len=$scope.bookmarks.length;i<len;i++){ //Step 2
                if($scope.bookmarks[i].id === id){   //Step 3
                    $scope.bookmarks.splice(i,1);    //Step 4
                    break;
                }
            }
        };
    });
    console.log( app );
})();
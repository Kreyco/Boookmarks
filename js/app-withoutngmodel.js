(function () {
    "use strict";

    var app = angular.module('Bookmarks', [
        //Dependencies here
        'ngResource'
    ])
    .service('Category', function ($http) {
        this.getAll = function (success, failure) {
            $http.get('http://bookmarks-angular.herokuapp.com/api/categories')
                .success(success, function () {
                })
                .error(failure, function () {
                });
        };
        this.add = function () { //Por hacer, para crear mas categorias en el servicio JSON
            $http.post('http://bookmarks-angular.herokuapp.com/api/categories')
                .succes(success, function () {
                })
                .error(failure, function () {
                });
        }
    })
    .factory('Bookmark', function ($resource) {
        return $resource('http://bookmarks-angular.herokuapp.com/api/bookmarks/:id', {
            id: '@id'
        }, {
            update: {method: 'PUT'}
        });
    })
    .directive('toggleModal', function () {
        return {
            link: function (scope){
                console.log(scope);
            }
        }
    })
    .directive('bootstrapSelect', function ($parse) {
        return {
            link: function (scope, element, attrs) {
                var collection = attrs.bootstrapSelect,
                    valueProperty = attrs.selectValue,
                    labelProperty = attrs.selectLabel,
                    model = attrs.selectModel,
                    getter = $parse(model),
                    setter = getter.assign;

                $(element).selectpicker();
                console.log('My directive');
                scope.$watch(collection, function (data) {
                    if (data) {
                        $(element)
                            .find('option')
                            .remove();

                        var html = [];
                        $.each(data, function (index, object) {
                            html.push('<option value="' + object[valueProperty] + '">');
                            html.push(object[labelProperty]);
                            html.push('</option>');
                        });
                        $(element).append(html.join(''));
                        $(element).selectpicker('refresh');
                    } else {
                        console.log('data false');
                    }
                });
                scope.$watch(model, function (data) {
                    if (angular.isObject(data)) {
                        $(element).selectpicker('val', data[valueProperty]);
                    }
                });
                $(element).change(function () {
                    var col = scope[collection],
                        val = $(element).val();

                    for (var i = 0, len = col.length; i < len; i++) {
                        if (val == col[i][valueProperty]) {
                            setter(scope, col[i]);
                            break;
                        }
                    }
                });
            }
        }
    })
    .controller('MainController', function ($scope, Category, Bookmark) {
        //Example app
        $scope.name = 'Jhon Doe';

        //Bookmarks app
        $scope.userName = 'Will';
        //$scope.categories = [ 'HTML','JavaScript','CSS', 'Games' ];
        $scope.currentCategory = undefined;

        Category.getAll(function (data) {
            $scope.categories = data.categories;
            $scope.currentCategory = data.categories[0]; //Por si quiero escoger la primer categoria como la actual
            $scope.bookmarks = Bookmark.query();
        });

        /*$scope.bookmarks = [ //<--- Adding the data
            {id:1,title:'Quizzpot.com',url:'https://quizzpot.com',category:'JavaScript'},
            {id:2,title:'Html5 Game Devs',url:'https://html5gamedevs.com',category:'Games'},
            {id:3,title:'CSS Tricks',url:'http://css-tricks.com',category:'CSS'},
            {id:4,title:'Bootstrap',url:'http://getbootstrap.com',category:'CSS'},
            {id:5,title:'Card',url:'http://jessepollak.github.io/card/',category:'JavaScript'}
        ];*/

        $scope.setCurrentCategory = function (category) {
            $scope.currentCategory = category;
        };
        $scope.isCurrentCategory = function (category) {
            if (category === undefined) {
                return $scope.currentCategory === category;
            } else {
                return $scope.currentCategory.id === category.id;
            }
        };
        $scope.showWindow = function (bookmark) {
            $scope.bookmarkForm.$setPristine();
            $scope.bookmarkForm.$setUntouched();

            bookmark = bookmark || {category: $scope.currentCategory, url: ''};
            $scope.bookmark = bookmark;
            $('#bookmarkModal').modal('show');
        };
        $scope.save = function (bookmark) {
            if ($scope.bookmarkForm.$valid) {
                if (!bookmark.id) {
                    var record = new Bookmark(); //Step 1

                    record.title = bookmark.title; //Step 2
                    record.url = bookmark.url;
                    record.category_id = bookmark.category.id;

                    record.$save(function () { //Step 3
                        $scope.bookmarks.push(record); //Step 4
                    });
                } else {
                    bookmark.$update();
                }
                $('#bookmarkModal').modal('hide');
            }
        };
        $scope.remove = function (bookmark) {
            bookmark.$remove(function () {
                for (var i = 0, len = $scope.bookmarks.length; i < len; i++) {
                    if ($scope.bookmarks[i].id === bookmark.id) {
                        $scope.bookmarks.splice(i, 1);
                        break;
                    }
                }
            });
        }


    });

    console.log(app);
})();
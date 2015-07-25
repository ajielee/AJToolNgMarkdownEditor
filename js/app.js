/**
 * Created by Xiaojie LI <ajie.lee@gmail.com>.
 * Date: 2015/07/22
 * Time: 22:51
 */

var markdownEditor = angular.module('markdownEditor', ['hc.marked'])
 .config(['markedProvider', function(markedProvider) {

     // configuration for angular-marked
     markedProvider.setOptions({
         gfm: true,
         tables: true,
         highlight: function (code) {
             return hljs.highlightAuto(code).value;
         }
     });
     markedProvider.setRenderer({
         link: function(href, title, text) {
             return "<a href='" + href + "' title='" + title + "' target='_blank'>" + text + "</a>";
         }
     });

 }]);

// main controller
markdownEditor.controller('mainCtrl', ['$scope', 'marked', function($scope, marked) {

    $scope.showEditor = true;
    $scope.showViewer = false;

    //$scope.showInTwoCol = false;

    (function() {
        // if window's width large than 992px or equal to 992px ('md' in Bootstrap)
        if (992 >= window.innerWidth) {
            $scope.showInTwoCol = false;
        } else {
            $scope.showInTwoCol = true;
        }
        $('textarea').focus();
    })();


    // sets default value for textarea
    $scope.markdownSource = '';
    // updates $scope.markdownDisplay if $scope.markdownSource changes
    $scope.$watch('markdownSource', function() {
        $scope.markdownDisplay = marked($scope.markdownSource);
    });
    $scope.editorOn = function() {
        $scope.showEditor = true;
        $scope.showViewer = false;
    }
    $scope.viewerOn = function() {
        $scope.showEditor = false;
        $scope.showViewer = true;
    }

    $(window).resize(function(){
        // if window's width large than 992px or equal to 992px ('md' in Bootstrap)
        if (992 >= window.innerWidth) {
            $scope.showInTwoCol = false;
            $scope.showEditor = true;
            $scope.showViewer = false;
        } else {
            $scope.showInTwoCol = true;
        }
        $scope.$apply();
    });

}]);
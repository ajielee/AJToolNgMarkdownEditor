/**
 * Created by Xiaojie LI <ajie.lee@gmail.com>.
 * Date: 2015/07/22
 * Time: 22:51
 */

/**
 *  shows "#scrollToTopBtn"
 */
function showScrollToTop() {
    if (!$('#scrollToTopBtn').hasClass('show-scroll-to-top-btn')) {
        $('#scrollToTopBtn').addClass('show-scroll-to-top-btn');
    }
}

/**
 *  hides "#scrollToTopBtn"
 */
function hideScrollToTop() {
    if ($('#scrollToTopBtn').hasClass('show-scroll-to-top-btn')) {
        $('#scrollToTopBtn').removeClass('show-scroll-to-top-btn');
    }
}

/**
 *  function for scrolling page to top
 */
function SrcollToTop() {
    $("body,html").animate({scrollTop: $("body").offset().top - 50}, 500);
}

/**
 *  jquery part begins
 */
$('document').ready(function() {
    // uses jquery-elastic to increase the height of textarea automatically
    $('.text-div').elastic();

    // resize divs
    $('.content-div').css('min-height', $(window).height() - 130 );
    $('.text-div').css('min-height', $(window).height() - 160 );

    //
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
        if (50 < scroll) {
            showScrollToTop();
        } else {
            hideScrollToTop();
        }
    });

    // button for scroll to top
    $('#scrollToTopBtn').click(function(event) {
        event.preventDefault();
        SrcollToTop();
    });

});

/**
 *  Angular part begins
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

    // default value
    $scope.showEditor = true;
    $scope.showViewer = false;

    (function() {
        // if window's width large than 992px or equal to 992px ('md' in Bootstrap)
        if (992 >= window.innerWidth) {
            $scope.showInTwoCol = false;
        } else {
            $scope.showInTwoCol = true;
        }
        $('.text-div').focus();
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

    // when window size changes
    $(window).resize(function(){
        // resize divs
        $('.content-div').css('min-height', $(window).height() - 130 );
        $('.text-div').css('min-height', $(window).height() - 160 );
        // if window's width large than 992px or equal to 992px ('md' in Bootstrap)
        if (992 >= window.innerWidth) {
            if ($scope.showInTwoCol) {
                $scope.showInTwoCol = false;
                $scope.showEditor = true;
                $scope.showViewer = false;
            }
        } else {
            if (!$scope.showInTwoCol) {
                $scope.showInTwoCol = true;
            }
        }
        $scope.$apply();
    });

}]);
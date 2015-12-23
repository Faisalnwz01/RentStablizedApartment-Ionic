'use strict';

angular.module('starter.directives', [])
  .directive('basicCard', function() {
    return {
      templateUrl: 'scripts/basicCard/basicCard.html',
      restrict: 'EA',
      link: function(scope, element, attrs) {}
    };
  })
  .directive('showWhen', ['$window', function($window) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {

        function checkExpose() {
          var mq = $attr.showWhen == 'md' ? '(min-width:600px)' : $attr.showWhen;
          if ($window.matchMedia(mq).matches) {
            $element.removeClass('ng-hide');
          } else {
            $element.addClass('ng-hide');
          }
        }

        function onResize() {
          debouncedCheck();
        }

        var debouncedCheck = ionic.debounce(function() {
          $scope.$apply(function() {
            checkExpose();
          });
        }, 300, false);

        checkExpose();

        ionic.on('resize', onResize, $window);

        $scope.$on('$destroy', function() {
          ionic.off('resize', onResize, $window);
        });

      }
    };
  }]);

'use strict';

angular.module('rentIonicApp', [])
  .directive('card', function () {
    return {
      templateUrl: 'directives/card/card.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });

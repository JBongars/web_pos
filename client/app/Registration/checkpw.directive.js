/**
 * Title        :   Main Controller for Client Side Application
 * Author       :   Julien Bongars
 * Date         :   05/09/2017
 * Updated      :   
 * Comments     :   Main Controller for Assignment1 (StackUp)
 */

(function () {

    "use strict";

    angular.module('RegApp.directives', [])
    .directive('pwCheck', [function () {
      return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
          var firstPassword = '#' + attrs.pwCheck;
          elem.add(firstPassword).on('keyup', function () {
            scope.$apply(function () {

                var elem1 = elem.val();
                var elem2 = $(firstPassword).val();

                //console.log(elem1 == elem2);

              var v = elem1 == elem2;
              ctrl.$setValidity('pwmatch', v);

            });
          });
        }
      }
    }]);

})();

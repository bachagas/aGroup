angular.module('MetaGroupware').directive('retypePassword', function retypePasswordDirective($filter) {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            password: '=retypePassword'
        },
        link: function(scope, elem, attrs, ctrl) {
            var translateFilter = $filter('translate');

            if (!!elem && elem[0].type == 'password' && !!ctrl && !!ctrl.$validators) {
                ctrl.$validators.passwordsDoesntMatch = function (modelValue) {
                    if (modelValue == scope.password) {
                        elem[0].setCustomValidity('');
                        return true;
                    } else {
                        elem[0].setCustomValidity(translateFilter('Passwords doesn\'t match!'));
                        return false;
                    }
                };
            }
        }
    };
});
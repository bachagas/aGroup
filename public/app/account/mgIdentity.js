angular.module('MetaGroupware').factory('mgIdentity', function mgIdentityFactory($window) {
    var currentUser;
    if (!!$window.bootstrappedUserObjectString) {
        currentUser = JSON.parse(_.unescapeHtmlNumericCodes($window.bootstrappedUserObjectString));
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    };
});

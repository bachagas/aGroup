angular.module('MetaGroupware').factory('mgIdentity', function mgIdentityFactory($window, User) {
    var currentUser;
    if ($window.bootstrappedUserObjectString) {
        currentUser = new User();
        angular.extend(currentUser, JSON.parse(_.unescapeHtmlNumericCodes($window.bootstrappedUserObjectString)));
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    };
});

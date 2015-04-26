angular.module('MetaGroupware').factory('mgIdentity', function mgIdentityFactory() {
    return {
        currentUser: undefined,
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    };
});

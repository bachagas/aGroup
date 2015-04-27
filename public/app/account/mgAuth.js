angular.module('MetaGroupware').factory('mgAuth', function mgAuthFactory($http, mgIdentity, $q) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    mgIdentity.currentUser = response.data.user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {lougout: true}).then(function (response) {
                if (!response.data.error) {
                    mgIdentity.currentUser = undefined;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        }
    };
});

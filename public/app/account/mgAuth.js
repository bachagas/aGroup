angular.module('MetaGroupware').factory('mgAuth', function mgAuthFactory($http, mgIdentity, $q, User) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    var user = new User();
                    angular.extend(user, response.data.user);
                    mgIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        createUser: function (newUserData) {
            var newUser = new User(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function () {
                mgIdentity.currentUser = newUser;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        updateCurrentUser: function (changedUserData) {
            var dfd = $q.defer();

            var clone = angular.copy(mgIdentity.currentUser);
            angular.extend(clone, changedUserData);

            clone.$update().then(function (user) {
                mgIdentity.currentUser = user;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
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
        },
        authorizeCurrentUserForRoute: function (role) {
            if (mgIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        authorizeAuthenticatedUserForRoute: function () {
            if (mgIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        notAlreadyAuthenticatedUserForRoute: function () {
            if (mgIdentity.isAuthenticated()) {
                return $q.reject('already logged in');
            } else {
                return true;
            }
        }
    };
});

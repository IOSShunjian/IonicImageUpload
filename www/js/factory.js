angular.module('starter.factory', [])

.factory('Loader', ['$ionicLoading', '$timeout', function($ionicLoading, $timeout) {

    var LOADERAPI = {

        showLoading: function(text) {
            text = text || 'Loading...';
            $ionicLoading.show({
                template: text
            });
        },

        hideLoading: function() {
            $ionicLoading.hide();
        },

        toggleLoadingWithMessage: function(text, timeout) {
            var self = this;

            self.showLoading(text);

            $timeout(function() {
                self.hideLoading();
            }, timeout || 3000);
        }

    };
    return LOADERAPI;
}])

.factory('LSFactory', [function() {

    var LSAPI = {

        clear: function() {
            return localStorage.clear();
        },

        get: function(key) {
            return JSON.parse(localStorage.getItem(key));
        },

        set: function(key, data) {
            return localStorage.setItem(key, JSON.stringify(data));
        },

        delete: function(key) {
            return localStorage.removeItem(key);
        }

    };

    return LSAPI;

}])
app.controller('addCtrl', function($scope) {
    $scope.close = (localStorage.login == "true") ? true : false;
});
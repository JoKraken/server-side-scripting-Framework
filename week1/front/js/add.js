app.controller('addCtrl', function($scope) {
    $scope.logedIn = (localStorage.login == "true") ? true : false;
    $scope.id = localStorage.temp;
    document.querySelector('#uid').value = $scope.id.split('"')[1];
});
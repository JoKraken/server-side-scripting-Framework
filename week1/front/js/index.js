var app = angular.module('myApp', []);

app.controller('formCtrl', function($scope) {
    $scope.data = {};

    const Http = new XMLHttpRequest();
    const url='http://localhost:3000/all';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange= (e)=>{

        $scope.data = JSON.parse(Http.response);
        console.log(JSON.parse(Http.response));
        console.log($scope.data);
        $scope.reset();
    };

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
});

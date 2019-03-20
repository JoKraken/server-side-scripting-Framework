var app = angular.module('myApp', []);

app.controller('showCtrl', function($scope) {
    $scope.all = [];
    $scope.data = [];


    const Http = new XMLHttpRequest();
    const url='http://localhost:3000/all';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange= (e)=>{
        if(Http.response != ""){
            $scope.data = angular.copy(JSON.parse(Http.response));
            $scope.all = angular.copy(JSON.parse(Http.response));
            console.log($scope.data);
            $scope.$apply();
        }
    };

    $scope.delete = function() {
        const Http = new XMLHttpRequest();
        const url='http://localhost:3000/delete';
        Http.open("DELETE", url);
        Http.send();
        Http.onreadystatechange= (e)=>{
            if(Http.status == 200){
                console.log(Http.status);
            }
        };
    };

    $scope.pressTitle = function(id) {
        console.log(id);
        if(id == undefined){
            $scope.data = $scope.all;
        }else{
            $scope.data = [];
            $scope.all.forEach(function (one) {
                if(id == one._id) $scope.data.push(one);
            });
        }
    };

    $scope.view = function(id) {
        console.log(id);
    };
});

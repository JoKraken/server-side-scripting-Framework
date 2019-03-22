var app = angular.module('myApp', []);

app.controller('showCtrl', function($scope) {
    $scope.cato = [];
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
            $scope.data.forEach(function (one) {
                var temp = true;
                $scope.cato.forEach(function (two) {
                    if(one.category == two.category) temp = false;
                });
                if(temp) $scope.cato.push(one);
            });
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

    $scope.pressTitle = function(cato) {
        console.log(cato);
        if(cato == undefined){
            $scope.data = $scope.all;
        }else{
            $scope.data = [];
            $scope.all.forEach(function (one) {
                if(cato == one.category) $scope.data.push(one);
            });
        }
    };

    $scope.view = function(id) {
        console.log(id);
        $scope.all.forEach(function (item) {
            if(id == item._id) {
                document.querySelector('.modal-body img').src = 'uploads/'+item.image;
                document.querySelector('.modal-title').innerHTML = item.title;
                document.querySelector('#myModal').style.display = "block";
            }
        });
    };

    $scope.close = function() {
        console.log("close");
        document.querySelector('#myModal').style.display = "none";
    };
});


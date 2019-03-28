var app = angular.module('myApp', []);

app.controller('showCtrl', function($scope) {
    $scope.cato = [];
    $scope.all = [];
    $scope.data = [];


    const Http = new XMLHttpRequest();
    const url = 'http://localhost:3000/all';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = (e) => {
        if (Http.response != "") {
            $scope.data = angular.copy(JSON.parse(Http.response));
            $scope.all = angular.copy(JSON.parse(Http.response));
            $scope.data.forEach(function (one) {
                var temp = true;
                $scope.cato.forEach(function (two) {
                    if (one.category == two.category) temp = false;
                });
                if (temp) $scope.cato.push(one);
            });
            $scope.$apply();
        }
    };

    $scope.delete = function (id) {
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:3000/delete/' + id;
        Http.open("DELETE", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            if (Http.status == 200) {
                if (id != undefined) {
                    console.log($scope.data);
                    let count = 0;
                    $scope.data.forEach(function (one) {
                        if (one._id == id) $scope.data.splice(count, 1);
                        count++;
                    });
                    $scope.all = angular.copy($scope.data);
                    console.log($scope.data);
                } else {
                    $scope.cato = [];
                    $scope.all = [];
                    $scope.data = [];
                }
                $scope.$apply();
            }
        };
    };

    $scope.edit = function (id) {
        console.log(id);
        $scope.all.forEach(function (item) {
            if (id == item._id) {
                document.querySelector('#editForm').action = document.querySelector('#editForm').action + "?id=" + item._id;
                console.log(document.querySelector('form').action);
                document.querySelector('#cato').value = item.category;
                document.querySelector('#title').value = item.title;
                document.querySelector('#des').value = item.details;
                document.querySelector('#editModal').style.display = "block";
            }
        });
    };

    $scope.pressTitle = function (cato) {
        console.log(cato);
        if (cato == undefined) {
            $scope.data = $scope.all;
        } else {
            $scope.data = [];
            $scope.all.forEach(function (one) {
                if (cato == one.category) $scope.data.push(one);
            });
        }
    };

    $scope.view = function (id) {
        console.log(id);
        $scope.all.forEach(function (item) {
            if (id == item._id) {
                document.querySelector('.modal-body img').src = 'uploads/' + item.image;
                document.querySelector('.modal-title').innerHTML = item.title;
                document.querySelector('#myModal').style.display = "block";
            }
        });
    };
});

app.controller('loginCtrl', function($scope) {

    console.log(localStorage.login);
    if (localStorage.login == "true") {
        console.log("login: "+localStorage.login);
        document.querySelector('.errorLogin').style.display = "none";
        document.querySelector('#loginForm').style.display = "none";
    } else if(localStorage.login == "false" || localStorage.login == undefined){
        console.log("not login: "+localStorage.login);
        document.querySelector('#logedIn').style.display = "none";
    }

    $scope.login = function() {
        const Http = new XMLHttpRequest();
        const url='http://localhost:3000/login';
        Http.open("POST", url, true);
        Http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        Http.send("name="+document.querySelector('#name').value+"&pwd="+document.querySelector('#pwd').value);
        Http.onreadystatechange= (e)=>{
            console.log(Http.status);
            if(Http.status == 200){
                console.log("login");
                localStorage.setItem("login", true);
                document.querySelector('#logedIn').style.display = "block";
                document.querySelector('.errorLogin').style.display = "none";
                document.querySelector('#loginForm').style.display = "none";
            } else{
                localStorage.setItem("login", false);
                console.log("not login");
                document.querySelector('#logedIn').style.display = "none";
                document.querySelector('.errorLogin').innerHTML = (Http.status == 404) ? "The password is wrong": "The username is wrong";
                document.querySelector('.errorLogin').style.display = "block";
            }
        };
    };

    $scope.logout = function() {
        localStorage.setItem("login", false);
        document.querySelector('#logedIn').style.display = "none";
        document.querySelector('.errorLogin').style.display = "none";
        document.querySelector('#loginForm').style.display = "block";
    }
});

app.controller('modalCtrl', function($scope) {
    $scope.close = function(id) {
        console.log(id);
        document.querySelector('#'+id).style.display = "none";
    };
});


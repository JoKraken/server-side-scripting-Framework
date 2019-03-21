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
        $scope.all.forEach(function (item) {
            if(id == item._id) {
                document.querySelector('.modal-body img').src = item.image;
                document.querySelector('.modal-title').innerHTML = item.title;
                /*resetMap(item);
                document.querySelector('#map').addEventListener('transitionend', () => {
                    resetMap(item);
                });
                const myModal = $('#myModal');
                myModal.on('shown.bs.modal', () => {
                    resetMap(item);
                });*/
                document.querySelector('#myModal').style.display = "block";
            }
        });
    };

    const initMap = () => {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11
        });
        marker = new google.maps.Marker({
            map: map
        });
        getData();
    };


    const resetMap = (item) => {
        const coords = item.coordinates;
        console.log(coords);
        google.maps.event.trigger(map, "resize");
        map.panTo(coords);
        marker.setOptions({
            position: coords
        });
    };

    //initMap();

    $scope.close = function() {
        console.log("close");
        document.querySelector('#myModal').style.display = "none";
    };
});


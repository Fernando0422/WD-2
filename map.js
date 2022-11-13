let map, infoWindow;


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7513799430199, lng: -122.435914700855 },
    zoom: 14,
});

let parkingLatitude =[]; //[37, 47, 57, 67];
let parkingLongitude =[];// [-121, -111, -123, -147];
let resultLength;

let businessLatitude =[]; //[37, 47, 57, 67];
let businessLongitude =[];// [-121, -111, -123, -147];

var currentLatitude = 37.7511077423168; //TO DO
var currentLongitude = -122.433119669031; //TO DO

let promptRadius = prompt('Please Enter a Radius in Meters (Ex. 1500, 2000, etc): ');

var radius = parseInt(promptRadius);
var url1 = "https://api.iq.inrix.com/lots/v3?point=" + String(currentLatitude) + "%7C" + String(currentLongitude) + "&radius=" + String(radius);
var url2 = "http://localhost:8000/gettoken";
//Set up query method
var requestOptions1 = {
    method: 'GET',
    timeout: 0,
    headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InVvazl3bGtpYWEiLCJ0b2tlbiI6eyJpdiI6Ijk5ZTFmNmNiNzcwNzk0MzA3ZDg5M2I1MjU3Y2IwODUyIiwiY29udGVudCI6ImNmNzM1OTc2YmE5YjI5N2Q2Y2I3MWU3NzA1ZThkM2UxYzhlMmMzYjE1NTM3NGI0NzBhYWM1MjM4OGU0YWE1MWFlYmM2MDU0OTFmYjUxOGJjZGZlZTFlY2VjMDU1ZGRkODZlYjA4ZGI5NDY2YzRiOTgwNWZjZDBiOWM1OWY5ZDgwM2IwY2E5NmExNDVkMmY4Y2YzZWE3MTg3OTZjYzcwMDJjMDE1ZmQ5MWFiYmE0NDdiMjkwYmQ0Nzg0YThjODIzMGNhNTcxNTM1MTU4OWRhOTBjMDE2MzVkOTkyMWU0NGYxOWE3NDU2YmU4MTllYzk4MjNlYmZlZTFlMzBkNTU4ZDA0ODdhOGEzZGU4MThhZTM4MDdjN2EzNTI4NTE1YzRjMWUyZTI5ZDg4MmM3MTJmNzllM2RmNzM0MjE5OWI2NjE3ZmUyYTM1ZDU5YTk4NzNmMGE0MzM2MzE3NGM3NDRmMWNlZDQzMWVmYmY4NTI1MmRkOGJiYjI0MWMzMTNkMzhiMTg4ZjU5MDc2YmEzZDQ2MWU1NWRhMmFkNGI5ZjAxNjRlMTk5MmM2YWI4ZWZhOTgwMjRmN2NhNTQ0YzM4ZWMzZTQwNDY3MzNmNDdjMjY2ZjQzNDU1M2JlODI5MjExZGUxZDVlZjRiOGEwNDQ4NTM5ZjYxZTBlNDkzMjMxZDA4MWNhNDY5YTU4NTUxZTY1ZjhiNmFkMDU1ODFlNGRlZGVlYWEzNmEyNWU1OTdmOGJlMjZlZDNiNDNkNjc4OTZlNGFiYTA1MzkwNmRmZjAzNjcwMzU3MDhlNmYxOGMzNWM2NGJiNjBjZDZmYjEzMzc0MTVjYzE4NWU1MjcxOTY5YWI5NDcyZTZlZjBmNGMzMmI1YmUzMmQzYzhhIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI5OWUxZjZjYjc3MDc5NDMwN2Q4OTNiNTI1N2NiMDg1MiIsImNvbnRlbnQiOiJjNTVlNWIyNzhhYWMxMDYxNTNiOTIxNTcxYmU2ZjFhOGVkYzBkMGI3NzcxMDdkMjczZWJjNzI2Yjg2NDVhMDJhOGZkNTBkM2E1ODg0MGZiODhmYzczMWYwIn0sImp0aSI6ImE0NDI1MTBkLTc1YjEtNGRiMy1hYTY2LTA5YmMwZmMzMzU1MSIsImlhdCI6MTY2ODMzNTU1NywiZXhwIjoxNjY4MzM5MTU3fQ.w7Q41AbnWNFdNo5SHkTr9kgVnbD-e_pWpamdolOMnDo"
    }
};
var requestOptions2 = {
    method: 'GET',
    timeout: 0,
    headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6IjJxZWE4cTY1aWYiLCJ0b2tlbiI6eyJpdiI6ImY2YjRlYTMzNzZjNjllNjFlZjRlOGJjY2Y3MmI5NzFkIiwiY29udGVudCI6IjIwZTVjYzU1ZmIyZGE1MGIwMjA4ZGE4YWM3NzE3NTg4OTU2ZjI5NWQ3MWYyMWI0NzMzNzBjMmEzNDBiNWNlZGNlMzZiNzUwZDlmY2I2OWI4ZDUyZTljZGQ3ZTgyNGQ4ZWYyZjlkZDgzNmY0NTc1YTE2YmU2YTI2ZTRjMzkyN2QzODMzN2IwNzhkMzAwOWZjMmJjZWQ3ZTczMWNkOTI0Y2IzYmFkNzgyZGNjMzc4YTFiNjE5ZDJmMDYxZWVjNzhhYWFiYzRiMzlmMzMwNjRhZDgwNGNhMmE3YmVmMTEzOWQ1ZWE0MTA3NjUyMDdlOWVkMmQ0NzJlMWJjYzQyMDY5YjUzYmViMDQ5ZTM3NWM1YTc5NDdjNDU1ZGRmOGRhM2FmMGQ3OTU3N2NiYjBkMWY4ODAyODI2ZDM0ZTliOWU1NGEzZWI1NDIyZGVjOTlhYTRiYzQxMzE4NTY0YWY4ODI4NWRkMjI5ZjExMGNhZGI1YTUyZTQ2ODRlN2JlNTUzOWYxOTJjYzRiNDZkMDRjYmM0NDY0YjVjMmY1Njc3NmViNjcxYzYzZTBiZDk2MDhkYWU5MmY2NDUwODNmZWZlYjk2ZWM0MzhlZmRmYzA3OGI2MjQwYzU5NTZmZTBhYTE2YWRiZWZiMmNkZmZlY2YzOWNlNjc0OGNhY2I1NmZhNWEwMzdlOTBhNGE0YTNkNTA3NjJiZmU1MjY1YTJkODI3YzQ1YTI3ZjZmODc0ZWMxMTdhZjA5NzU0MWYzM2JjZTEzZWZjY2RhMjQyYzlkZWI0YmNkMzZjYTQxMzA4YWMxN2MyMDdlYmExMWNhMDg1M2I4MzQ0ZjgwNDIzY2FmYjY5YTBmNTFlNzk2NzMxNzhiYWEwYmUzZDE1OTk2In0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJmNmI0ZWEzMzc2YzY5ZTYxZWY0ZThiY2NmNzJiOTcxZCIsImNvbnRlbnQiOiIyMmVkYjQxMGRlMmQ4ODFhN2QxYmExYTVlYTdjNGNkM2UyNTM1NjdhNzRlZjAwMTYwNjYyZDlkZTRhZWVjNmU3YzU1ZTBjMDVjOTgzNjg5ZGY2MDliYmUzIn0sImp0aSI6ImUxNzFiNTI0LWNiZTQtNGZjMy1iYzk0LTcwMDE3YzE2OGRiYSIsImlhdCI6MTY2ODMyNTg1MCwiZXhwIjoxNjY4MzI5NDUwfQ.fRWyHN_2ukqR568WriFmOid6hS5I_RX3BYiAb9cDihA'"
    },
    mode: "no-cors"
};
var output1 = fetch(url1, requestOptions1)
.then(response => response.json())
.then(result => {
    console.log("get lat lng running");
    console.log(result);

    //resultLength = value.result.length;
    
    for (var i = 0; i < result.result.length; i++){
        parkingLatitude.push(result.result[i].point.coordinates[0]);
        parkingLongitude.push(result.result[i].point.coordinates[1]);
    }
    console.log(parkingLatitude);
    console.log(parkingLongitude);

    console.log("after getting values");
    console.log(resultLength);
    console.log(parkingLatitude);
    console.log(parkingLongitude)
    console.log("cur: " + parkingLatitude[0]);
    console.log("cur: " + parkingLongitude[0]);

    for(let i = 0; i < resultLength; i++){
        console.log("for loop running");
        console.log("curret lat: " + parkingLatitude[i]);
        console.log("curret lng: " + parkingLongitude[i]);
        let street = result.result[i].navigationAddress.street;
        let city = result.result[i].navigationAddress.city;
        let state = result.result[i].navigationAddress.state;
        let postal = result.result[i].navigationAddress.postal;
        let country = result.result[i].navigationAddress.country;
        let address = street + " " + city + " " + state + " " + postal;
        console.log(address);
        new google.maps.Marker({
            position: {lat: parkingLongitude[i], lng: parkingLatitude[i] },
            map,
            title: address,
        });
    }
})
.catch(error => console.log('error', error));

var output2 = fetch(url2, requestOptions2)
.then(response => response.json())
.then(result => {
    console.log("get lat lng running business");
    console.log(result);

    for (var i = 0; i < result.businesses.length; i++){
        businessLatitude.push(result.result.latitude);
        businessLongitude.push(result.result.longitude);
    }
    console.log(businessLatitude);
    console.log(businessLongitude);

    console.log("after getting values business");
    console.log(result.businesses.length);
    console.log(businessLatitude);
    console.log(businessLongitude);
    console.log("bcur: " + businessLatitude[0]);
    console.log("bcur: " + businessLongitude[0]);
    for(let i = 0; i < result.businesses.length; i++){
        console.log("bfor loop running");
        console.log("bcurret lat: " + businessLatitude[i]);
         console.log("bcurret lng: " + businessLongitude[i]);
        new google.maps.Marker({
            position: {lat: businessLongitude[i], lng: businessLatitude[i] },
            map,
            title: "Hello World!",
        });
    }
})
.catch(error => console.log('error', error));
//var markers = [];
/*
new google.maps.Marker({
position: {lat: 37.3541, lng: -121.9552},
map,
title: "Hello World!",
});

new google.maps.Marker({
position: {lat: 37.4541, lng: -121.9552},
map,
title: "Hello World!",
});        

new google.maps.Marker({
position: {lat: 37.6541, lng: -121.9552},
map,
title: "Hello World!",
});
*/



infoWindow = new google.maps.InfoWindow();

const locationButton = document.createElement("button");

locationButton.textContent = "Find current location";
locationButton.classList.add("custom-map-control-button");
map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("You are here!");
        infoWindow.open(map);
        map.setCenter(pos);
        },
        () => {
        handleLocationError(true, infoWindow, map.getCenter());
        }
    );
    } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
    }
});
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(
    browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation."
);
infoWindow.open(map);
}

window.initMap = initMap;


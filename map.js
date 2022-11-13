let map, infoWindow;


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7513799430199, lng: -122.435914700855 },
    zoom: 14,
});

let parkingLatitude =[]; //[37, 47, 57, 67];
let parkingLongitude =[];// [-121, -111, -123, -147];
let resultLength;

var currentLatitude = 37.7511077423168; //TO DO
var currentLongitude = -122.433119669031; //TO D

let promptRadius = prompt('Please Enter a Radius in Meters (Ex. 1500, 2000, etc): ');



var radius = parseInt(promptRadius);
var url = "https://api.iq.inrix.com/lots/v3?point=" + String(currentLatitude) + "%7C" + String(currentLongitude) + "&radius=" + String(radius);

//Set up query method
var requestOptions = {
    method: 'GET',
    timeout: 0,
    headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InVvazl3bGtpYWEiLCJ0b2tlbiI6eyJpdiI6ImU2OGNlNDhkNjkxMmY0MmNhODE0NDk5Y2EyNWU4ZGMzIiwiY29udGVudCI6ImM1OTljYWI0NDljYmY2MmUyNzc1N2E1Y2RlNGI3MzVlZmQxMTM1YTgyMWQwMGJmM2U0Zjk1NzVjMDk4ZWVkMTE4ZjFiMDYyZGZiNDdkOGE3YTQ3MzljOTI4YjRiMGFmZGNlNDZhNDg5MTkzNmE1MzUxNDBjNzBhYjYzYzY3YmM3ZDAzZmM4MTIxZTAxOTQ3YWFjYzBmYjU0MjhjNThjMDVlOWM1MjdkMGE0YTJiMTYzNmQ3MjI5NDY1NmNkOTYyZDhmOTFhZDczMzUwOGU2NTNmYTNjODAzMjQ2MTM2YTA3ZTI3MTM3NGI3ZGY3MmEzMTA2NTg0NTM4ZTVhZWFhNzExYTE3MDAyNjE4NTYzNzg4YmZlY2QzNGQ2MTRhNTUyMTg4NTIyMTE4ZDM4NWZkMmZjZjdlNjdhNDM1OGFiY2U4YTQ2OGMwODRiNTJmMDUwN2ZiYWU2OGIzY2Q3OGQ2YjU5MWQyOTNhN2EzZWY2NDUwMTQ4Zjk0NThiZDczMzY2ZGI1OThiY2EyZTMyMmZkOGVmM2I4NzAzOTQwMDE1ZDUyOGNlMWJlMDhmNjkyN2JiNGNhNmQ0NmYwMTliYzhhYmVjNzA3NTIxNWExNDYzYmMyZDJjNTYxMTUwZGVmNTM5ODUyN2I4ZmNhMjkxMTgwYTc2MDZmYzc2N2EzY2ZhNjk3MTYyNjdmYzg5NTg2MzI1ZTZlZmM1YTJkNjg2YTM3Y2M5ZjBlOTZmYWFjMGY2ODc0MGMzMjhlNWM0NTU1YjM4M2EzNGJkZWQ0MDIyZDE3ZWU5MTg3NjM4Nzc4ZWQ3ZjVmMDM5ZTAyZjVjNjhiMmUxNWE1YWI1NjY1YzU4Zjg2MDJkYjU1YjQxNjMyYmQyMzYxZWI1N2U3In0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJlNjhjZTQ4ZDY5MTJmNDJjYTgxNDQ5OWNhMjVlOGRjMyIsImNvbnRlbnQiOiJkNGFlZjA4OTZlZmFkZDA1Mzk2NDY2NmZiYjVhNGMwN2Q0MWQyZmExM2FmNDJlYjdiNzg5NGYzYjJkOGRjZTFjZjMzNzc5NTE4MDc0ZWM4MmFhN2Q5OWFjIn0sImp0aSI6IjM2NmU3ZjQzLTY5YTEtNDljMS1hZWU0LTU0NzRlMjU1NmM4NyIsImlhdCI6MTY2ODMxODc4NCwiZXhwIjoxNjY4MzIyMzgzfQ.gcpYryjxjBUFiT3x7DZhOBcXzL87qKyZJyRbN0PpHtk"
    }
};

var output = fetch(url, requestOptions)
.then(response => response.json())
.then(result => {
    console.log("get lat lng running");
    console.log(result);
    //resultLength = value.result.length;
    resultLength = 10;
    for (var i = 0; i < resultLength; i++){
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


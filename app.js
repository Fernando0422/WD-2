const express = require('express');
const fetch = require("node-fetch");
const { response } = require('express');
const app = express();
const port = 8000;
app.set('json spaces', 2);

// to query, call: http://localhost:8000/gettoken

app.get('/gettoken', async function (req, res) {

    //console.log(req);
    //res.send("res")

    //Set up URL to query
    let appId = "_QKWYagu9qv1PjXLTjtc9Q";
    let hashToken = "m_rvsvDjWNKJY-6p05B_oeDurrY0SPbtXCdvSyoyS6wBgjNw7A2MZ06x3rFEp-8ukkoONVi_gnhbk4spc84MHjooIcWfx2-erBt4uGno3gqaYUH8ZMZr0S5wGLFwY3Yx";
    let url = `https://api.yelp.com/v3/businesses/search?latitude=37.783926&longitude=-122.433072&radius=8046&open_now=true`;

    //Set up query method
    var requestOptions = {
        method: 'GET' ,
        headers: { Authorization: 'Bearer ' + hashToken},
        redirect: 'follow'
        //how to define custom functions in node js - how to export function and imoport it on the other file
    };

    //Query INRIX for token
    let response = await fetch(url, requestOptions);
    let json = await response.json();
   // let output = json.result.token;

    //Return token
    // res.json({
    //     token: output,
    // });

    var url2 = "https://api.yelp.com/v3/businesses/search?latitude=37.783926&longitude=-122.433072&radius=8046&open_now=true" 

    //Set up query method
    var requestOptions2 = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + hashToken},
    redirect: 'follow'
    };

    //Make query using fetch
    var output2 = fetch(url2, requestOptions2)
    .then(response => response.json())
    .then(result => handleOutput(result))
    .catch(error => console.log('error', error));

    function handleOutput(value){
        //var jsonList = [];
        var jsonList = {
            result: []
        };
        for (let i = 0; i < value.businesses.length; i++) {
            jsonList.result.push({
                "name" : value.businesses[i].name,
                "longitude" : value.businesses[i].coordinates.longitude,
                "latitude" : value.businesses[i].coordinates.latitude
            });
        }
        res.json({
            jsonList,
        });
      }
})

//app.listen(8000, ()=>console.log("proxy has beem started at port 8000"));
//Starting server using listen function
app.listen(port, function () {
    console.log("Server has been started at " + port);
})
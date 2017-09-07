/**
 * Title        :   Main Server Application
 * Author       :   Julien Bongars
 * Date         :   05/09/2017
 * Comments     :   Express Application for Assignment1 (StackUp)
 */

"use strict"
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname);
console.log(__dirname + "/../client/");
const NODE_PORT = process.env.NODE_PORT || 3000;
var y = 0;

app.use(express.static(__dirname + "/../client/"));
/*
app.use('/bower_components', express.static(__dirname +
    "/../client/bower_components"));*/

if (!NODE_PORT) {
    console.log("Express Port is not set");
    process.exit();
}

var users = []; //object of users

var template = {
    "email": "",
    "password": "",
    "confirmPassword": "",
    "fullname": "",
    "gender": "M",
    "dateofbirth": "",
    "address": "",
    "country": "",
    "contactnumber": ""
}

//random number gen for id
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//handle register info
app.post('/register', function (req, res) {
    var request = req.body;
    console.log(JSON.stringify(request));

    //server side validation
    var validation = {

        contactnumber: /^[+()-\d\s]*$/.test(request.contactnumber),
        //https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(request.email),
        password: /^(?=.*\d)(?=.*[@#$])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(request.password),
        confirmPassword: request.password == request.confirmPassword,

        dateofbirth: (function (DOB) {
            var today = new Date();
            var birthDate = new Date(DOB);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age >= 18;
        })(request.dateofbirth),

        requiredFields: (function hasSameProps(obj1, obj2) {
            var obj1Props = Object.keys(obj1),
                obj2Props = Object.keys(obj2);

            if (obj1Props.length == obj2Props.length) {
                return obj1Props.every(function (prop) {
                    return obj2Props.indexOf(prop) >= 0;
                });
            }
            return false;
        })(request, template),

        duplicateRecord: (function isAlreadyInDb(table, entry) {
            var value = true;
            for (var i in table) {
                value *= !(table[i].email == entry.email); //based on email only
            }
            return value;
        })(users, request)
    }

    console.log(JSON.stringify(validation));

    //check validation
    var valid = true;
    for (var i in validation) {
        valid *= validation[i];
    }

    console.log(valid);

    if (valid == 1) {
        request.id = uuidv4(); //get random id
        users.push(request)
        res.status(200).json(request);//.json(users);
    } else {
        console.log(JSON.stringify(validation));
        res.status(400).json(validation);
    }
});

app.use(function (req, res) {
    //console.log("Error: 404");
    res.send("<h1>404 - Page not found</h1>");
});

app.listen(NODE_PORT, function () {
    console.log("Web App started at " + NODE_PORT);
});

module.exports = app
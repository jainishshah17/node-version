/**
 * Created by jainishs on 5/25/17.
 */
var package = require('./package.json');
var path    = require("path");
const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send("Package Version is: " + package.version)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})


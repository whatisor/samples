var express = require('express');
var app = express();
var temp = 0;
app.use('/', express.static('.'));
var server = app.listen(80, "", function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});

var os = require('os');
const exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var child = null;
app.get('/stereo', function(req, res, next) {
    if (child) {
    	console.log(child.pid);
        exec("taskkill /pid "+child.pid+ '/F /T');
        child = null;
    }
    let opts = {
        "cwd": "E:/Data/git/2019/ZCamK1Pro/x64/Release",
    };
    var commands = "SSPZCamTest.exe 10.98.32.1 10.98.32.2 2"; //STEREO
    child = exec(commands, opts, function(error, stdout, stderr) {
        if (error) {
            console.error(error);
            return;
        }
        console.log(stdout);
    })
    res.json("OK");
})


app.get('/non-stereo', function(req, res, next) {

    if (child) {
    	console.log(child.pid);
        exec("taskkill /pid "+child.pid+ '/F /T');
        child = null;
    }
    let opts = {
        "cwd": "E:/Data/git/2019/ZCamK1Pro/x64/Release",
    };
    var commands = "SSPZCamTest.exe 10.98.32.1 10.98.32.2 3"; //STEREO
    child = exec(commands, opts, function(error, stdout, stderr) {
    	 if (error) {
            console.error(error);
            return;
        }
        console.log(stdout);

    })
    res.json("OK");
})

process.on('SIGINT', function() {
    if (child) {
    	console.log(child.pid);
        exec("taskkill /pid "+child.pid+ '/F /T');
        child = null;
    }
        process.exit();
});
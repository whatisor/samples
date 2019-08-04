var express = require('express');
var app = express();
var temp = 0;
app.use('/', express.static('.'));
var server = app.listen(80, "", function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});
return;
//
//
//
//
//
//
//
//
//setup stream binary
var streamPath = "E:/Data/git/2019/ZCamK1Pro/x64/Release";
var os = require('os');
const exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var child1 = null;
var child2 = null;
let opts = {
    "cwd": streamPath,
};
var commands = "SSPZCamTest.exe 10.98.32.1 10.98.32.2 3"; //STEREO
child1 = exec(commands, opts, function(error, stdout, stderr) {
    if (error) {
        console.error(error);
        return;
    }
    console.log(stdout);
})

let opts = {
    "cwd": streamPath,
};
var commands = "SSPZCamTest.exe 10.98.32.1 10.98.32.2 2"; //NON-STEREO
child2 = exec(commands, opts, function(error, stdout, stderr) {
    if (error) {
        console.error(error);
        return;
    }
    console.log(stdout);

})

process.on('SIGINT', function() {
    killChild(child1);
    killChild(child2);

    process.exit();
});

function killChild(child) {
    if (child) {
        console.log(child.pid);
        exec("taskkill /PID " + child.pid + ' /F /T', { shell: true }, function(error, stdout, stderr) {
            if (error) {
                console.error(error);
                return;
            }
            console.log(stdout);

        });
        child = null;
    }
}
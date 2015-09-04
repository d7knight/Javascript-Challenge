/**
 * Created by dave on 04/09/15.
 */
var fs          = require('fs');
var readline    = require('readline');
var stream      = require('stream');
var Promise = require('bluebird');
var os = require('os')
function readLineByLine(filename, callback){


    return new Promise(function(resolve){
        var instream    = fs.createReadStream(filename);
        var outstream   = new stream;
        var rl          = readline.createInterface(instream,outstream);
        rl.on('line',callback);

        rl.on('close',resolve);
    })


}
function writeLine(filename, line ){
    fs.appendFile(filename, line+os.EOL, function (err) {
        if (err) throw err;
    });
}

function clearFile(filename){
    fs.writeFile(filename, '', function (err) {
        if (err) throw err;
    });
}

module.exports = {
    readLineByLine:readLineByLine,
    writeLine:writeLine,
    clearFile:clearFile
};

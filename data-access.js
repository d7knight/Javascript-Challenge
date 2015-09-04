/**
 * Created by dave on 04/09/15.
 */
var fs          = require('fs');
var readline    = require('readline');
var stream      = require('stream');
var Promise = require('bluebird');
var os = require('os');
var _=require('lodash');
function readLineByLine(filename, callback){


    return new Promise(function(resolve){
        var instream    = fs.createReadStream(filename);
        var outstream   = new stream;
        var rl          = readline.createInterface(instream,outstream);
        rl.on('line',callback);

        rl.on('close',resolve);
    })


}

function writeOutput(filename, results ){
    var data;
    _.each(results, function(result){
        data+=JSON.stringify(result)+os.EOL;
    });
    fs.writeFile(filename, data, function (err) {
        if (err) throw err;
    });
}



module.exports = {
    readLineByLine:readLineByLine,
    writeOutput:writeOutput
};

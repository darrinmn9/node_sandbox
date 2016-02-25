//"psuedo" polyfill for stream.pipe()
var fs = require('fs');

require('http').createServer(function(req, res) {

  //create a read stream
  var rs = fs.createReadStream('./file.txt');

  //listen for data chunks
  rs.on('data', function(data) {
    console.log('got data', data);
    //if .write returns false, it means the writestream cannot accept new data
    var didWrite = res.write(data);
    if (!didWrite) {
      rs.pause();
    }

  });

  //once the data is drained, restart the stream
  res.on('drain', function() {
    console.log('drain');
    rs.resume();
  });

  //send back http response when done
  rs.on('end', function() {
    console.log('end');
    res.writeHead(200);
    res.end();
  });

}).listen(8080, function(){
  console.log('server started on port 8080');
});

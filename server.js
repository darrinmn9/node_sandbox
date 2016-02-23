exec = require('child_process').exec;

console.log(2);

exec('node child.js', function(err, stdout, stderr){
if(err) throw err;
console.log('stdout', stdout);
});

console.log(3);


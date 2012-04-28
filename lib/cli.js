#!/usr/bin/env node
var io = require('socket.io-client'),
    colors = require('colors'),
    path = require('path'),
    args = process.argv.slice(1)

var arg, base;
do arg = args.shift();
while ( arg !== __filename
  && (base = path.basename(arg)) !== "sio-client"
)

// ok pass the first arg to socket.io
if (args.length < 1) {
  console.log('error:  '.red, 'no socket.io url provided');
  console.log('usage:  '.cyan, 'sio-client',  '<url>'.bold);
  console.log('example:', 'sio-client "https://socketio.nekoo.com/mtgox"');
  return -1;
}

// small output method

var print = function(type, color, message) {
  console.log(type[color], '-', message);
}
print.debug = function(msg) { print('debug', 'magenta', msg); }
print.error = function(msg) { print('error', 'red', msg); }
print.input = function(msg) { print('input', 'green', msg); }
print.output = function(msg) { print('output', 'blue', msg); }

var prompt = 'sio-client> ';
var interactive = function(socket) {
  process.stdout.write(prompt);
  process.stdin.on('data', function(buffer) {
    var msg = buffer.toString();
    print.output(msg);
    socket.send(msg);
    process.stdout.write(prompt);
  });
  process.stdin.resume();
}

var client = io.connect(args[0]);
client.on('connecting', function() {
  print.debug('connecting');
});
client.on('connect', function() {
  print.debug('connected');
  interactive(client);
});
client.on('message', function() {
  console.log();
  print.input(arguments);
  process.stdout.write(prompt);
});

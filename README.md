sio.sh
======

A CLI based socket.io client

Usage
-----
```bash
$ npm install -g sio.sh
$ sio-client http://localhost:8000/
debug - connecting
debug - connect
sio-client> { foo: 'bar' }
output - { foo: 'bar' )
sio-client>
input - { error: 'Unknown command' }
sio-client>
```
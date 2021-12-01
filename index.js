const http = require('http');
const config = require('./config.json');
const fs = require('fs');
var input = fs.readFileSync("input.txt").toString().split("\r\n");

fs.writeFile('active_proxy.txt', "", function (err) {})

input.forEach(proxyraw => {

    let proxy_options = {
        host: proxyraw.split(':')[0],
        method: 'CONNECT',
        path: 'www.google.com',
        timeout: config.timeout,
        agent: false
    };

    if (proxyraw.split(':')[1]) {
        proxy_options.port = proxyraw.split(':')[1];
    }
    if (proxyraw.split(':')[2]) {
        proxy_options.auth = proxyraw.split(':')[2];
        if (proxyraw.split(':')[3]) {
            proxy_options.auth = proxyraw.split(':')[2]+":"+proxyraw.split(':')[3];
        }
    }

    console.log("Testing "+ proxyraw)
    let req = http.request(proxy_options);
    req.on('connect', res => {
        req.destroy();
        if (res.statusCode === 200) {
            console.log("Proxy valid "+ proxyraw)
            if (proxy_options.auth && proxy_options.port) {
                var valid_proxytemp = proxy_options.host+":"+proxy_options.port+":"+proxy_options.auth+"\n"
            } else if (proxy_options.port) {
                var valid_proxytemp = proxy_options.host+":"+proxy_options.port+"\n"
            } else if (proxy_options.auth) {
                var valid_proxytemp = proxy_options.host+":"+proxy_options.auth+"\n"
            } else {
                var valid_proxytemp = proxy_options.host+"\n"
            }
            fs.appendFile('active_proxy.txt', valid_proxytemp, function (err) {})
        } else {
            console.log("Proxy invalid "+ proxyraw)
        }
    });
    req.on('timeout', () => {
        req.destroy();
        console.log("Proxy invalid "+ proxyraw)
    });
    req.on('error', err => {
        console.log("Proxy invalid "+ proxyraw)
    });
    req.end();
})
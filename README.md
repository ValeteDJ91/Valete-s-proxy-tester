# Valete-s-proxy-tester

This is a small proxy tester just to test if a proxy server is valid or not.
it only uses basic nodejs and no external librairie nor plugins.

To use this you must have Nodejs downloaded
https://nodejs.org/

## How does it works ?

Just put all your proxy in input.txt
>00.00.00.00:000:username:password
>11.11.11.11:111:username:password
>22.22.22.22:222:username:password
>22.22.22.22:222:username:password

Then start programm with `node index.js`

All valid proxy will be present in active_proxy.txt
>00.00.00.00:000:username:password
>22.22.22.22:222:username:password
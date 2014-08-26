rackspace-monitoring.js
========

rackspace-monitoring.js is a node module that uses [Virgo.js](http://virgo-agent-toolkit.github.io/) agents to connect to Rackspace monitoring endpoints.

Instructions
============

Clone rackspace-monitoring.js to obtain a local copy (you could also use the ssh url here). 

    $ git clone https://github.com/virgo-agent-toolkit/rackspace-monitoring.js.git rackspace-monitoring.js

Navigate to your new directory and install dependencies. This will change slightly once the virgo.js module
is published to npm. 

    $ cd rackspace-monitoring.js
    $ npm install

Install Virgo.js

    $ npm install git+https://git@github.com/virgo-agent-toolkit/virgo.js
    $ cd node_modules/virgo.js
    $ npm install
    $ make

Copy the example config file, and replace the example credentials (username and API key) with your own. To obtain
your API key, log into your cloud account and go to your account settings.

    $ cp config.js.example config.js
    $ vi config.js

Run the example

    $ node index.js

Docker Instructions
============    
Copy the example config file, and replace the example credentials (username and API key) with your own. To obtain
your API key, log into your cloud account and go to your account settings. Keep your creds in config.example

    $ docker build -t your_tag .
    $ docker run [hash_from_build_stage] nodejs index.js

License
=======

rackspace-monitoring.js is distributed under the [Apache License 2.0][apache].

[apache]: http://www.apache.org/licenses/LICENSE-2.0.html

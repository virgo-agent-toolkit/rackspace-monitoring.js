FROM ubuntu:14.04

RUN apt-get update && \
 apt-get install -y git vim nodejs npm

 RUN git clone https://github.com/virgo-agent-toolkit/rackspace-monitoring.js.git rackspace-monitoring.js

 RUN cd rackspace-monitoring.js && npm install 

 RUN npm install git+https://git@github.com/virgo-agent-toolkit/virgo.js

 RUN cd node_modules/virgo.js && npm install && make

 ADD config.js.example config.js

 ADD index.js index.js

 ADD lib lib

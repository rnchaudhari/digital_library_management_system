FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

COPY controller controller
COPY ebookFiles ebookFiles
COPY middleware middleware
COPY models models
COPY routes routes
COPY service service
COPY views views
COPY app.js app.js
COPY connect.js connect.js
COPY package-lock.json package-lock.json
COPY package.json package.json



ENTRYPOINT [ "node" , "app.js" ]
FROM ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive

RUN apt update
RUN apt -y upgrade
RUN apt install -y curl

RUN curl -o nodejs.deb https://deb.nodesource.com/node_14.x/pool/main/n/nodejs/nodejs_14.15.2-deb-1nodesource1_amd64.deb
RUN apt install -y ./nodejs.deb
RUN rm nodejs.deb
RUN rm -rf /var/lib/apt/lists/

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install
CMD ["node", "app.js"]
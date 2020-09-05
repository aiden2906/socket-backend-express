FROM node:12.18.2-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./server /usr/src/app/server
CMD [ "npm", "start" ]

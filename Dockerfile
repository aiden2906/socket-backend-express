FROM node:12.18.2-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./server /app/server
CMD [ "npm", "start" ]

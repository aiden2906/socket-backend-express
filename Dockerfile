FROM node
WORKDIR /app
COPY package.json ./
RUN npm i -g nodemon
RUN npm install
COPY . /app
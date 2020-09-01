FROM node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . /app
# EXPOSE 3456
# CMD ["node", "server/server.js"]
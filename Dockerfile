FROM node:20-slim as init

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

FROM node:16-alpine as build-step
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN apk add --no-cache git openssh
RUN mkdir /web

WORKDIR /web

COPY package.json /web

#COPY .env.production /dapp-rinz
RUN yarn install

COPY . /web
RUN npm run build

FROM nginx:1.17.1-alpine
RUN apk add msttcorefonts-installer
WORKDIR /portal
COPY --from=build-step /web/build /portal/
COPY conf.d/default.conf /etc/nginx/conf.d/default.conf
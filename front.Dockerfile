### STAGE 1: Build ###
FROM node:16.13.1 as build

WORKDIR /usr/src/app

COPY ./minas-gecelca/package*.json ./

RUN npm install

COPY ./minas-gecelca/. .

RUN npm run build


### STAGE 2: Serve it to the nginx webserver ###

FROM nginx:1.21.4-alpine

COPY --from=build /usr/src/app/dist/gecelca-mine /usr/share/nginx/html
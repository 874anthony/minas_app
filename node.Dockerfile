FROM node:17.2.0

WORKDIR /usr/src/app

COPY ./minas_app/package*.json ./

RUN npm install
# RUN npm ci --only=production

COPY ./minas_app/src .

EXPOSE 3000

CMD ["npm", "start"]
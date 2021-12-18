FROM node:17.2.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

COPY /src .

EXPOSE 3000

CMD ["npm", "start"]
FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install --no-optional
RUN npm run build

CMD [ "npm", "start" ]

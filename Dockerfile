#
# FoodButler Docker Image
#

FROM node:latest

WORKDIR /usr/src/foodbutler
COPY package.json .
RUN npm install

EXPOSE 8081

CMD [ "npm", "start" ]

COPY . .

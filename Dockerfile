#
# FoodButler Docker Image
#

FROM node:current-slim

WORKDIR /usr/src/foodbutler
COPY package.json .
RUN npm install

EXPOSE 8081

CMD [ "npm", "start" ]

COPY . .

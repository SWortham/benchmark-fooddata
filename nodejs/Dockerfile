FROM node:20.0.0-alpine3.17
WORKDIR /usr/app
COPY nodejs/*.json .
RUN npm ci
COPY nodejs/src ./src/
COPY ./food-data.json ./src/data/
RUN npm run build:ci
EXPOSE 3000
CMD ["node", "build/index"]

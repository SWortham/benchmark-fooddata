FROM node:18.16.0-slim
WORKDIR /usr/app
COPY *.json .
RUN npm ci
COPY . .
ENV NODE_ENV=production
RUN npm run build:ci
EXPOSE 3000
CMD ["node", "build/index"]

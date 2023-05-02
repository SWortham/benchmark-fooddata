FROM oven/bun:canary
WORKDIR /usr/app
COPY bun/*.json .
COPY bun/*.lockb .
RUN bun install
COPY bun/src ./src/
COPY ./food-data.json ./src/data/
EXPOSE 3000
RUN mkdir build
RUN bun run build-runtime
CMD ["bun", "run", "build/index.js"]

FROM oven/bun:canary
WORKDIR /usr/app
COPY *.json .
COPY *.lockb .
RUN bun install
COPY ./src ./src/
EXPOSE 3000
RUN mkdir build
RUN bun run build-runtime
CMD ["bun", "run", "build/index.js"]

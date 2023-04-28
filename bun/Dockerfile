FROM oven/bun:0.5.9
WORKDIR /usr/app
COPY *.json .
COPY *.lockb .
RUN bun install
COPY ./src ./src/
EXPOSE 3000
CMD ["bun", "run", "src/index.ts"]

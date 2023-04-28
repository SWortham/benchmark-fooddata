FROM golang:1.20.3-alpine3.17
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY *.go ./
COPY ./data ./data/
RUN CGO_ENABLED=0 GOOS=linux go build -o /fooddata-benchmark
EXPOSE 3000
CMD ["/fooddata-benchmark"]
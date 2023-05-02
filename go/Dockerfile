FROM golang:1.20.3-alpine3.17
WORKDIR /app
COPY go/go.mod go/go.sum ./
RUN go mod download
COPY go/*.go ./
COPY ./food-data.json ./data/
RUN CGO_ENABLED=0 GOOS=linux go build -o /fooddata-benchmark
EXPOSE 3000
CMD ["/fooddata-benchmark"]
package main

import (
	"fmt"
	"log"
	"os"
	"encoding/json"

	"github.com/fasthttp/router"
	"github.com/valyala/fasthttp"
)

func Index(ctx *fasthttp.RequestCtx) {
	ctx.WriteString("Welcome!")
}

func Hello(ctx *fasthttp.RequestCtx) {
	fmt.Fprintf(ctx, "Hello, %s!\n", ctx.UserValue("name"))
}

func main() {
	load()

	r := router.New()
	r.GET("/", Index)
	r.GET("/hello/{name}", Hello)

	log.Fatal(fasthttp.ListenAndServe(":3000", r.Handler))
}

func load() {
	content, err := os.ReadFile("./data/food-data.json")
	if err != nil {
			log.Fatal("Error when opening file: ", err)
	}

	// Now let's unmarshall the data into `payload`
	var payload FoundationFoods
	err = json.Unmarshal(content, &payload)
	if err != nil {
			log.Fatal("Error during Unmarshal(): ", err)
	}

	payloadString, err := json.Marshal(payload)

	fmt.Println(string(payloadString))
}
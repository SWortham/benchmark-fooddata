package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/fasthttp/router"
	"github.com/valyala/fasthttp"
)

func GetFood(ctx *fasthttp.RequestCtx) {
	idString := ctx.UserValue("id").(string)
	id, _ := strconv.Atoi(idString)
	food := foodMap[id]

	json.NewEncoder(ctx.Response.BodyWriter()).Encode(food)
}

func Hello(ctx *fasthttp.RequestCtx) {
	fmt.Fprintf(ctx, "Hello, %s!\n", ctx.UserValue("name"))
}

func main() {
	load()

	r := router.New()
	r.GET("/food/{id}", GetFood)
	r.GET("/hello/{name}", Hello)

	log.Fatal(fasthttp.ListenAndServe(":3000", r.Handler))
}

func timer(name string) func() {
	start := time.Now()
	return func() {
		fmt.Printf("%s took %v\n", name, time.Since(start))
	}
}

var foodMap map[int]Food

func load() {
	defer timer("load")()
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

	foodMap = make(map[int]Food)

	for _, food := range payload.FoundationFoods {
		foodMap[food.FdcID] = food
	}
}

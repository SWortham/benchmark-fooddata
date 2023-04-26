package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/fasthttp/router"
	"github.com/valyala/fasthttp"
)

var foodMap map[int]Food
var nutrientMap map[int][]NutrientAndFood

type NutrientAndFood struct {
	nutrientValue float64
	fdcId         int
}

func GetFood(ctx *fasthttp.RequestCtx) {
	idString := ctx.UserValue("id").(string)
	id, _ := strconv.Atoi(idString)
	food := foodMap[id]

	json.NewEncoder(ctx.Response.BodyWriter()).Encode(food)
}

func SearchByNutrients(ctx *fasthttp.RequestCtx) {
	nutrientFilter := ctx.UserValue("nutrients").(string)

	nutrientIdAndRange := strings.Split(nutrientFilter, ":")
	nutrientId, _ := strconv.Atoi(nutrientIdAndRange[0])
	minMax := strings.Split(nutrientIdAndRange[1], "-")
	minValue, _ := strconv.ParseFloat(minMax[0], 64)
	maxValue, _ := strconv.ParseFloat(minMax[1], 64)
	matchingFdcIds := filterByNutrient(nutrientId, minValue, maxValue)

	json.NewEncoder(ctx.Response.BodyWriter()).Encode(matchingFdcIds)
}

func main() {
	load()

	r := router.New()
	r.GET("/food/{id}", GetFood)
	r.GET("/search/nutrients/{nutrients}", SearchByNutrients)

	log.Fatal(fasthttp.ListenAndServe(":3000", r.Handler))
}

func timer(name string) func() {
	start := time.Now()
	return func() {
		fmt.Printf("%s took %v\n", name, time.Since(start))
	}
}

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
	nutrientMap = make(map[int][]NutrientAndFood)

	for _, food := range payload.FoundationFoods {
		foodMap[food.FdcID] = food

		for _, foodNutrient := range food.FoodNutrients {
			foodNutrients := nutrientMap[foodNutrient.Nutrient.ID]

			if len(foodNutrients) == 0 {
				foodNutrients = []NutrientAndFood{}
			}

			foodNutrients = append(foodNutrients, NutrientAndFood{nutrientValue: foodNutrient.Amount, fdcId: food.FdcID})
			nutrientMap[foodNutrient.Nutrient.ID] = foodNutrients
		}
	}

	for _, nutrientAndFoods := range nutrientMap {
		sort.Slice(nutrientAndFoods, func(i, j int) bool {
			return nutrientAndFoods[i].nutrientValue < nutrientAndFoods[j].nutrientValue
		})
	}
}

func filterByNutrient(nutrientId int, minValue float64, maxValue float64) []int {
	nutrients := nutrientMap[nutrientId]

	if len(nutrients) == 0 {
		return []int{}
	}

	minIndex := findMinIndex(nutrients, minValue)
	maxIndex := findMaxIndex(nutrients, maxValue, minIndex)

	matchingNutrientAndFoods := nutrients[minIndex : maxIndex+1]
	fdcIds := []int{}

	for _, nutrientAndFood := range matchingNutrientAndFoods {
		fdcIds = append(fdcIds, nutrientAndFood.fdcId)
	}

	return fdcIds
}

func findMinIndex(nutrients []NutrientAndFood, value float64) int {
	low := 0
	high := len(nutrients)
	mid := 0
	minIndex := mid

	for low <= high {
		mid = int(math.Floor(float64(high+low) / 2))

		if nutrients[mid].nutrientValue < value {
			low = mid + 1
		} else if nutrients[mid].nutrientValue > value {
			high = mid - 1
			minIndex = mid
		} else {
			return mid
		}
	}

	return minIndex
}

func findMaxIndex(nutrients []NutrientAndFood, value float64, minIndex int) int {
	low := minIndex
	high := len(nutrients) - 1
	mid := 0
	maxIndex := mid

	for low <= high {
		mid = int(math.Floor(float64(high+low) / 2))
		if nutrients[mid].nutrientValue < value {
			low = mid + 1
			maxIndex = mid
		} else if nutrients[mid].nutrientValue > value {
			high = mid - 1
		} else {
			return mid
		}
	}

	return maxIndex
}

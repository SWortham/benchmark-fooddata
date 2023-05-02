from models.food import Food, FoundationFoods
import json
from dataclasses import dataclass

@dataclass
class NutrientAndFood:
	nutrientValue: float
	fdcId: int

class FoodData:
    foodMap: dict[int, Food] = {}
    nutrientMap: dict[int, list[NutrientAndFood]] = {}

    def load(self):
        f = open('data/food-data.json')  
        rawFoodData = json.loads(f.read())
        f.close()
        
        foundationFoods = FoundationFoods(**rawFoodData)
               
        for food in foundationFoods.FoundationFoods:
            self.foodMap[food["fdcId"]] = food
            
            for foodNutrient in food["foodNutrients"]:
                nutrientId = foodNutrient["nutrient"]["id"]
                
                if nutrientId in self.nutrientMap:
                    foodNutrients = self.nutrientMap[nutrientId]
                else:
                    foodNutrients = []                
                                   
                if "amount" in foodNutrient:                
                    nutrientAndFood = NutrientAndFood(float(foodNutrient["amount"]), int(food["fdcId"]))   
                    foodNutrients.append(nutrientAndFood)
                    self.nutrientMap[nutrientId] = foodNutrients
                    
        for key, nutrients in self.nutrientMap.items():
            nutrients.sort(key=lambda x: x.nutrientValue)            
                    
                    
    def filterByNutrient(self, nutrientId: int, minValue: float, maxValue: float):
        nutrients = self.nutrientMap.get(nutrientId)

        if not nutrients:
            return []
                
        minIndex = FoodData.findMinIndex(nutrients, minValue)
        maxIndex = FoodData.findMaxIndex(nutrients, maxValue, minIndex)
        
        if maxIndex < minIndex:
            return []

        matchingNutrientAndFoods = nutrients[minIndex:maxIndex + 1]
        
        return [f.fdcId for f in matchingNutrientAndFoods]
    

    @staticmethod
    def findMinIndex(nutrients: list[NutrientAndFood], value: float):
        low = 0
        high = len(nutrients) - 1
        mid = 0
        minIndex = mid

        while low <= high:
            mid = (high + low) // 2
            if nutrients[mid].nutrientValue < value:
                low = mid + 1            
            elif nutrients[mid].nutrientValue > value:
                high = mid - 1
                minIndex = mid        
            else:
                return mid
                                
        return minIndex
    

    @staticmethod
    def findMaxIndex(nutrients: list[NutrientAndFood], value: float, minIndex: int):
        low = minIndex
        high = len(nutrients) - 1
        mid = 0
        maxIndex = mid

        while (low <= high):
            mid = (high + low) // 2
            if nutrients[mid].nutrientValue < value:
                low = mid + 1
                maxIndex = mid            
            elif nutrients[mid].nutrientValue > value:
                high = mid - 1            
            else:
                return mid        

        return maxIndex
    

                    
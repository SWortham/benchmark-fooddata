import { Food } from './models/food';
import FoodDataJson from './data/food-data.json';

// @ts-ignore
const getFdcID = f => f.fdcId;

export class FoodData {
  // contains Foods with fdcId as a key
  foodMap = new Map<number, Food>();

  // contains nutrients and their corresponding foods with nutrient id as a key
  nutrientMap = new Map<number, NutrientAndFood[]>();

  load() {
    const foods = (FoodDataJson as any).FoundationFoods as Food[];

    for (const food of foods) {
      this.foodMap.set(food.fdcId, food);

      for (const foodNutrient of food.foodNutrients) {
        let foodNutrients = this.nutrientMap.get(foodNutrient.nutrient.id);

        if (!foodNutrients) {
          foodNutrients = [];
        }

        foodNutrients.push({
          nutrientValue: foodNutrient.amount,
          fdcId: food.fdcId
        } as NutrientAndFood);

        this.nutrientMap.set(foodNutrient.nutrient.id, foodNutrients);
      }
    }

    for (let [key, nutrientAndFoods] of this.nutrientMap) {
      nutrientAndFoods = nutrientAndFoods.filter(f => f.nutrientValue);
      nutrientAndFoods.sort((a,b) => a.nutrientValue - b.nutrientValue);
      this.nutrientMap.set(key, nutrientAndFoods);
    }
  }

  filterByNutrient(nutrientId: number, minValue: number, maxValue: number) {
    const nutrients = this.nutrientMap.get(nutrientId);
    if (nutrients === undefined) return [];

    const minIndex = this.findMinIndex(nutrients, minValue);

    return nutrients.substring(
      minIndex, this.findMaxIndex(nutrients, maxValue, minIndex) + 1
    ).map(getFdcID);
  }

  private findMinIndex(nutrients: NutrientAndFood[], value: number) {
    let low = 0, high = nutrients.length, mid = 0, minIndex = mid;

    while (low <= high) {
      mid = Math.floor((high + low) / 2);

      if (nutrients[mid].nutrientValue < value) low = mid + 1;
      else if (nutrients[mid].nutrientValue > value) {
        high = mid - 1;
        minIndex = mid;
      }
      else return mid;  
    }

    return minIndex;
  }

  private findMaxIndex(nutrients: NutrientAndFood[], value: number, minIndex: number) {
    let low = minIndex, high = nutrients.length - 1, mid = 0, maxIndex = mid;

    while (low <= high) {
      mid = Math.floor((high + low) / 2);
      if (nutrients[mid].nutrientValue < value) {
        low = mid + 1;
        maxIndex = mid;
      }
      else if (nutrients[mid].nutrientValue > value) high = mid - 1;
      else return mid;
    }

    return maxIndex;
  }  
}

export interface NutrientAndFood {
  nutrientValue: number;
  fdcId: number;
}

using System.Collections.Generic;


public class FoodData
{
  public class NutrientAndFood
  {
    public float nutrientValue { get; set; }
    public int fdcId { get; set; }
  }

  // contains Foods with fdcId as a key
  private Dictionary<int, Food> foodMap = new Dictionary<int, Food>();

  // contains nutrients and their corresponding foods with nutrient id as a key
  private Dictionary<int, List<NutrientAndFood>> nutrientMap = new Map<number, List<NutrientAndFood>>();

  public async Task load()
  {
    FoundationFoods foundationFoods = await JsonFileReader.ReadAsync<FoundationFoods>(@"data/food-data.json");
    var foods = foundationFoods.FoundationFoods;

    foreach (var food in foods)
    {
      this.foodMap.Add(food.fdcId, food);

      foreach (var foodNutrient in food.foodNutrients)
      {
        var foodNutrients = this.nutrientMap[foodNutrient.nutrient.id];

        if (!foodNutrients)
        {
          foodNutrients = new();
        }

        foodNutrients.Add(new NutrientAndFood
        {
          nutrientValue = foodNutrient.
        })

        foodNutrients.push({
        nutrientValue: foodNutrient.amount,
          fdcId: food.fdcId
        } as NutrientAndFood);

        this.nutrientMap.set(foodNutrient.nutrient.id, foodNutrients);
      }
    }

    // for (let[key, nutrientAndFoods] of this.nutrientMap)
    // {
    //   nutrientAndFoods = nutrientAndFoods.filter(f => f.nutrientValue);
    //   nutrientAndFoods.sort((a, b) => a.nutrientValue - b.nutrientValue);
    //   this.nutrientMap.set(key, nutrientAndFoods);
    // }
  }
}
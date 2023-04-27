using System;
using System.IO;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

public class FoodData
{
	public class NutrientAndFood
	{
		public float nutrientValue { get; set; }
		public int fdcId { get; set; }
	}

	// contains Foods with fdcId as a key
	private readonly Dictionary<int, Food> foodMap = new();

	// contains nutrients and their corresponding foods with nutrient id as a key
	private readonly Dictionary<int, List<NutrientAndFood>> nutrientMap = new();

	public static class JsonFileReader
	{
		public static async Task<T> ReadAsync<T>(string filePath)
		{
			using FileStream stream = File.OpenRead(filePath);
			return await JsonSerializer.DeserializeAsync<T>(stream);
		}
	}

	public async Task load()
	{
		var foundationFoods = await JsonFileReader.ReadAsync<FoundationFood>(@"data/food-data.json");
		var foods = foundationFoods.FoundationFoods;

		foreach (var food in foods)
		{
			this.foodMap.Add(food.fdcId, food);

			foreach (var foodNutrient in food.foodNutrients)
			{
				this.nutrientMap.TryGetValue(foodNutrient.nutrient.id, out var foodNutrients);

				foodNutrients ??= new();

				foodNutrients.Add(new NutrientAndFood
				{
					nutrientValue = foodNutrient.amount,
					fdcId = food.fdcId
				});

				this.nutrientMap[foodNutrient.nutrient.id] = foodNutrients;
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
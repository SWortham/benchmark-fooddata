using System;
using System.IO;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;
using static System.Runtime.InteropServices.JavaScript.JSType;

public class FoodData
{
	public class NutrientAndFood
	{
		public float nutrientValue { get; set; }
		public int fdcId { get; set; }
	}

	// contains Foods with fdcId as a key
	public readonly Dictionary<int, Food> foodMap = new();

	// contains nutrients and their corresponding foods with nutrient id as a key
	public readonly Dictionary<int, List<NutrientAndFood>> nutrientMap = new();

	public static class JsonFileReader
	{
		public static async Task<T> ReadAsync<T>(string filePath)
		{
			using FileStream stream = File.OpenRead(filePath);
			return await JsonSerializer.DeserializeAsync<T>(stream);
		}
	}

	public async Task Load()
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

		foreach (var key in this.nutrientMap.Keys)
		{
			this.nutrientMap[key] = this.nutrientMap[key].OrderBy(f => f.nutrientValue).ToList();
		}
	}
	
	public IEnumerable<int> FilterByNutrient(int nutrientId, float minValue, float maxValue)
	{
		this.nutrientMap.TryGetValue(nutrientId, out var nutrients);

		if (nutrients == null)
		{
			return Array.Empty<int>();
		}

		var minIndex = FindMinIndex(nutrients, minValue);
		var maxIndex = FindMaxIndex(nutrients, maxValue, minIndex);

		if (maxIndex < minIndex) {
			return Array.Empty<int>();
		}

		var fdcIds = new List<int>(maxIndex - minIndex + 1);

		for (int i = 0; i < fdcIds.Count; i++) 
		{
			var nutrientIndex = i + minIndex;
			fdcIds[i] = nutrients[nutrientIndex].fdcId;
		}

		return fdcIds;
	}

	private int FindMinIndex(List<NutrientAndFood> nutrients, float value)
	{
		var low = 0;
		var high = nutrients.Count;
		var mid = 0;
		var minIndex = mid;

		while (low <= high)
		{
			mid = (int)Math.Floor((high + low) / 2d);

			if (nutrients[mid].nutrientValue < value)
			{
				low = mid + 1;
			}
			else if (nutrients[mid].nutrientValue > value)
			{
				high = mid - 1;
				minIndex = mid;
			}
			else
			{
				return mid;
			}
		}

		return minIndex;
	}

	private int FindMaxIndex(List<NutrientAndFood> nutrients, float value, int minIndex)
	{
		var low = minIndex;
		var high = nutrients.Count - 1;
		var mid = 0;
		var maxIndex = mid;

		while (low <= high)
		{
			mid = (int)Math.Floor((high + low) / 2d);
			if (nutrients[mid].nutrientValue < value)
			{
				low = mid + 1;
				maxIndex = mid;
			}
			else if (nutrients[mid].nutrientValue > value)
			{
				high = mid - 1;
			}
			else
			{
				return mid;
			}
		}

		return maxIndex;
	}
}

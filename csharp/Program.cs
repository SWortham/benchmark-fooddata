
using Microsoft.AspNetCore.Hosting.Server;

var foodData = new FoodData();
await foodData.Load();

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/food/{id}", (int id) => {
	foodData.foodMap.TryGetValue(id, out var food);

	if (food == null)
	{
		return Results.NotFound();
	}

	return Results.Ok(food);
});

app.MapGet("/search/nutrients/{nutrients}", (string nutrients) =>
{
	var nutrientIdAndRange = nutrients.Split(":");
	var nutrientId = int.Parse(nutrientIdAndRange[0]);
	var minMax = nutrientIdAndRange[1].Split("-");
	var minValue = int.Parse(minMax[0]);
	var maxValue = int.Parse(minMax[1]);
	var matchingFdcIds = foodData.FilterByNutrient(nutrientId, minValue, maxValue);
	return Results.Ok(matchingFdcIds);
});
	
app.Run();

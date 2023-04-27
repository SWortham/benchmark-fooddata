
using Microsoft.AspNetCore.Hosting.Server;

var foodData = new FoodData();
await foodData.load();

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
	
app.Run();

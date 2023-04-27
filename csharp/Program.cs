
var foodData = new FoodData();
await foodData.load();

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/food/{id}", () => "Hello World!");

app.Run();

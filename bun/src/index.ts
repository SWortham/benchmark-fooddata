import { Hono } from 'hono'
import { FoodData } from './food-data';

const foodData = new FoodData();
console.time('Loaded data');
foodData.load();
console.timeEnd("Loaded data");

const app = new Hono();


// Parameters:
// id = fdcId for food
// Response:
// complete json of food
app.get('/food/:id', (c) => {
  const id = c.req.param("id");
  const fdcId = parseInt(id);
  const food = foodData.foodMap.get(fdcId);

  if (!food) {
    return c.notFound();
  }

  return c.json(food);
});

// Parameters: 
// nutrients = id1:minValue-maxValue,id2:minValue-maxValue
// Response:
// array of fdcId of each matching food
app.get('/search/nutrients/:nutrients', (c) => {
  const nutrientFilter = c.req.param("nutrients");

  const nutrientIdAndRange = nutrientFilter.split(":");
  const nutrientId = parseInt(nutrientIdAndRange[0]);
  const [minValueString, maxValueString] = nutrientIdAndRange[1].split("-");
  const minValue = parseFloat(minValueString);
  const maxValue = parseFloat(maxValueString);    
  const matchingFdcIds = foodData.filterByNutrient(nutrientId, minValue, maxValue);
  return c.json(matchingFdcIds);
})

export default {
  port: 3000,
  fetch: app.fetch,
}

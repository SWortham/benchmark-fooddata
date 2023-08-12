/// <reference types='bun-types' />
import { FoodData } from './food-data';

const foodData = new FoodData();
console.time('Loaded data');
foodData.load();
console.timeEnd("Loaded data");
const { foodMap } = foodData;

const notFoundOpts = { status: 404 }, 
  baseURLLen = 'http://127.0.0.1:3000/'.length;

const FOOD_BASE_URL = "food/", FOOD_BASE_LEN = baseURLLen + FOOD_BASE_URL.length;
const SEARCH_BASE_URL = "search/nutrients/", SEARCH_BASE_LEN = baseURLLen + SEARCH_BASE_URL.length;

function getFood(req: Request) {
  const food = foodMap.get(
    // Get the ID
    parseInt(req.url.substring(FOOD_BASE_LEN))
  );

  if (food === undefined) return new Response(null, notFoundOpts);
  return Response.json(food);
}

function getSearchByNutrient(req: Request) {
  // Get the sliced path and split
  const nutrientIdAndRange = req.url.substring(SEARCH_BASE_LEN).split(":"),
    minAndMax = nutrientIdAndRange[1].split("-");
  return Response.json(
    foodData.filterByNutrient(
      // Nutrient ID
      parseInt(nutrientIdAndRange[0]), 
      // Min
      parseFloat(minAndMax[0]), 
      // Max
      parseFloat(minAndMax[1])
    )
  );
}

Bun.serve({
  fetch(req: Request) {
    // Do not allocate memory in request whenever possible
    if (req.url.indexOf(FOOD_BASE_URL, baseURLLen) === baseURLLen) return getFood(req);
    if (req.url.indexOf(SEARCH_BASE_URL, baseURLLen) === baseURLLen) return getSearchByNutrient(req);

    return new Response(null, notFoundOpts);
  },

    // this is called when fetch() throws or rejects
  // error(err: Error) {
  //   return new Response("uh oh! :(\n" + err.toString(), { status: 500 });
  // },

  // this boolean enables bun's default error handler
  development: false,
  // note: this isn't node, but for compatibility bun supports process.env + more stuff in process

  // SSL is enabled if these two are set
  // certFile: './cert.pem',
  // keyFile: './key.pem',

  port: 3000, // number or string

  hostname: '0.0.0.0',

   baseURI: 'http://0.0.0.0:3000'
});

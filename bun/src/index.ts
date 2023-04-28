import { FoodData } from './food-data';

const foodData = new FoodData();
console.time('Loaded data');
foodData.load();
console.timeEnd("Loaded data");

const FOOD_BASE_URL = "/food/";
const SEARCH_BASE_URL = "/search/nutrients/";

function getFood(path: string) {
  const url = path.replace(FOOD_BASE_URL, "");
  const id = url;
  const fdcId = parseInt(id);
  const food = foodData.foodMap.get(fdcId);

  if (!food) {
    return new Response(undefined, {status: 404});
  }

  return new Response(JSON.stringify(food));
}

function getSearchByNutrient(path: string) {
  const nutrientFilter = path.replace(SEARCH_BASE_URL, "");
  const nutrientIdAndRange = nutrientFilter.split(":");
  const nutrientId = parseInt(nutrientIdAndRange[0]);
  const [minValueString, maxValueString] = nutrientIdAndRange[1].split("-");
  const minValue = parseFloat(minValueString);
  const maxValue = parseFloat(maxValueString);    
  const matchingFdcIds = foodData.filterByNutrient(nutrientId, minValue, maxValue);
  return new Response(JSON.stringify(matchingFdcIds));
}


Bun.serve({
  fetch(req: Request) {
    const url = new URL(req.url);
    const path = url.pathname;

    if (path.startsWith(FOOD_BASE_URL)) {
      return getFood(path);
    }
    else if (path.startsWith(SEARCH_BASE_URL)) {
      return getSearchByNutrient(path);
    }

    return new Response(undefined, {status: 404});
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
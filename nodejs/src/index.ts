import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { FoodData } from './food-data'

const server: FastifyInstance = Fastify({disableRequestLogging: true, })
const foodData = new FoodData();

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}

// Parameters:
// id = fdcId for food
// Response:
// complete json of food
server.get('/food/:id', opts, async (request, reply) => {
  const { id } = request.params as any;
  const fdcId = parseInt(id);
  const food = foodData.foodMap.get(fdcId);

  if (!food) {
    return reply.callNotFound();
  }

  return reply.code(200).send(JSON.stringify(food));
})

// Parameters: 
// nutrients = id1:minValue-maxValue,id2:minValue-maxValue
// Response:
// array of fdcId of each matching food
server.get('/search/nutrients/:nutrients', async (request, reply) => {
  const { nutrientFilter } = request.params as Record<string, string>;

  const nutrientIdAndRange = nutrientFilter.split(":");
  const nutrientId = parseInt(nutrientIdAndRange[0]);
  const [minValueString, maxValueString] = nutrientIdAndRange[1].split("-");
  const minValue = parseInt(minValueString);
  const maxValue = parseInt(maxValueString);    
  const matchingFdcIds = foodData.filterByNutrient(nutrientId, minValue, maxValue);
  return reply.code(200).send(JSON.stringify(matchingFdcIds));
})

const start = async () => {
  try {
    console.time('Loading data');
    foodData.load();
    console.timeEnd("Loading data");
    
    await server.listen({ port: 3000 })
    console.log("Server has started")
  } catch (err) {
    console.error({err});
    server.log.error(err)
    process.exit(1)
  }
}
start()
import json
from flask import Flask, make_response, request
from flask_restful import Api, Resource, reqparse
import logging
from food_data import FoodData

API_BASE_URL = '/api/v1.0'

app = Flask(__name__)

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

api = Api(app)

@api.representation('application/json')
def output_json(data, code, headers=None):
    resp = make_response(json.dumps(data, default = lambda x: x.__dict__), code)
    resp.headers.extend(headers or {})
    return resp

app.logger.info("Starting application...")

foodData = FoodData()
foodData.load()

class FoodApi(Resource):
    decorators = []

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type=str, required=True,
                                help='Foods',
                                location='json')
        self.reqparse.add_argument('description', type=str, default="",
                                location='json')
        super(FoodApi, self).__init__()

    def get(self, id: int):
        food = foodData.foodMap[id]

        if not food:
          return None, 404

        return food

class SearchApi(Resource):
    decorators = []
    
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type=str, required=True,
                                help='Search by nutrients',
                                location='json')
        self.reqparse.add_argument('description', type=str, default="",
                                location='json')
        super(SearchApi, self).__init__()
        
    def get(self, nutrients: str):
        nutrientIdAndRange = nutrients.split(":")
        nutrientId = int(nutrientIdAndRange[0])
        [minValueString, maxValueString] = nutrientIdAndRange[1].split("-")
        minValue = float(minValueString)
        maxValue = float(maxValueString)
        matchingFdcIds = foodData.filterByNutrient(nutrientId, minValue, maxValue)
        return matchingFdcIds

        

api.add_resource(FoodApi, '/food/<int:id>', endpoint='food')
api.add_resource(SearchApi, '/search/nutrients/<nutrients>', endpoint='search')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
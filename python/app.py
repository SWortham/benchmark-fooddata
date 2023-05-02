import json
from flask import Flask, make_response, request
from flask_restful import Api, Resource, reqparse
from flask_compress import Compress
from logging import ERROR
from food_data import FoodData

API_BASE_URL = '/api/v1.0'

app = Flask(__name__)
app.config['COMPRESS_ALGORITHM'] = 'gzip'
Compress(app)

api = Api(app)

@api.representation('application/json')
def output_json(data, code, headers=None):
    resp = make_response(json.dumps(data, default = lambda x: x.__dict__), code)
    resp.headers.extend(headers or {})
    return resp

app.logger.setLevel(ERROR)

app.logger.info("Starting application...")

foodData = FoodData()
foodData.load()

class FoodApi(Resource):
    decorators = []

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type=str, required=True,
                                help='Car search',
                                location='json')
        self.reqparse.add_argument('description', type=str, default="",
                                location='json')
        super(FoodApi, self).__init__()

    def get(self, id: int):
        food = foodData.foods[id]

        if not food:
          return None, 404

        return food


api.add_resource(FoodApi, '/food/<int:id>', endpoint='food')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
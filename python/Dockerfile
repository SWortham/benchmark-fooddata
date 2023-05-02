FROM python:3.11.3-alpine3.17

WORKDIR /app

COPY python/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY python/ .
COPY ./food-data.json ./data/

CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=3000"]
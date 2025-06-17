from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
cors = CORS(app, origins='*')
API_KEY = os.getenv("API_KEY")

@app.route("/", methods=['GET'])
def root():
    return jsonify(
        {
            "users": [
                'This',
                'is',
                'new'
            ]
        }
    )

@app.route("/api/stock/<symbol>")
def get_stock_price(symbol):
    url = f'https://finnhub.io/api/v1/quote?symbol={symbol}&token={API_KEY}'
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
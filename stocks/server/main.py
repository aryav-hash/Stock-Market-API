from flask import Flask, jsonify
from flask_cors import CORS
from alpha_vantage.timeseries import TimeSeries

app = Flask(__name__)
cors = CORS(app, origins='*')

API_KEY = "d183bg1r01ql1b4lhm10d183bg1r01ql1b4lhm1g"

@app.route('/api/stock/<ticker>')
def get_stock_data(ticker):
    ts = TimeSeries(key=API_KEY, output_format='pandas')
    data, _ = ts.get_daily(symbol=ticker, outputsize='compact')

    print(data.head())

    closes = data['4. close'].tail(30)
    closes_dict = {str(k): v for k, v in closes.to_dict().items()}
    return jsonify(closes_dict)

@app.route("/api/test", methods=['GET'])
def test():
    return jsonify(
        {
            "users": [
                'aryav',
                'yadav',
                'narayan'
            ]
        }
    )

@app.route('/api/info/<ticker>')
def get_stock_info(ticker):
    ts = TimeSeries(key=API_KEY)
    quote, _ = ts.get_quote_endpoint(symbol=ticker)
    return jsonify(quote)

if __name__ == "__main__":
    app.run(debug=True)
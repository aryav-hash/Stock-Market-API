from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

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

if __name__ == "__main__":
    app.run(debug=True)
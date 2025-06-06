from flask import Flask, jsonify
from flask_cors import CORS
from sensor_read import get_sensor_data  # Import your sensor function

app = Flask(__name__)
CORS(app)

@app.route("/api/data")
def get_data():
    data = get_sensor_data()  # Use real sensor simulation
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)

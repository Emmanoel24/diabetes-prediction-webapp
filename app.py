from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load model and scaler
model = joblib.load("diabetes_model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()  # Get JSON data from JavaScript
        features = np.array([data["features"]]).reshape(1, -1)
        scaled = scaler.transform(features)
        prediction = model.predict(scaled)[0]

        result = "Diabetic 🩺" if prediction == 1 else "Not Diabetic ✅"
        return jsonify({"prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
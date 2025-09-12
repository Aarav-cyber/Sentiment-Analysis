from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

# Load model and vectorizer
vectorizer = joblib.load(r"C:\Python\Sentiment Analysis\ml\vectorizer.joblib")
model = joblib.load(r"C:\Python\Sentiment Analysis\ml\sentiment_model.joblib")


app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask API is running!"})


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "No text provided"}), 400

    # Transform input using saved vectorizer
    X = vectorizer.transform([text]).toarray()
    prediction = model.predict(X)[0]
    probability = model.predict_proba(X)[0][prediction]

    return jsonify({
        "label": int(prediction),
        "probability": float(probability)
    })

if __name__ == "__main__":
    app.run(port=8000, debug=True)

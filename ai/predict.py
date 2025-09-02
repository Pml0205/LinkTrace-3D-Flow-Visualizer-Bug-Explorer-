import joblib

# Load trained model
model = joblib.load("bug_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

def predict_code(code_snippet: str):
    X = vectorizer.transform([code_snippet])
    prediction = model.predict(X)[0]
    return "Bug detected ❌" if prediction == 1 else "No bug ✅"

# Example test
if __name__ == "__main__":
    test_code = "for i in range(10)"
    print(predict_code(test_code))

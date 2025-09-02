import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# Example dataset: code snippets and labels
# (0 = no bug, 1 = bug found)
data = [
    "int x = 10", 0,
    "console.log('Hello')", 0,
    "for i in range(10)", 1,   # missing colon
    "print('Hello'", 1         # missing parenthesis
]

texts = [data[i] for i in range(0, len(data), 2)]
labels = [data[i] for i in range(1, len(data), 2)]

# Convert text into features
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

# Train model
model = MultinomialNB()
model.fit(X, labels)

# Save model and vectorizer
joblib.dump(model, "bug_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("✅ Model trained and saved as bug_model.pkl & vectorizer.pkl")

from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

# Load model & vectorizer
model = joblib.load("bug_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Dummy dependency analyzer (use your existing logic)
def extract_dependencies(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    import re
    regex = r'import .* from [\'"](.*)[\'"]'
    return re.findall(regex, content)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    folder = data.get("folder")

    if not folder or not os.path.exists(folder):
        return jsonify({"error": "Folder not found"}), 400

    nodes = []
    links = []
    files_result = []

    for file_name in os.listdir(folder):
        file_path = os.path.join(folder, file_name)
        if os.path.isfile(file_path) and file_name.endswith((".js", ".jsx", ".ts", ".tsx")):
            nodes.append({"id": file_name})

            # Dependency extraction
            deps = extract_dependencies(file_path)
            for dep in deps:
                links.append({"source": file_name, "target": dep})

            # Bug prediction
            with open(file_path, "r", encoding="utf-8") as f:
                code = f.read()
            X = vectorizer.transform([code])
            pred = model.predict(X)[0]
            files_result.append({"name": file_name, "prediction": int(pred)})

    return jsonify({"nodes": nodes, "links": links, "files": files_result})


if __name__ == "__main__":
    app.run(port=5000, debug=True)

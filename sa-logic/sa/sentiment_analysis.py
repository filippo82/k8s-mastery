from textblob import TextBlob
from flask import Flask, request, jsonify
from flask_cors import CORS
# import logging
import sys

app = Flask(__name__)
CORS(app)

# logging.basicConfig(level=logging.DEBUG)

#@app.route("/analyse/sentiment", methods=['POST'])
@app.route("/sentiment", methods=['POST'])
def analyse_sentiment():
    sentence = request.get_json()['sentence']
    print(f"The sentence is: {sentence}", file=sys.stdout)
    polarity = TextBlob(sentence).sentences[0].polarity
    return jsonify(
        sentence=sentence,
        polarity=polarity,
    )

if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5000, debug=True)
    app.run(port=5000, debug=True)

# curl -i -X POST -H 'Content-Type: application/json' -d '{"sentence": "Awesome"}' localhost:5000/sentiment

import openai
import os
import json
import base64
import requests
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify
from openai import OpenAI
from PIL import Image
from io import BytesIO
from flask_cors import CORS  # Import CORS

client = OpenAI(api_key = os.environ.get("OPENAI_API_KEY"))


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# A simple in-memory store for demonstration
data_store = {}

@app.route('/data', methods=['POST'])
def post_data():
    # Get data from the request
    # data = request.json
    data = request.form['text']

    # Store data with a simple key
    # data_store['key'] = data
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    temperature=0,
   messages=[
      {"role": "system", "content": "You are an expert text analyst, skilled in understanding the text and returning exact information in Json format."},
      {"role": "user", "content": f"Give Sentiment as either Positive, Negative or Neutral. Give Emotion and also give if the comment is Gibberish or not, Give translation of comment in english. Also provide summary of topic discussed, and Suggest Improvements for 'کھانا ٹھنڈا ہو گیا کیونکہ سوار لیٹ ہو گیا تھا۔'"},
      {"role": "assistant", "content": '{"Sentiment":"Negative", "Emotion":"Disappointment", "Gibberish": "No", "Translation": "Food got cold because rider was late.", "Summary":" Delivery Issue, as rider delayed the order", "Improvements": "Delivery can be improved by taking proper route to destination and deliver on time."}'},
      {"role": "user", "content": f"Give Sentiment as either Positive, Negative or Neutral. Give Emotion and also give if the comment is Gibberish or not, Give translation of comment in english. Also provide summary of topic discussed, and Suggest Improvements for '{data}'"}
            ]
  )
    result = completion.choices[0].message.content
    converted_dict = json.loads(result)
    print(type(converted_dict))
    return converted_dict, 200

@app.route('/data', methods=['GET'])
def get_data():
    # Retrieve data
    data = data_store.get('key', {})
    return jsonify(data), 200

def encode_image(image_path):
  if image_path.mode != 'rb':
    image_path.seek(0)  # Go to the start of the file
    # Read the file's content into a BytesIO buffer
  buffer = BytesIO(image_path.read())
  # Encode the buffer's content to base64
  base64_image = base64.b64encode(buffer.getvalue()).decode('utf-8')
  return base64_image

@app.route('/submit', methods=['POST'])
def submit():
    # Check if the post request has the file part
    if 'image' not in request.files:
        return jsonify({"error": "No image part in the request"}), 400
    file = request.files['image']
    text = request.form['text']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        # Instead of saving the file, load it into a PIL Image to process in memory
        try:
            base64_image = encode_image(file)
            # Store data with a simple key
            response = client.chat.completions.create(
            model="gpt-4-vision-preview",
            temperature=0,
            messages=[
                {
                "role": "user",
                "content": [
                    {"type": "text",
                      "text": f"{text}"},
                    {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}",
                    },
                    },
                ],
                }
            ],
            max_tokens=300,
            )

            print(response.choices[0].message.content)
            return jsonify(response.choices[0].message.content), 200

            # return jsonify({
            #     "message": "Received text and image",
            #     "text": text,
            # }), 200
        except IOError:
            return jsonify({"error": "File is not a valid image"}), 400
    else:
        return jsonify({"error": "Unsupported file type"}), 400



if __name__ == '__main__':
    app.run(debug=True)


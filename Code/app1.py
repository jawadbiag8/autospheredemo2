import openai
import base64
import requests
import os
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify
from openai import OpenAI
from PIL import Image
from io import BytesIO


client = OpenAI(api_key = os.environ.get("OPENAI_API_KEY"))
 

app = Flask(__name__)

# A simple in-memory store for demonstration

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
            return jsonify(response.choices[0].message.content), 400

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
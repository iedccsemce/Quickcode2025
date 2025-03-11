from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename
from transformers import pipeline
from PIL import Image
from bs4 import BeautifulSoup
from urllib.parse import quote_plus
import requests

app = Flask(__name__)

# Configure upload folder
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load the ML model
pipe = pipeline("image-classification", model="linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification")


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/crop-disease')
def crop_disease():
    return render_template('crop_disease.html')


@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return render_template("error.html", message="No file part")

    file = request.files['image']
    if file.filename == '':
        return render_template("error.html", message="No selected file")

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Process the image with ML model
        image = Image.open(file_path)
        results = pipe(image)
        results = sorted(results, key=lambda x: x['score'], reverse=True)  # Sort by confidence

        return render_template("result.html", results=results, image_path=file_path)


@app.route('/search_disease')
def search_disease():
    query = request.args.get('query', '')

    try:
        # Search agricultural websites and databases
        sources = [
            f"https://www.planetnatural.com/pest-problem-solver/plant-disease/{quote_plus(query)}",
            f"https://extension.umn.edu/search?search={quote_plus(query)}",
            f"https://www.gardeningknowhow.com/?s={quote_plus(query)}"
        ]

        description = ""
        solutions = []
        source_list = []

        for source_url in sources[:2]:  # Limit to 2 sources for speed
            response = requests.get(source_url, timeout=5)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')

                # Extract relevant content (customize selectors based on the website structure)
                paragraphs = soup.find_all('p')[:3]  # Get first 3 paragraphs
                description += " ".join([p.text.strip() for p in paragraphs if len(p.text.strip()) > 50])

                # Look for lists that might contain solutions
                lists = soup.find_all(['ul', 'ol'])
                for lst in lists:
                    items = lst.find_all('li')
                    solutions.extend([item.text.strip() for item in items if len(item.text.strip()) > 20])

                source_list.append({
                    "url": source_url,
                    "title": soup.title.string if soup.title else "Reference"
                })

        # Clean and format the results
        description = description[:500] + "..." if len(description) > 500 else description
        solutions = list(set(solutions))[:5]  # Remove duplicates and limit to 5 solutions

        return jsonify({
            "description": description or "No detailed description available.",
            "solutions": solutions or ["No specific solutions found. Please consult with a local agricultural expert."],
            "sources": source_list
        })

    except Exception as e:
        print(f"Error fetching disease information: {str(e)}")
        return jsonify({
            "description": "Error fetching information. Please try again later.",
            "solutions": ["Unable to retrieve solutions at this time."],
            "sources": []
        }), 500


if __name__ == '__main__':
    app.run(debug=True)

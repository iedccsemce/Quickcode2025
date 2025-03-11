# Crop-Disease-Classifier
   ## Project Description
   A sophisticated web application that leverages artificial intelligence to detect and diagnose crop diseases. The system provides instant analysis of crop images, offering detailed disease identification, confidence scores, and recommended treatment solutions. This tool aims to assist farmers and agricultural experts in making informed decisions about crop health management.

   ## Team Members and Roles
   - Hashim Ahammad - Frontend Web Development
   - Sacheth Sivaprasad - Backend Web Development
   - Kiran P - AI Model Integration
   - Aldo Micheal -AI Model Integration 

   ## Technologies Used
   - **Frontend:**
   - HTML5
   - CSS3
   - JavaScript
   - Bootstrap 5.3.0
   - Font Awesome 6.0.0

   - **Backend:**
   - Python 3.x
   - Flask (Web Framework)
   - Transformers (Hugging Face)
   - Pillow (PIL)
   - BeautifulSoup4
   - Requests

   - **Machine Learning:**
   - MobileNetV2 (Pre-trained model)
   - Hugging Face Transformers

   ## Installation Guide

   ### Prerequisites
   - Python 3.7 or higher
   - pip (Python package installer)
   - Git

   ### Step-by-Step Installation

   1. **Clone the Repository**
      ```bash
      git clone https://github.com/yourusername/crop-disease-prediction.git
      cd crop-disease-prediction
      ```

   2. **Create and Activate Virtual Environment**
      ```bash
      # Windows
      python -m venv venv
      .\venv\Scripts\activate

      # Linux/Mac
      python3 -m venv venv
      source venv/bin/activate
      ```

   3. **Install Dependencies**
      ```bash
      pip install -r requirements.txt
      ```

   4. **Set Up Environment Variables**
      - Create a `.env` file in the root directory
      - Add any necessary environment variables (if required)

   5. **Run the Application**
      ```bash
      python main.py
      ```

   6. **Access the Application**
      - Open your web browser
      - Navigate to `http://localhost:5000`

   ### Project Structure
   ```
   crop-disease-prediction/
   ├── static/
   │   ├── uploads/
   │   └── js/
   │       └── disease_solutions.js
   ├── templates/
   │   ├── home.html
   │   ├── crop_disease.html
   │   └── result.html
   ├── main.py
   ├── requirements.txt
   └── README.md
   ```

   ## Usage
   1. Visit the home page
   2. Click "Start Detection" to begin
   3. Upload a clear image of the affected crop
   4. View the analysis results and recommended solutions
   5. Access additional information and treatment suggestions


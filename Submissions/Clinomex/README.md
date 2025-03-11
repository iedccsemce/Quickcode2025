# ClinomeX

# Medical Risk Assessment Platform

A comprehensive web application for analyzing patient data to assess cancer and diabetes risk based on genetic markers and personal health metrics.

![Medical Risk Assessment Platform]

## Overview

This application provides a user-friendly interface for healthcare professionals to input patient data and receive risk assessments for cancer and diabetes. The platform uses machine learning models to analyze genetic markers, personal health metrics, and clinical notes to generate comprehensive risk profiles.

## Features

- **Patient Profile Management**: Load predefined age-based risk profiles or input custom patient data
- **Genetic Marker Analysis**: Input and analyze FISH method genetic markers (CT, AF, MIS)
- **Clinical Notes Processing**: Natural language processing of clinical notes using Bio_ClinicalBERT
- **Risk Visualization**: Interactive gauges and charts to visualize risk assessments
- **Detailed Risk Analysis**: Comprehensive breakdown of risk factors and their impact
- **Responsive UI**: Modern, interactive interface with particle animation background

## Technologies Used

- **Streamlit**: Web application framework
- **PyTorch & Transformers**: For NLP analysis of clinical notes
- **Scikit-learn**: For machine learning models
- **Plotly**: For interactive data visualization
- **NumPy**: For numerical operations
- **Hugging Face**: For accessing pre-trained clinical language models

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/medical-risk-assessment.git
cd medical-risk-assessment
```

2. Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install the required packages:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file with your Hugging Face token:

```
HUGGINGFACE_TOKEN=your_huggingface_token_here
```

## Usage

1. Run the Streamlit application:

```bash
streamlit run main.py
```

2. Open your web browser and navigate to the URL displayed in the terminal (typically http://localhost:8501)

3. Input patient data using the sidebar:
   - Select an age profile or enter custom patient information
   - Input genetic markers (CT, AF, MIS)
   - Add clinical notes
   - Click "Run Analysis" to generate risk assessments

## Example Workflow

1. Select an age profile (e.g., "Middle-aged (36-55)")
2. Click "Load Profile" to populate the form with default values
3. Adjust any parameters as needed
4. Add relevant clinical notes
5. Click "Run Analysis" to generate risk assessments
6. Review the visualizations and detailed risk information

## Requirements

Create a `requirements.txt` file with the following dependencies:

```
streamlit>=1.22.0
numpy>=1.24.3
torch>=2.0.1
transformers>=4.29.2
scikit-learn>=1.2.2
plotly>=5.14.1
python-dotenv>=1.0.0
```

## Disclaimer

This medical risk assessment tool is for educational purposes only. The risk calculations are based on simulated models and may not accurately reflect actual medical risk. Always consult with healthcare professionals for actual medical advice and diagnosis.

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

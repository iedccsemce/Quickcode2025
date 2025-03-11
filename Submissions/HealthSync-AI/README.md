

# HealthSync AI 🩺 🧠

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![MONAI](https://img.shields.io/badge/MONAI-Imaging-green)
![Gradio](https://img.shields.io/badge/Gradio-Interface-orange)
![Python](https://img.shields.io/badge/Python-3.8+-yellow)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

> Medical Imaging Analysis & Lifestyle Recommendations in one comprehensive platform

## ✨ Overview

HealthSync AI is a versatile healthcare application that bridges the gap between clinical diagnostics and everyday wellness. Combining advanced MONAI-powered medical image analysis with personalized lifestyle recommendations, this platform serves healthcare professionals and health-conscious individuals alike.

## 🚀 Features

### 🔬 Medical Imaging Analysis

Production-grade tools powered by MONAI deep learning models:

- **🔍 Image Segmentation** - Precise detection of regions of interest in medical images
- **📊 Classification** - Abnormality detection with confidence scoring
- **🔥 Burn Detection** - Severity assessment and affected area quantification
- **🔎 Skin Cancer Screening** - Analysis of potential malignancy in skin lesions

### 🌱 Lifestyle Recommendations

Demo implementation of personalized health guidance:

- **📖 Storytelling** - Customized health narratives based on themes and preferences
- **🎵 Music Therapy** - Mood and activity-based musical recommendations
- **🥗 Nutrition** - Dietary suggestions aligned with health goals
- **🏃‍♀️ Exercise Planning** - Activity recommendations based on fitness level and constraints

## 📋 Requirements

- Python 3.8+
- PyTorch
- MONAI
- Gradio
- NumPy
- Pillow

## 💻 Installation

```bash
# Clone the repository
git clone https://github.com/aadvaitav/HealthSync-AI-Medical-Imaging-Analysis-Lifestyle-Recommendations.git
cd HealthSync-AI-Medical-Imaging-Analysis-Lifestyle-Recommendations

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## 🔧 Usage

```bash
python app.py
```


## 🖼️ Screenshots
<p align="center">
  <img src="https://github.com/user-attachments/assets/488a77fc-3645-4c83-9095-2a3ceff24efc" width="45%" />
  <img src="https://github.com/user-attachments/assets/f68c5a9f-835d-4375-8e0c-4b22d94416cf" width="45%" />
  <img src="https://github.com/user-attachments/assets/0b517370-5a7e-46b0-8fb1-22343b3d85fb" width="45%" />
  <img src="https://github.com/user-attachments/assets/0e04685b-1d6f-4f11-a134-11c521668551" width="45%" />
</p>

## 📁 Project Structure

```
healthsync-ai/
│
├── app.py                 # Main application file
├── models/                # AI model storage
│   ├── segmentation_model.pth
│   ├── classification_model.pth
│   ├── burn_detection_model.pth
│   └── skin_cancer_model.pth
│
├── requirements.txt       # Dependencies
└── README.md              # Documentation
```

## 🔍 Technical Details

- Medical imaging models: DenseNet121 and UNet architectures
- Interface: Gradio web application
- Image processing: NumPy and Pillow

## 🔮 Future Development

- 📱 Mobile application integration
- 🔄 Real-time health monitoring
- 🤖 Advanced personalization algorithms
- 🌐 Telemedicine capabilities
- 📊 Expanded analysis modalities

## 📄 License

[MIT License](LICENSE)

## 🙏 Acknowledgments

- [MONAI](https://monai.io/) for medical imaging frameworks
- [Gradio](https://gradio.app/) for the interactive web interface
- [PyTorch](https://pytorch.org/) for the deep learning backend

---

<p align="center">
  Made with ❤️ for advancing healthcare technology
</p>

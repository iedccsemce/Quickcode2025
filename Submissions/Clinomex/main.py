import os
import streamlit as st
import numpy as np
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from sklearn.linear_model import LogisticRegression
import plotly.graph_objects as go
import plotly.express as px
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

# ----------------------------
# DNA Analysis Parameters
# ----------------------------
DNA_PARAMS = {
    'ct': {'min': 20, 'max': 40, 'step': 1, 'default': 30},
    'af': {'min': 0.0, 'max': 1.0, 'step': 0.01, 'default': 0.5},
    'mis': {'min': 0, 'max': 100, 'step': 1, 'default': 20}
}

# ----------------------------
# Age-based risk profiles for testing
# ----------------------------
AGE_PROFILES = {
    "Child (5-12)": {"age": 8, "height": 130, "weight": 30, "ct": 22, "af": 0.1, "mis": 5},
    "Teenager (13-19)": {"age": 16, "height": 170, "weight": 60, "ct": 24, "af": 0.2, "mis": 10},
    "Young Adult (20-35)": {"age": 28, "height": 175, "weight": 70, "ct": 26, "af": 0.3, "mis": 15},
    "Middle-aged (36-55)": {"age": 45, "height": 172, "weight": 80, "ct": 32, "af": 0.6, "mis": 40},
    "Senior (56-70)": {"age": 65, "height": 168, "weight": 75, "ct": 36, "af": 0.7, "mis": 60},
    "Elderly (71+)": {"age": 78, "height": 165, "weight": 68, "ct": 38, "af": 0.8, "mis": 80}
}

# ----------------------------
# Input Components
# ----------------------------
def create_input_panel():
    with st.sidebar:
        st.header("Patient Information")
        
        # Age profile selector
        profile = st.selectbox(
            "Select age profile for testing",
            list(AGE_PROFILES.keys()),
            index=2  # Default to young adult
        )
        
        if "profile_selected" not in st.session_state:
            st.session_state.profile_selected = False
            
        if st.button("Load Profile"):
            st.session_state.profile_selected = True
            st.session_state.selected_profile = AGE_PROFILES[profile]
            
        # Create columns for better organization
        col1, col2 = st.columns(2)
        
        with col1:
            # Use profile values if selected, otherwise use defaults
            default_age = st.session_state.selected_profile["age"] if "selected_profile" in st.session_state else 50
            age = st.number_input("Age", 1, 120, default_age)
            
            default_height = st.session_state.selected_profile["height"] if "selected_profile" in st.session_state else 170
            height = st.number_input("Height (cm)", 50, 250, default_height)
        
        with col2:
            default_weight = st.session_state.selected_profile["weight"] if "selected_profile" in st.session_state else 70
            weight = st.number_input("Weight (kg)", 20, 200, default_weight)
            
            # Auto-calculate BMI
            bmi = weight / ((height/100) ** 2)
            st.metric("BMI", round(bmi, 2))
        
        st.subheader("Genetic Markers (FISH Method)")
        
        # Use profile values if selected, otherwise use defaults
        default_ct = st.session_state.selected_profile["ct"] if "selected_profile" in st.session_state else DNA_PARAMS['ct']['default']
        ct = st.slider("Cycle Threshold (CT)", 
                      DNA_PARAMS['ct']['min'], 
                      DNA_PARAMS['ct']['max'], 
                      default_ct)
        
        default_af = st.session_state.selected_profile["af"] if "selected_profile" in st.session_state else DNA_PARAMS['af']['default']
        af = st.slider("Allele Frequency (AF)", 
                      DNA_PARAMS['af']['min'], 
                      DNA_PARAMS['af']['max'], 
                      default_af, 0.01)
        
        default_mis = st.session_state.selected_profile["mis"] if "selected_profile" in st.session_state else DNA_PARAMS['mis']['default']
        mis = st.slider("Microsatellite Instability (MIS)", 
                       DNA_PARAMS['mis']['min'], 
                       DNA_PARAMS['mis']['max'], 
                       default_mis)
        
        # Help tooltips for genetic markers
        st.markdown("""
        <div style="font-size:0.8em; color:#888;">
        <p><b>CT</b>: Lower values (20-25) indicate low risk, higher values (35-40) indicate high risk</p>
        <p><b>AF</b>: Values above 0.6 suggest significant mutation presence</p>
        <p><b>MIS</b>: Values above 50 indicate DNA repair system issues</p>
        </div>
        """, unsafe_allow_html=True)
        
        dna_details = st.text_area("Clinical Notes", 
            "Enter genetic markers, family history, or other observations...",
            height=150)
        
        submitted = st.button("Run Analysis", type="primary")
        
    return submitted, age, height, weight, bmi, ct, af, mis, dna_details

# ----------------------------
# NLP Analysis
# ----------------------------
@st.cache_resource(show_spinner="Loading clinical language model...")
def load_clinicalbert():
    model_name = "emilyalsentzer/Bio_ClinicalBERT"
    try:
        tokenizer = AutoTokenizer.from_pretrained(
            model_name,
            use_auth_token=os.getenv("HUGGINGFACE_TOKEN")
        )
        model = AutoModelForSequenceClassification.from_pretrained(
            model_name,
            use_auth_token=os.getenv("HUGGINGFACE_TOKEN")
        )
        return tokenizer, model
    except Exception as e:
        st.error(f"Model loading failed: {str(e)}")
        st.stop()

def analyze_clinical_text(text):
    tokenizer, model = load_clinicalbert()
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
    probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
    return probs[0][1].item()

# ----------------------------
# Risk Models
# ----------------------------
def train_diabetes_model():
    np.random.seed(42)
    X = np.random.rand(1000, 5)
    y = (X.sum(axis=1) > 2.5).astype(int)
    model = LogisticRegression(max_iter=1000)
    model.fit(X, y)
    return model

def train_cancer_model():
    np.random.seed(42)
    # Create more realistic cancer risk model
    # Higher CT, AF, and MIS values should correlate with higher cancer risk
    X = np.column_stack([
        np.random.uniform(20, 40, 1000),  # CT values
        np.random.uniform(0, 1, 1000),    # AF values
        np.random.uniform(0, 100, 1000)   # MIS values
    ])
    
    # Complex cancer risk model - higher values in any parameter increase risk
    # This will ensure more variation in predictions
    y = (
        (X[:, 0]/40 * 0.4 +    # CT normalized with 40% weight
         X[:, 1] * 0.3 +       # AF with 30% weight
         X[:, 2]/100 * 0.3     # MIS normalized with 30% weight
        ) > 0.55               # Threshold for positive class
    ).astype(int)
    
    # Ensure both classes are present
    if len(np.unique(y)) < 2:
        y[0] = 1
        
    model = LogisticRegression(max_iter=1000)
    model.fit(X, y)
    return model

def normalize_features(features, feature_type):
    if feature_type == 'diabetes':
        max_values = {'age': 100, 'bmi': 50, 'height': 250, 'weight': 200}
        return np.array([
            features['age']/max_values['age'],
            features['bmi']/max_values['bmi'],
            features['height']/max_values['height'],
            features['weight']/max_values['weight'],
            features['text_risk']
        ]).reshape(1, -1)  # Return 2D array
    
    elif feature_type == 'cancer':
        # Return the raw CT, AF, and MIS values for more direct influence on prediction
        return np.array([
            features['ct'],
            features['af'],
            features['mis']
        ]).reshape(1, -1)  # Return 2D array

# ----------------------------
# Visualization
# ----------------------------
def create_gauge(risk, title, colors):
    fig = go.Figure(go.Indicator(
        mode="gauge+number",
        value=risk*100,
        domain={'x': [0, 1], 'y': [0, 1]},
        title={'text': title, 'font': {'color': '#FFFFFF'}},
        gauge={
            'axis': {'range': [0, 100], 'tickwidth': 1, 'tickcolor': "#FFFFFF"},
            'bar': {'color': colors[0]},
            'steps': [
                {'range': [0, 33], 'color': colors[1]},
                {'range': [33, 66], 'color': colors[2]},
                {'range': [66, 100], 'color': colors[3]}
            ],
            'threshold': {
                'line': {'color': "white", 'width': 4},
                'thickness': 0.75,
                'value': risk*100
            }
        }
    ))
    fig.update_layout(
        height=250, 
        margin=dict(l=20, r=20, t=50, b=20),
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        font={'color': '#FFFFFF'}
    )
    return fig

def create_risk_factor_chart(features, risk_type):
    if risk_type == 'diabetes':
        # Create factors dataframe for diabetes
        factors = {
            'Factor': ['Age', 'BMI', 'Clinical Notes', 'Height', 'Weight'],
            'Impact': [
                features['age']/100 * 0.3,  # 30% impact
                features['bmi']/50 * 0.4,   # 40% impact
                features['text_risk'] * 0.2, # 20% impact
                features['height']/250 * 0.05, # 5% impact
                features['weight']/200 * 0.05  # 5% impact
            ]
        }
    else:  # cancer
        # Create factors dataframe for cancer
        factors = {
            'Factor': ['Cycle Threshold (CT)', 'Allele Frequency (AF)', 'Microsatellite Instability (MIS)'],
            'Impact': [
                (features['ct'] - 20) / 20 * 0.4,  # 40% impact, normalized
                features['af'] * 0.3,              # 30% impact
                features['mis'] / 100 * 0.3        # 30% impact
            ]
        }
    
    # Create horizontal bar chart
    fig = px.bar(
        factors, 
        y='Factor', 
        x='Impact', 
        orientation='h',
        color='Impact',
        color_continuous_scale=px.colors.sequential.Viridis,
        title="Risk Factor Analysis"
    )
    
    fig.update_layout(
        height=300,
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(20,20,20,0.5)",
        font={'color': '#FFFFFF'},
        title_font_color='#FFFFFF',
        xaxis_title="Impact on Risk Score",
        yaxis_title="",
        coloraxis_showscale=False
    )
    
    return fig

def create_disease_info_panel(cancer_risk, diabetes_risk):
    cancer_description = get_risk_description('cancer', cancer_risk)
    diabetes_description = get_risk_description('diabetes', diabetes_risk)
    
    st.markdown(f"""
    <style>
    .info-box {{
        padding: 20px;
        border-radius: 10px;
        background: linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%);
        color: #ffffff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 15px 0;
    }}
    .risk-header {{
        color: #4CAF50;
        border-bottom: 1px solid #4CAF50;
        padding-bottom: 8px;
        margin-bottom: 12px;
    }}
    </style>
    <div class="info-box">
        <h3 class="risk-header">Cancer Risk Analysis Details</h3>
        <p><b>CT (Cycle Threshold):</b> Measures PCR efficiency. Values >35 indicate high risk.</p>
        <p><b>AF (Allele Frequency):</b> Indicates mutation prevalence. Values >0.6 suggest significant mutation presence.</p>
        <p><b>MIS (Microsatellite Instability):</b> Shows DNA repair issues. Values >50 indicate DNA repair system problems.</p>
        <p><b>Assessment:</b> {cancer_description}</p>
    </div>
    
    <div class="info-box">
        <h3 class="risk-header">Diabetes Risk Analysis Details</h3>
        <p><b>BMI:</b> Body Mass Index is a key indicator; values >30 indicate obesity and higher risk.</p>
        <p><b>Age:</b> Risk increases with age, particularly after 45 years.</p>
        <p><b>Clinical Notes:</b> Family history and other factors from text analysis contribute to the risk score.</p>
        <p><b>Assessment:</b> {diabetes_description}</p>
    </div>
    """, unsafe_allow_html=True)

def get_risk_description(risk_type, risk_score):
    if risk_type == 'cancer':
        if risk_score < 0.3:
            return "Low risk profile. Regular screening recommended as per age group guidelines."
        elif risk_score < 0.6:
            return "Moderate risk profile. Consider more frequent screening and lifestyle adjustments."
        else:
            return "High risk profile. Immediate consultation with an oncologist is recommended."
    else:  # diabetes
        if risk_score < 0.3:
            return "Low risk profile. Maintain healthy lifestyle with regular exercise and balanced diet."
        elif risk_score < 0.6:
            return "Moderate risk profile. Consider glucose tolerance test and lifestyle modifications."
        else:
            return "High risk profile. Clinical evaluation recommended; may indicate prediabetes or diabetes."

# ----------------------------
# Animation and UI Enhancements
# ----------------------------
def add_particles():
    st.markdown("""
    <style>
    .stApp {
        background: #0a0a0a;
    }
    .stButton>button {
        background-color: #4CAF50;
        color: white;
        font-weight: bold;
        border-radius: 20px;
        padding: 0.5rem 1rem;
        transition: all 0.3s ease-in-out;
    }
    .stButton>button:hover {
        background-color: #388E3C;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .stSlider>div>div>div {
        background-color: #5b5b5b !important;
    }
    .stProgress .st-bo {
        background-color: #5b5b5b;
    }
    </style>
    <div id="particles-js"></div>
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    <script>
    document.addEventListener("DOMContentLoaded", function() {
        particlesJS({
            "particles": {
                "number": {"value": 80, "density": {"enable": true, "value_area": 800}},
                "color": {"value": "#5b5b5b"},
                "shape": {"type": "circle"},
                "opacity": {"value": 0.5, "random": true, "anim": {"enable": true, "speed": 1}},
                "size": {"value": 3, "random": true},
                "line_linked": {"enable": true, "color": "#5b5b5b", "opacity": 0.4},
                "move": {"enable": true, "speed": 2, "direction": "none", "random": true, "out_mode": "out"}
            },
            "interactivity": {
                "detect_on": "canvas", 
                "events": {
                    "onhover": {"enable": true, "mode": "repulse"},
                    "onclick": {"enable": true, "mode": "push"}
                }
            },
            "retina_detect": true
        });
    });
    </script>
    """, unsafe_allow_html=True)

def show_loading_animation():
    progress_bar = st.progress(0)
    for i in range(101):
        time.sleep(0.01)
        progress_bar.progress(i)
    st.success("Analysis Complete!")
    time.sleep(0.5)
    progress_bar.empty()

def add_disclaimer():
    st.markdown("""
    <div style="background-color: rgba(255, 152, 0, 0.1); border-left: 4px solid #FF9800; padding: 10px; margin: 20px 0; border-radius: 4px;">
        <h4 style="color: #FF9800; margin: 0 0 10px 0;">⚠️ IMPORTANT DISCLAIMER</h4>
        <p style="margin: 0; color: #E0E0E0;">
            This medical risk assessment tool is for educational purposes only. The risk calculations are based on simulated models and may not accurately reflect actual medical risk. Predictions may be slightly off due to the simplified nature of the models used. Always consult with healthcare professionals for actual medical advice and diagnosis.
        </p>
    </div>
    """, unsafe_allow_html=True)

# ----------------------------
# Main Application
# ----------------------------
def main():
    st.set_page_config(page_title="Medical Risk Analyzer", layout="wide")
    add_particles()
    
    # Initialize models
    if 'models_loaded' not in st.session_state:
        with st.spinner("Loading medical analysis models..."):
            st.session_state.diabetes_model = train_diabetes_model()
            st.session_state.cancer_model = train_cancer_model()
            st.session_state.clinicalbert_tokenizer, st.session_state.clinicalbert_model = load_clinicalbert()
            st.session_state.models_loaded = True

    st.title("🩺 Medical Risk Assessment Platform")
    st.markdown("*A comprehensive tool for analyzing patient data to assess cancer and diabetes risk based on genetic markers and personal health metrics*")
    st.markdown("---")
    
    # Create input panel
    submitted, age, height, weight, bmi, ct, af, mis, dna_details = create_input_panel()

    if submitted:
        try:
            # Show loading animation
            show_loading_animation()
            
            # Run analysis
            with st.spinner("Performing comprehensive medical analysis..."):
                # Diabetes analysis
                text_risk = analyze_clinical_text(dna_details)
                diabetes_features = {
                    'age': age,
                    'bmi': bmi,
                    'height': height,
                    'weight': weight,
                    'text_risk': text_risk
                }
                diabetes_normalized = normalize_features(diabetes_features, 'diabetes')
                diabetes_risk = st.session_state.diabetes_model.predict_proba(diabetes_normalized)[0][1]
                
                # Cancer analysis
                cancer_features = {
                    'ct': ct,
                    'af': af,
                    'mis': mis
                }
                cancer_normalized = normalize_features(cancer_features, 'cancer')
                cancer_risk = st.session_state.cancer_model.predict_proba(cancer_normalized)[0][1]

            # Display results
            col1, col2 = st.columns(2)
            
            with col1:
                st.subheader("Diabetes Risk Analysis")
                st.plotly_chart(create_gauge(diabetes_risk, "Diabetes Risk (%)", 
                                            ["#2196F3", "#4CAF50", "#FFEB3B", "#F44336"]),
                               use_container_width=True)
                
                diabetes_message = "Normal" if diabetes_risk < 0.3 else "Prediabetes" if diabetes_risk < 0.6 else "Diabetes"
                st.info(f"Prediction: {diabetes_message}")
                
                # Add risk factor chart
                st.plotly_chart(create_risk_factor_chart(diabetes_features, 'diabetes'), use_container_width=True)

            with col2:
                st.subheader("Cancer Risk Analysis (FISH)")
                st.plotly_chart(create_gauge(cancer_risk, "Cancer Risk (%)", 
                                            ["#9C27B0", "#673AB7", "#3F51B5", "#2196F3"]),
                               use_container_width=True)
                
                cancer_message = "Low Risk" if cancer_risk < 0.3 else "Medium Risk" if cancer_risk < 0.6 else "High Risk"
                st.warning(f"Prediction: {cancer_message}")
                
                # Add risk factor chart
                st.plotly_chart(create_risk_factor_chart(cancer_features, 'cancer'), use_container_width=True)

            # Display detailed risk information
            create_disease_info_panel(cancer_risk, diabetes_risk)
            
            # Add disclaimer
            add_disclaimer()

        except Exception as e:
            st.error(f"Analysis error: {str(e)}")

if __name__ == "__main__":
    main()
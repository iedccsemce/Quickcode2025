import gradio as gr
import numpy as np
import os
import random
import json
import tempfile
from PIL import Image, ImageDraw, ImageFont
import torch
import torch.nn.functional as F
from monai.networks.nets import DenseNet121, UNet
from monai.transforms import (
    Compose,
    ScaleIntensity,
    EnsureChannelFirst,
    ResizeWithPadOrCrop
)

# Create directories
os.makedirs("models", exist_ok=True)

# ================= Helper Functions =====================

def load_sample_data():
    """Load sample data for demonstration purposes"""
    # Sample food database
    food_db = [
        {"name": "Grilled Salmon", "calories": 367, "protein": 40, "fat": 22, "carbs": 0, "benefits": "Rich in omega-3 fatty acids, good for heart health"},
        {"name": "Quinoa Bowl", "calories": 222, "protein": 8, "fat": 4, "carbs": 39, "benefits": "Complete protein, rich in fiber"},
        {"name": "Greek Yogurt", "calories": 100, "protein": 10, "fat": 2, "carbs": 3, "benefits": "Probiotics, calcium, protein"},
        {"name": "Kale Salad", "calories": 50, "protein": 3, "fat": 0.5, "carbs": 7, "benefits": "Vitamins A, K, C, antioxidants"},
        {"name": "Avocado Toast", "calories": 190, "protein": 5, "fat": 10, "carbs": 20, "benefits": "Healthy fats, fiber, vitamins E and K"}
    ]
    
    # Sample exercise database
    exercise_db = [
        {"name": "Walking", "intensity": "Low", "calories_burned": 100, "benefits": "Improves cardiovascular health, low impact"},
        {"name": "Swimming", "intensity": "Moderate", "calories_burned": 300, "benefits": "Full body workout, low impact, cardiovascular health"},
        {"name": "Yoga", "intensity": "Low-Moderate", "calories_burned": 150, "benefits": "Flexibility, stress reduction, strength"},
        {"name": "HIIT", "intensity": "High", "calories_burned": 450, "benefits": "Efficient calorie burning, improves metabolic rate"},
        {"name": "Cycling", "intensity": "Moderate-High", "calories_burned": 350, "benefits": "Leg strength, cardiovascular health, low impact"}
    ]
    
    # Sample music database
    music_db = [
        {"genre": "Classical", "mood": "Relaxing", "benefits": "Stress reduction, improved focus"},
        {"genre": "Jazz", "mood": "Uplifting", "benefits": "Creativity, mood enhancement"},
        {"genre": "Electronic", "mood": "Energetic", "benefits": "Workout motivation, increased energy"},
        {"genre": "Ambient", "mood": "Calming", "benefits": "Sleep aid, anxiety reduction"},
        {"genre": "Rock", "mood": "Stimulating", "benefits": "Increased alertness, mood booster"}
    ]
    
    return food_db, exercise_db, music_db

# Load sample data
food_db, exercise_db, music_db = load_sample_data()

# Add visibility toggles for different recommendation groups based on tab selection
def update_tab_visibility(tab_selection):
    """Update visibility of input groups based on selected tab"""
    return (
        gr.update(visible=tab_selection == "Storytelling"),  # story_group
        gr.update(visible=tab_selection == "Music Recommendation"),  # music_group
        gr.update(visible=tab_selection == "Food Recommendation"),  # food_group
        gr.update(visible=tab_selection == "Exercise Recommendation")  # exercise_group
    )

# Missing helper functions
def generate_story(theme, length, style):
    """Generate a story based on theme, length, and style preferences"""
    # In a real implementation, this would use an LLM like GPT or Claude
    # For this demo, we'll return placeholder text
    
    # Base story length in words
    if length == "short":
        word_count = 150
    elif length == "medium":
        word_count = 300
    else:  # long
        word_count = 500
    
    # Simple placeholder stories based on theme and style
    intro_text = {
        "health": "Once upon a time, a person decided to transform their life through healthy habits.",
        "motivation": "Someone stood at the crossroads of life, searching for their true purpose.",
        "relaxation": "After a long journey, a weary traveler found a peaceful sanctuary.",
        "adventure": "Beyond the mountains, adventure awaited someone brave enough to seek it.",
        "fantasy": "In a realm where magic flowed like water, a curious soul discovered a hidden power.",
        "science fiction": "The space station orbited silently as someone prepared for first contact.",
        "romance": "Under the starlit sky, two strangers' paths crossed in an unexpected way."
    }
    
    # Get appropriate intro or default
    intro = intro_text.get(theme.lower(), "Once upon a time in a distant place, someone began a journey.")
    
    # Placeholder for full story - in production would generate properly based on all parameters
    placeholder_text = (
        f"{intro} The journey would not be easy, but it would be worthwhile. "
        f"Each step forward brought new challenges and rewards. "
    ) * (word_count // 20)  # Repeat to reach approximate word count
    
    # Modify style based on selection
    if style.lower() == "inspirational":
        placeholder_text += "\nRemember, the greatest journeys begin with a single step. Your potential is limitless."
    elif style.lower() == "educational":
        placeholder_text += "\nThis story illustrates the importance of perseverance and adaptability in life."
    elif style.lower() == "poetic":
        placeholder_text += "\nLike leaves dancing in autumn wind, so too do our choices shape our destiny."
    elif style.lower() == "humorous":
        placeholder_text += "\nOf course, they could have just taken an Uber, but where's the fun in that?"
    
    return placeholder_text

def recommend_music(mood, activity):
    """Recommend music based on mood and activity"""
    # Simple example recommendations
    recommendations = []
    
    # Map moods to genres and song ideas
    mood_map = {
        "Happy": ["Pop", "Upbeat", "Dance"],
        "Sad": ["Ballads", "Acoustic", "Blues"],
        "Energetic": ["EDM", "Rock", "Hip-Hop"],
        "Relaxed": ["Ambient", "Jazz", "Classical"],
        "Focused": ["Instrumental", "Lo-fi", "Classical"],
        "Nostalgic": ["80s/90s hits", "Classic Rock", "Folk"],
        "Romantic": ["R&B", "Soft Rock", "Jazz"],
        "Intense": ["Heavy Metal", "Hard Rock", "Epic Orchestral"]
    }
    
    # Map activities to specific recommendations
    activity_map = {
        "Workout": ["High BPM", "Motivational", "Rhythm-driven"],
        "Study": ["No lyrics", "Consistent tempo", "Background"],
        "Meditation": ["Nature sounds", "Ambient", "Slow tempo"],
        "Sleep": ["Low volume", "Soothing", "No sudden changes"],
        "Party": ["Dance", "Popular", "Sing-along"],
        "Reading": ["Soft", "Background", "Instrumental"],
        "Cooking": ["Upbeat", "Fun", "Energizing"],
        "Commuting": ["Podcast-like", "Storytelling", "Engaging"]
    }
    
    # Get genres from mood
    genres = mood_map.get(mood, ["Pop", "Rock", "Electronic"])
    
    # Get attributes from activity
    attributes = activity_map.get(activity, ["Varied", "Melodic", "Enjoyable"])
    
    # Generate 3 recommendations
    for i in range(3):
        genre = random.choice(genres)
        attribute = random.choice(attributes)
        
        recommendations.append({
            "name": f"{genre} Mix #{i+1}",
            "description": f"A {attribute.lower()} selection of {genre.lower()} tracks",
            "why": f"Perfect for {mood.lower()} moods and {activity.lower() if activity != 'None' else 'various activities'}"
        })
    
    return recommendations

# Add missing recommend_food function
def recommend_food(diet_preference, health_goal, allergies=None):
    """Recommend foods based on dietary preference and health goal"""
    if allergies is None:
        allergies = ""
    
    # Filter foods based on dietary preference
    filtered_foods = []
    
    # Simple filtering based on dietary preference
    for food in food_db:
        # Skip foods with allergens (simple keyword matching - in production would be more sophisticated)
        if allergies and allergies.strip():
            allergen_keywords = [kw.strip().lower() for kw in allergies.split(',')]
            has_allergen = False
            
            for kw in allergen_keywords:
                if kw in food["name"].lower():
                    has_allergen = True
                    break
            
            if has_allergen:
                continue
        
        # Simple dietary filtering
        if diet_preference == "Vegetarian" and "Salmon" in food["name"]:
            continue
        elif diet_preference == "Vegan" and ("Salmon" in food["name"] or "Yogurt" in food["name"]):
            continue
        elif diet_preference == "Gluten-free" and "Bread" in food["name"]:
            continue
        elif diet_preference == "Low-carb" and food["carbs"] > 20:
            continue
        
        filtered_foods.append(food)
    
    # If no foods match criteria, return all foods
    if not filtered_foods:
        filtered_foods = food_db
    
    # Select foods that best match health goal
    goal_matched_foods = []
    
    for food in filtered_foods:
        # Simple goal matching (in production would use more sophisticated matching)
        if health_goal == "Weight loss" and food["calories"] < 200:
            goal_matched_foods.append(food)
        elif health_goal == "Muscle gain" and food["protein"] > 20:
            goal_matched_foods.append(food)
        elif health_goal == "Heart health" and "heart health" in food["benefits"].lower():
            goal_matched_foods.append(food)
        elif health_goal == "Energy" and food["carbs"] > 20:
            goal_matched_foods.append(food)
        elif health_goal == "General health":
            goal_matched_foods.append(food)
    
    # If no foods match goal, use all filtered foods
    if not goal_matched_foods:
        goal_matched_foods = filtered_foods
    
    # Select up to 3 foods to recommend
    selected_foods = random.sample(goal_matched_foods, min(3, len(goal_matched_foods)))
    
    # Format recommendations
    recommendations = []
    for food in selected_foods:
        nutritional_info = f"Calories: {food['calories']}, Protein: {food['protein']}g, Carbs: {food['carbs']}g, Fat: {food['fat']}g"
        
        recommendations.append({
            "name": food["name"],
            "nutritional_info": nutritional_info,
            "why": f"Recommended for {health_goal.lower()}: {food['benefits']}"
        })
    
    return recommendations

def recommend_exercise(fitness_level, goal, limitations=None, equipment=None):
    """Recommend exercises based on fitness level, goals, limitations, and available equipment"""
    if equipment is None or len(equipment) == 0:
        equipment = ["None/Bodyweight"]
    
    recommendations = []
    
    # Filter exercises by level, goals, and equipment
    filtered_exercises = []
    for exercise in exercise_db:
        # Check fitness level (allow exercises at or below user's level)
        levels = ["Beginner", "Intermediate", "Advanced"]
        user_level_idx = levels.index(fitness_level) if fitness_level in levels else 0
        exercise_level_idx = levels.index(exercise["level"]) if hasattr(exercise, "level") and exercise["level"] in levels else 0
        
        if exercise_level_idx > user_level_idx:
            continue
        
        # Check if exercise matches at least one of user's goals
        goal_match = False
        if hasattr(exercise, "goals") and isinstance(exercise["goals"], list):
            for ex_goal in exercise["goals"]:
                if ex_goal.lower() == goal.lower():
                    goal_match = True
                    break
        else:
            # If exercise has no goals attribute, default to True
            goal_match = True
        
        if not goal_match:
            continue
        
        # Check if user has required equipment
        equipment_match = False
        if hasattr(exercise, "equipment") and isinstance(exercise["equipment"], list):
            for eq in exercise["equipment"]:
                if eq in equipment:
                    equipment_match = True
                    break
        else:
            # If exercise has no equipment attribute, default to True
            equipment_match = True
        
        if not equipment_match:
            continue
        
        # Check limitations (simple keyword matching - in production would be more sophisticated)
        if limitations and limitations.strip():
            limit_keywords = [kw.strip().lower() for kw in limitations.split(',')]
            has_limitation = False
            
            for kw in limit_keywords:
                if kw in exercise["name"].lower() or (hasattr(exercise, "description") and kw in exercise["description"].lower()):
                    has_limitation = True
                    break
            
            if has_limitation:
                continue
        
        filtered_exercises.append(exercise)
    
    # Select up to 3 exercises from filtered list
    selected_exercises = random.sample(filtered_exercises, min(3, len(filtered_exercises))) if filtered_exercises else []
    if not selected_exercises and exercise_db:
        # If no exercises match all criteria but some match some criteria, return at least one
        selected_exercises = [random.choice(exercise_db)]
    
    # Format recommendations
    for exercise in selected_exercises:
        description = exercise.get("description", f"{exercise['name']} - {exercise['intensity']} intensity")
        
        recommendations.append({
            "name": exercise["name"],
            "description": description,
            "why": exercise.get("benefits", "General fitness benefits")
        })
    
    return recommendations

def format_recommendations(recommendations):
    """Format recommendations as markdown"""
    if not recommendations:
        return "No recommendations found matching your criteria. Please try adjusting your preferences."
    
    output = "## Recommendations\n\n"
    
    for i, rec in enumerate(recommendations, 1):
        output += f"### {i}. {rec['name']}\n"
        
        # Handle different recommendation types
        if "nutritional_info" in rec:  # Food
            output += f"**Nutritional Information**: {rec['nutritional_info']}\n\n"
        elif "description" in rec:  # Exercise or Music
            output += f"**Description**: {rec['description']}\n\n"
        
        output += f"**Why This Is Recommended**: {rec['why']}\n\n"
        output += "---\n\n" if i < len(recommendations) else ""
    
    return output

# ================= Medical AI Functions =================

# Create dummy model files
def create_dummy_model(model_path, model_type="densenet"):
    """Create a dummy model file for demonstration"""
    if not os.path.exists(model_path):
        if model_type == "densenet":
            model = DenseNet121(spatial_dims=2, in_channels=3, out_channels=2)
        else:  # UNet
            model = UNet(
                spatial_dims=2,
                in_channels=3,
                out_channels=2,
                channels=(16, 32, 64, 128),
                strides=(2, 2, 2)
            )
        torch.save(model.state_dict(), model_path)
        print(f"Created dummy model at {model_path}")

# Paths for dummy models
SEGMENTATION_MODEL_PATH = "models/segmentation_model.pth"
CLASSIFICATION_MODEL_PATH = "models/classification_model.pth"
BURN_MODEL_PATH = "models/burn_detection_model.pth"
SKIN_CANCER_MODEL_PATH = "models/skin_cancer_model.pth"

# Create dummy models
create_dummy_model(SEGMENTATION_MODEL_PATH, "unet")
create_dummy_model(CLASSIFICATION_MODEL_PATH, "densenet")
create_dummy_model(BURN_MODEL_PATH, "densenet")
create_dummy_model(SKIN_CANCER_MODEL_PATH, "densenet")

# Create a simulated segmentation function
def simulate_segmentation(image_array):
    """Create a simulated segmentation mask for demonstration"""
    h, w = image_array.shape[:2]
    mask = np.zeros((h, w), dtype=np.uint8)
    
    # Create a plausible "region of interest" - this could be more sophisticated
    # For demonstration, we'll create a circular mask in a random location
    center_y = random.randint(h//4, 3*h//4)
    center_x = random.randint(w//4, 3*w//4)
    radius = min(h, w) // random.randint(3, 6)
    
    y, x = np.ogrid[:h, :w]
    dist_from_center = np.sqrt((x - center_x)**2 + (y - center_y)**2)
    mask[dist_from_center <= radius] = 1
    
    # Add noise to make it look more realistic
    noise = np.random.rand(h, w) > 0.95
    mask[noise & (mask == 1)] = 0
    noise = np.random.rand(h, w) > 0.98
    mask[noise & (mask == 0)] = 1
    
    return mask

def add_text_to_image(image_array, text, position=(10, 30), color=(255, 255, 255), size=20):
    """Add text to an image array"""
    # Convert numpy array to PIL Image
    image = Image.fromarray(image_array)
    draw = ImageDraw.Draw(image)
    try:
        # Try to load a font, fallback to default if not available
        font = ImageFont.truetype("arial.ttf", size)
    except IOError:
        font = ImageFont.load_default()
    
    # Add text with a black outline for readability
    for offset in [(-1, -1), (-1, 1), (1, -1), (1, 1)]:
        draw.text((position[0] + offset[0], position[1] + offset[1]), text, (0, 0, 0), font=font)
    draw.text(position, text, color, font=font)
    
    return np.array(image)

def segment_image(image):
    """Perform image segmentation simulation"""
    if image is None:
        return None, "Please upload an image for analysis."
    
    # Convert input image to numpy if it's not already
    if not isinstance(image, np.ndarray):
        image_np = np.array(image)
    else:
        image_np = image.copy()
    
    # Generate a simulated segmentation mask
    mask = simulate_segmentation(image_np)
    
    # Create a colored segmentation overlay
    overlay = np.zeros_like(image_np)
    overlay[mask == 1] = [255, 0, 0]  # Red for segmented area
    
    # Blend the original image with the overlay
    alpha = 0.5
    blended = (1 - alpha) * image_np + alpha * overlay
    blended = blended.astype(np.uint8)
    
    # Calculate metrics
    segmentation_area = (mask == 1).sum()
    total_area = mask.size
    percentage = (segmentation_area / total_area) * 100
    
    # Add metrics to the image
    result_text = f"Segmented area: {segmentation_area} pixels ({percentage:.2f}%)"
    result_image = add_text_to_image(blended, "Region of Interest", (10, 30), (255, 255, 255))
    
    return result_image, result_text

def classify_image(image):
    """Classify medical images - simulation"""
    if image is None:
        return None, "Please upload an image for analysis."
    
    # Convert input image to numpy if it's not already
    if not isinstance(image, np.ndarray):
        image_np = np.array(image)
    else:
        image_np = image.copy()
    
    # For demo purposes, randomly classify the image
    classes = ['Normal', 'Abnormal']
    prediction = random.choice(classes)
    confidence_value = random.uniform(70, 98)
    
    # Create visualization
    result_image = image_np.copy()
    
    # Add a border color based on classification
    border_thickness = 10
    border_color = [0, 255, 0] if prediction == 'Normal' else [255, 0, 0]  # Green or Red
    
    h, w = result_image.shape[:2]
    result_image[:border_thickness, :] = border_color  # Top
    result_image[h-border_thickness:, :] = border_color  # Bottom
    result_image[:, :border_thickness] = border_color  # Left
    result_image[:, w-border_thickness:] = border_color  # Right
    
    # Add classification text
    result_image = add_text_to_image(
        result_image, 
        f"Classification: {prediction}", 
        (20, 40),
        (255, 255, 255)
    )
    
    result_image = add_text_to_image(
        result_image, 
        f"Confidence: {confidence_value:.2f}%", 
        (20, 80),
        (255, 255, 255)
    )
    
    result_text = f"Classification: {prediction} (Confidence: {confidence_value:.2f}%)"
    
    return result_image, result_text

def detect_burn(image):
    """Detect burn severity - simulation"""
    if image is None:
        return None, "Please upload an image for analysis."
    
    # Convert input image to numpy if it's not already
    if not isinstance(image, np.ndarray):
        image_np = np.array(image)
    else:
        image_np = image.copy()
    
    # For demo purposes, randomly classify the burn
    burn_classes = ['No Burn', 'First Degree', 'Second Degree', 'Third Degree']
    weights = [0.2, 0.3, 0.3, 0.2]  # Probabilities for each class
    prediction = random.choices(burn_classes, weights=weights, k=1)[0]
    confidence_value = random.uniform(75, 95)
    
    # Create a segmentation mask for affected areas
    if prediction != 'No Burn':
        mask = simulate_segmentation(image_np)
    else:
        mask = np.zeros((image_np.shape[0], image_np.shape[1]), dtype=np.uint8)
    
    # Create colored overlay based on severity
    overlay = np.zeros_like(image_np)
    if prediction == 'First Degree':
        color = [255, 255, 0]  # Yellow
    elif prediction == 'Second Degree':
        color = [255, 165, 0]  # Orange
    elif prediction == 'Third Degree':
        color = [255, 0, 0]    # Red
    else:
        color = [0, 255, 0]    # Green (no burn)
    
    overlay[mask == 1] = color
    
    # Blend the original image with the overlay
    alpha = 0.6
    blended = (1 - alpha) * image_np + alpha * overlay
    blended = blended.astype(np.uint8)
    
    # Add a border
    h, w = blended.shape[:2]
    border_thickness = 10
    blended[:border_thickness, :] = color  # Top
    blended[h-border_thickness:, :] = color  # Bottom
    blended[:, :border_thickness] = color  # Left
    blended[:, w-border_thickness:] = color  # Right
    
    # Add text with assessment
    blended = add_text_to_image(
        blended, 
        f"Burn Assessment: {prediction}", 
        (20, 40),
        (255, 255, 255)
    )
    
    blended = add_text_to_image(
        blended, 
        f"Confidence: {confidence_value:.2f}%", 
        (20, 80),
        (255, 255, 255)
    )
    
    if prediction != 'No Burn':
        affected_area = (mask == 1).sum()
        total_area = mask.size
        percentage = (affected_area / total_area) * 100
        blended = add_text_to_image(
            blended, 
            f"Affected area: ~{percentage:.1f}%", 
            (20, 120),
            (255, 255, 255)
        )
    
    result_text = f"Burn Assessment: {prediction} (Confidence: {confidence_value:.2f}%)"
    
    return blended, result_text

def screen_skin_cancer(image):
    """Screen for skin cancer indicators - simulation"""
    if image is None:
        return None, "Please upload an image for analysis."
    
    # Convert input image to numpy if it's not already
    if not isinstance(image, np.ndarray):
        image_np = np.array(image)
    else:
        image_np = image.copy()
    
    # For demo purposes, randomly classify the skin lesion
    skin_classes = [
        'Melanocytic Nevus', 
        'Melanoma', 
        'Basal Cell Carcinoma', 
        'Actinic Keratosis', 
        'Benign Keratosis', 
        'Dermatofibroma', 
        'Vascular Lesion'
    ]
    
    # Weighted random selection (more likely to be benign for demo purposes)
    benign_weights = [0.25, 0.05, 0.05, 0.05, 0.35, 0.15, 0.1]  # Higher weights for benign classes
    
    # Select top class
    top_class = random.choices(skin_classes, weights=benign_weights, k=1)[0]
    top_prob = random.uniform(0.7, 0.9)
    
    # Select secondary class (can't be the same as top)
    remaining_classes = [c for c in skin_classes if c != top_class]
    remaining_weights = [0.1] * len(remaining_classes)
    second_class = random.choices(remaining_classes, weights=remaining_weights, k=1)[0]
    second_prob = random.uniform(0.1, 0.3)
    
    # Prepare formatted predictions
    top_predictions = [
        f"{top_class}: {top_prob*100:.2f}%",
        f"{second_class}: {second_prob*100:.2f}%"
    ]
    
    # Determine malignancy risk
    malignant_classes = ['Melanoma', 'Basal Cell Carcinoma', 'Actinic Keratosis']
    
    if top_class in malignant_classes:
        risk_level = "High"
        risk_color = [255, 0, 0]  # Red
    elif top_prob < 0.75:  # If confidence is low
        risk_level = "Uncertain"
        risk_color = [255, 165, 0]  # Orange
    else:
        risk_level = "Low"
        risk_color = [0, 255, 0]  # Green
    
    # Create segmentation mask for the lesion
    mask = simulate_segmentation(image_np)
    
    # Create colored overlay
    overlay = np.zeros_like(image_np)
    overlay[mask == 1] = risk_color
    
    # Blend the original image with the overlay
    alpha = 0.4
    blended = (1 - alpha) * image_np + alpha * overlay
    blended = blended.astype(np.uint8)
    
    # Add a border
    h, w = blended.shape[:2]
    border_thickness = 10
    blended[:border_thickness, :] = risk_color  # Top
    blended[h-border_thickness:, :] = risk_color  # Bottom
    blended[:, :border_thickness] = risk_color  # Left
    blended[:, w-border_thickness:] = risk_color  # Right
    
    # Add text annotations
    blended = add_text_to_image(
        blended, 
        f"Primary: {top_class}", 
        (20, 40),
        (255, 255, 255)
    )
    
    blended = add_text_to_image(
        blended, 
        f"Secondary: {second_class}", 
        (20, 80),
        (255, 255, 255)
    )
    
    blended = add_text_to_image(
        blended, 
        f"Malignancy Risk: {risk_level}", 
        (20, 120),
        (255, 255, 255)
    )
    
    # Prepare result text
    result_text = f"Primary diagnosis: {top_predictions[0]}\nSecondary possibility: {top_predictions[1]}\nMalignancy Risk: {risk_level}"
    
    return blended, result_text

# ================= Gradio Interface =================

# Create the Gradio interface
with gr.Blocks(title="Healthcare Assistant") as demo:
    gr.Markdown("# Healthcare Assistant")
    gr.Markdown("An application for lifestyle recommendations and medical image analysis")
    
    with gr.Tabs():
        # Lifestyle Recommendations Tab
        with gr.TabItem("Lifestyle Recommendations"):
            lifestyle_tabs = gr.Radio(
                ["Storytelling", "Music Recommendation", "Food Recommendation", "Exercise Recommendation"],
                label="Select Recommendation Type",
                value="Storytelling"
            )
            
            # Storytelling inputs
            with gr.Group(visible=True) as story_group:
                story_theme = gr.Dropdown(
                    ["Health", "Motivation", "Relaxation", "Adventure", "Fantasy", "Science Fiction", "Romance"], 
                    label="Story Theme",
                    value="Health"
                )
                story_length = gr.Radio(
                    ["short", "medium", "long"], 
                    label="Story Length", 
                    value="medium"
                )
                story_style = gr.Dropdown(
                    ["narrative", "inspirational", "educational", "poetic", "humorous"], 
                    label="Story Style", 
                    value="narrative"
                )
            
            # Music recommendation inputs
            with gr.Group(visible=False) as music_group:
                music_mood = gr.Dropdown(
                    ["Happy", "Sad", "Energetic", "Relaxed", "Focused", "Nostalgic", "Romantic", "Intense"], 
                    label="Mood",
                    value="Happy"
                )
                music_activity = gr.Dropdown(
                    ["Workout", "Study", "Meditation", "Sleep", "Party", "Reading", "Cooking", "Commuting", "None"], 
                    label="Activity",
                    value="None"
                )
                # Continue from where the snippet ended - completing the music recommendation section
                music_genre_preference = gr.CheckboxGroup(
                    ["Pop", "Rock", "Classical", "Jazz", "Electronic", "Hip-Hop", "Country", "R&B"], 
                    label="Genre Preferences (Optional)"
                )
            
            # Food recommendation inputs
            with gr.Group(visible=False) as food_group:
                diet_preference = gr.Dropdown(
                    ["No Restrictions", "Vegetarian", "Vegan", "Gluten-free", "Low-carb", "Keto", "Paleo"], 
                    label="Dietary Preference",
                    value="No Restrictions"
                )
                health_goal = gr.Radio(
                    ["Weight loss", "Muscle gain", "Heart health", "Energy", "General health"], 
                    label="Health Goal", 
                    value="General health"
                )
                food_allergies = gr.Textbox(
                    label="Allergies/Restrictions (comma separated)",
                    placeholder="e.g., nuts, dairy, shellfish"
                )
            
            # Exercise recommendation inputs
            with gr.Group(visible=False) as exercise_group:
                fitness_level = gr.Radio(
                    ["Beginner", "Intermediate", "Advanced"], 
                    label="Fitness Level", 
                    value="Intermediate"
                )
                exercise_goal = gr.Dropdown(
                    ["Weight loss", "Muscle building", "Endurance", "Flexibility", "Stress reduction", "General fitness"], 
                    label="Exercise Goal",
                    value="General fitness"
                )
                limitations = gr.Textbox(
                    label="Physical Limitations (comma separated)",
                    placeholder="e.g., knee issues, back pain, limited mobility"
                )
                available_equipment = gr.CheckboxGroup(
                    ["None/Bodyweight", "Dumbbells", "Resistance bands", "Treadmill", "Bike", "Pool", "Yoga mat", "Full gym"], 
                    label="Available Equipment",
                    value=["None/Bodyweight"]
                )
            
            # Generate button and output
            generate_button = gr.Button("Generate Recommendations")
            lifestyle_output = gr.Markdown(label="Recommendation Results")
            
            # Set up event handlers for lifestyle recommendations
            lifestyle_tabs.change(
                fn=update_tab_visibility,
                inputs=lifestyle_tabs,
                outputs=[story_group, music_group, food_group, exercise_group]
            )
            
            def generate_recommendations(tab_selection, 
                                         story_theme, story_length, story_style,
                                         music_mood, music_activity, music_genre_preference,
                                         diet_preference, health_goal, food_allergies,
                                         fitness_level, exercise_goal, limitations, available_equipment):
                """Generate recommendations based on the selected tab and inputs"""
                
                if tab_selection == "Storytelling":
                    story = generate_story(story_theme, story_length, story_style)
                    return story
                
                elif tab_selection == "Music Recommendation":
                    recommendations = recommend_music(music_mood, music_activity)
                    return format_recommendations(recommendations)
                
                elif tab_selection == "Food Recommendation":
                    recommendations = recommend_food(diet_preference, health_goal, food_allergies)
                    return format_recommendations(recommendations)
                
                elif tab_selection == "Exercise Recommendation":
                    recommendations = recommend_exercise(fitness_level, exercise_goal, limitations, available_equipment)
                    return format_recommendations(recommendations)
                
                return "Please select a recommendation type."
            
            generate_button.click(
                fn=generate_recommendations,
                inputs=[
                    lifestyle_tabs,
                    story_theme, story_length, story_style,
                    music_mood, music_activity, music_genre_preference,
                    diet_preference, health_goal, food_allergies,
                    fitness_level, exercise_goal, limitations, available_equipment
                ],
                outputs=lifestyle_output
            )
        
        # Medical AI Analysis Tab
        with gr.TabItem("Medical Image Analysis"):
            gr.Markdown("## Medical Image Analysis")
            gr.Markdown("Upload an image for analysis with various medical AI models")
            
            with gr.Tabs():
                with gr.TabItem("Image Segmentation"):
                    seg_image_input = gr.Image(label="Upload Medical Image")
                    seg_button = gr.Button("Perform Segmentation")
                    seg_image_output = gr.Image(label="Segmentation Result")
                    seg_text_output = gr.Textbox(label="Analysis Result")
                    
                    seg_button.click(
                        fn=segment_image,
                        inputs=seg_image_input,
                        outputs=[seg_image_output, seg_text_output]
                    )
                
                with gr.TabItem("Medical Image Classification"):
                    class_image_input = gr.Image(label="Upload Medical Image")
                    class_button = gr.Button("Classify Image")
                    class_image_output = gr.Image(label="Classification Result")
                    class_text_output = gr.Textbox(label="Classification Result")
                    
                    class_button.click(
                        fn=classify_image,
                        inputs=class_image_input,
                        outputs=[class_image_output, class_text_output]
                    )
                
                with gr.TabItem("Burn Detection"):
                    burn_image_input = gr.Image(label="Upload Burn Image")
                    burn_button = gr.Button("Assess Burn")
                    burn_image_output = gr.Image(label="Burn Assessment")
                    burn_text_output = gr.Textbox(label="Assessment Result")
                    
                    burn_button.click(
                        fn=detect_burn,
                        inputs=burn_image_input,
                        outputs=[burn_image_output, burn_text_output]
                    )
                
                with gr.TabItem("Skin Cancer Screening"):
                    skin_image_input = gr.Image(label="Upload Skin Lesion Image")
                    skin_button = gr.Button("Screen Lesion")
                    skin_image_output = gr.Image(label="Screening Result")
                    skin_text_output = gr.Textbox(label="Screening Assessment")
                    
                    skin_button.click(
                        fn=screen_skin_cancer,
                        inputs=skin_image_input,
                        outputs=[skin_image_output, skin_text_output]
                    )
        
        # Help and Information Tab
        with gr.TabItem("Help & Information"):
            gr.Markdown("""
            # Healthcare Assistant Help
            
            ## Lifestyle Recommendations
            
            The lifestyle recommendations module provides tailored suggestions for:
            
            - **Storytelling**: Generate stories based on themes, length, and style
            - **Music Recommendations**: Get music suggestions based on mood and activity
            - **Food Recommendations**: Receive dietary recommendations based on preferences and health goals
            - **Exercise Recommendations**: Get personalized workout suggestions
            
            ## Medical Image Analysis
            
            The medical image analysis module uses AI to assist with:
            
            - **Image Segmentation**: Identify regions of interest in medical images
            - **Medical Image Classification**: Classify medical images as normal/abnormal
            - **Burn Detection**: Assess burn severity in images
            - **Skin Cancer Screening**: Screen skin lesions for potential malignancy
            
            > **IMPORTANT DISCLAIMER**: This application is for demonstration purposes only and not for clinical use. All AI model responses are simulated and should not be used for medical diagnosis or treatment decisions. Always consult with qualified healthcare professionals for medical advice.
            """)
    
    # Add event handler for the initial loading state
    demo.load(
        lambda: (
            gr.update(visible=True),   # story_group
            gr.update(visible=False),  # music_group
            gr.update(visible=False),  # food_group
            gr.update(visible=False)   # exercise_group
        ),
        inputs=None,
        outputs=[story_group, music_group, food_group, exercise_group]
    )

# Launch the application
if __name__ == "__main__":
    demo.launch()

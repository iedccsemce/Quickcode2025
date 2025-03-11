import streamlit as st
import google.generativeai as genai
import os
import google.auth
from google.oauth2 import service_account
from googleapiclient.discovery import build
from datetime import datetime, timedelta
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

# Download NLTK dependencies
nltk.download('punkt')
nltk.download('stopwords')

# Google Service Account Credentials
SERVICE_ACCOUNT_PATH = "your-project-key.json"
SCOPES = ["https://www.googleapis.com/auth/calendar"]

# Set environment variable
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = SERVICE_ACCOUNT_PATH

# Authenticate Google Calendar API
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_PATH, scopes=SCOPES
)
calendar_service = build("calendar", "v3", credentials=credentials)

# Configure Google Gemini API
genai.configure(api_key="your-gemini-api-key")
model = genai.GenerativeModel("gemini-1.5-pro")

def healthcare_chatbot(user_input):
    """Processes user input and generates a healthcare-related response using Gemini AI."""
    try:
        response = model.generate_content(
            f"You are a healthcare assistant. Answer this medical query: {user_input}"
        )
        return response.text if response.text else "I'm here to help! Can you clarify your question?"
    except Exception as e:
        return f"Error communicating with Gemini AI: {str(e)}"

def book_appointment(doctor_email, patient_name, date):
    """Schedules a doctor appointment and generates a Google Meet link."""
    start_time = f"{date}T10:00:00"
    end_time = f"{date}T10:30:00"
    
    event = {
        "summary": f"Doctor Appointment for {patient_name}",
        "start": {"dateTime": start_time, "timeZone": "Asia/Kolkata"},
        "end": {"dateTime": end_time, "timeZone": "Asia/Kolkata"},
        "attendees": [{"email": doctor_email}],
        "conferenceData": {
            "createRequest": {"requestId": "video-call", "conferenceSolutionKey": {"type": "hangoutsMeet"}}
        },
    }
    
    event = calendar_service.events().insert(
        calendarId="primary", body=event, conferenceDataVersion=1
    ).execute()
    return event.get("hangoutLink")

def set_medicine_reminder(medicine_name, date, time):
    """Creates a reminder for taking medicine."""
    start_time = f"{date}T{time}:00"
    end_time = (datetime.strptime(start_time, "%Y-%m-%dT%H:%M:%S") + timedelta(minutes=5)).strftime("%Y-%m-%dT%H:%M:%S")
    
    event = {
        "summary": f"Take Medicine: {medicine_name}",
        "start": {"dateTime": start_time, "timeZone": "Asia/Kolkata"},
        "end": {"dateTime": end_time, "timeZone": "Asia/Kolkata"},
    }
    
    event = calendar_service.events().insert(
        calendarId="primary", body=event
    ).execute()
    return "Medicine reminder set successfully!"

def main():
    """Streamlit UI for AI Healthcare Assistant."""
    st.title("🏥 AI-Powered Healthcare Assistant 🤖")
    
    # AI Chatbot Section
    st.subheader("💬 Ask a Health-related Question")
    user_input = st.text_input("Type your query here:")
    if st.button("Ask AI"):
        if user_input:
            with st.spinner("Thinking..."):
                response = healthcare_chatbot(user_input)
            st.write("🤖 AI Assistant:", response)
        else:
            st.warning("⚠️ Please enter a question.")
    
    # Doctor Appointment Section
    st.subheader("📅 Book a Doctor Appointment")
    doctor_email = st.text_input("Doctor's Email:")
    patient_name = st.text_input("Your Name:")
    appointment_date = st.date_input("Select Date:")
    if st.button("Book Appointment"):
        if doctor_email and patient_name and appointment_date:
            with st.spinner("Scheduling..."):
                meeting_link = book_appointment(doctor_email, patient_name, str(appointment_date))
            st.success("✅ Appointment Scheduled!")
            st.write(f"📅 **Join Meeting:** [Click here]({meeting_link})")
        else:
            st.warning("⚠️ Please fill all details.")
    
    # Medicine Reminder Section
    st.subheader("💊 Set a Medicine Reminder")
    medicine_name = st.text_input("Medicine Name:")
    medicine_date = st.date_input("Select Date for Reminder:")
    medicine_time = st.time_input("Select Time for Reminder:")
    if st.button("Set Reminder"):
        if medicine_name and medicine_date and medicine_time:
            with st.spinner("Setting Reminder..."):
                result = set_medicine_reminder(medicine_name, str(medicine_date), str(medicine_time))
            st.success(f"✅ {result}")
        else:
            st.warning("⚠️ Please fill all details.")

if __name__ == "__main__":
    main()

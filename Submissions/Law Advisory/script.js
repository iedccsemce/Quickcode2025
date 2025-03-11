// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').split(".")[0]; // Get the section name
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 60, // Adjust offset
                behavior: 'smooth'
            });
        } else {
            window.location.href = this.getAttribute('href'); // Navigate normally
        }
    });
});

// Fade-in effect on page load
window.onload = function () {
    document.body.classList.add("fade-in");
};

// Chatbot interaction
function sendMessage() {
    let userMessage = document.getElementById("chatInput").value;
    let chatOutput = document.getElementById("chatOutput");
    if (userMessage.trim() !== "") {
        chatOutput.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
        chatOutput.innerHTML += `<p><strong>Bot:</strong> AI response coming soon...</p>`;
    }
}

// Search function (simulated)
function searchLaws() {
    let query = document.getElementById("lawSearch").value;
    let resultsDiv = document.getElementById("results");
    if (query.trim() !== "") {
        resultsDiv.innerHTML = `<p>Results for "<strong>${query}</strong>" will appear here.</p>`;
    }
}

// Document Generator
function generateDocument() {
    let docOutput = document.getElementById("documentOutput");
    docOutput.value = "Generated Legal Document:\n[Sample document text here...]";
}

document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("fade-in"); // Fix fade-in issue
});

function sendMessage() {
    let userMessage = document.getElementById("chatInput").value;
    let chatOutput = document.getElementById("chatOutput");

    if (userMessage.trim() === "") {
        return; // Prevent empty messages
    }

    chatOutput.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    chatOutput.innerHTML += `<p><strong>Bot:</strong> AI response coming soon...</p>`;

    document.getElementById("chatInput").value = ""; // Clear input after sending
}

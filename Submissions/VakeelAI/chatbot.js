// chatbot.js

const apiKey = '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'; // Replace with your OpenAI API key
const messages = [];

document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    // Add user message to chatbox
    messages.push({ role: 'user', content: userInput });
    updateChatbox();

    // Send message to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages
        })
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    // Add AI response to chatbox
    messages.push({ role: 'assistant', content: aiMessage });
    updateChatbox();

    // Clear input
    document.getElementById('user-input').value = '';
});

function updateChatbox() {
    const chatbox = document.getElementById('messages');
    chatbox.innerHTML = messages.map(msg => `
        <div class="message ${msg.role}">
            ${msg.content}
        </div>
    `).join('');
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the latest message
}async function generateContract(contractType, parties, terms) {
    try {
        const response = await fetch('http://localhost:5000/generate-contract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contractType,
                parties,
                terms,
            }),
        });

        const data = await response.json();
        return data.contract;
    } catch (error) {
        console.error('Error:', error);
        return 'An error occurred while generating the contract.';
    }
}

// Example usage
document.getElementById('generate-contract-btn').addEventListener('click', async () => {
    const contractType = document.getElementById('contract-type').value;
    const parties = document.getElementById('parties').value;
    const terms = document.getElementById('terms').value;

    const contract = await generateContract(contractType, parties, terms);
    document.getElementById('contract-output').innerText = contract;
});
app.post('/generate-contract', async (req, res) => {
    try {
        const { contractType, parties, terms } = req.body;

        const prompt = `Generate a ${contractType} contract between ${parties}. The terms are: ${terms}.`;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        const contract = response.data.choices[0].message.content;
        res.json({ contract });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'An error occurred' });
    }
});
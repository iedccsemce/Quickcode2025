// Function to fetch disease information from multiple sources
async function fetchDiseaseInfo(diseaseName) {
    try {
        // Construct the search query
        const query = `${diseaseName} plant disease treatment solutions`;
        
        // Make a request to our backend endpoint that will handle the web scraping
        const response = await fetch(`/search_disease?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        return {
            description: data.description || "Information about this disease is being fetched...",
            solutions: data.solutions || ["Loading solutions..."],
            sources: data.sources || []
        };
    } catch (error) {
        console.error('Error fetching disease information:', error);
        return {
            description: "Unable to fetch disease information at the moment.",
            solutions: ["Please try again later"],
            sources: []
        };
    }
}

// Function to update the solutions section with loading state
function showLoadingState(diseaseName) {
    const solutionsContainer = document.getElementById('diseaseSolutions');
    solutionsContainer.innerHTML = `
        <div class="solution-content">
            <h3>${diseaseName}</h3>
            <div class="loading-spinner">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <p>Searching for solutions...</p>
        </div>
    `;
}

// Function to update the solutions section with fetched data
function updateDiseaseSolutions(diseaseInfo, diseaseName) {
    const solutionsContainer = document.getElementById('diseaseSolutions');
    
    solutionsContainer.innerHTML = `
        <div class="solution-content">
            <h3>${diseaseName}</h3>
            <div class="disease-info-card">
                <p class="disease-description">${diseaseInfo.description}</p>
                
                <h4 class="mt-4">Recommended Solutions:</h4>
                <ul class="solutions-list">
                    ${diseaseInfo.solutions.map(solution => `
                        <li class="solution-item">
                            <i class="fas fa-leaf solution-icon"></i>
                            ${solution}
                        </li>
                    `).join('')}
                </ul>

                ${diseaseInfo.sources.length > 0 ? `
                    <div class="sources-section mt-4">
                        <h5>Sources:</h5>
                        <ul class="sources-list">
                            ${diseaseInfo.sources.map(source => `
                                <li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.title}</a></li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', async function() {
    const diseaseName = document.querySelector('.prediction-label').textContent;
    
    // Show loading state
    showLoadingState(diseaseName);
    
    // Fetch and update with real data
    const diseaseInfo = await fetchDiseaseInfo(diseaseName);
    updateDiseaseSolutions(diseaseInfo, diseaseName);
}); 
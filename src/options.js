// Get form elements
const form = document.getElementById('options-form');
const apiKeyInput = document.getElementById('apiKey');
const autoSummarizeToggle = document.getElementById('autoSummarize');
const messageDiv = document.getElementById('message');

// Feature detection
const storage = typeof chrome !== 'undefined' ? chrome.storage : browser.storage;

// Load saved settings when the page opens
async function loadSavedSettings() {
    try {
        const settings = await storage.local.get(['apiKey', 'autoSummarize']);
        
        // Set API key if it exists
        if (settings.apiKey) {
            apiKeyInput.value = settings.apiKey;
        }
        
        // Set toggle state (default to false if not set)
        autoSummarizeToggle.checked = settings.autoSummarize ?? false;
    } catch (error) {
        showMessage('Error loading settings', 'error');
    }
}

// Save settings
async function saveSettings(e) {
    e.preventDefault();
    
    try {
        // Only save if API key is provided or was previously saved
        const currentSettings = await storage.local.get('apiKey');
        const newApiKey = apiKeyInput.value.trim();
        
        if (!newApiKey && !currentSettings.apiKey) {
            showMessage('Please enter an API key', 'error');
            return;
        }

        // Prepare settings object
        const settings = {
            autoSummarize: autoSummarizeToggle.checked
        };

        // Only update API key if a new one is provided
        if (newApiKey) {
            settings.apiKey = newApiKey;
        } else {
            // Keep the existing API key
            settings.apiKey = currentSettings.apiKey;
        }

        // Save to storage
        await storage.local.set(settings);
        showMessage('Settings saved successfully', 'success');
    } catch (error) {
        showMessage('Error saving settings', 'error');
    }
}

// Show message helper
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `ob-message ${type === 'error' ? 'ob-error' : 'ob-success'}`;
    messageDiv.style.display = 'block';
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

// Add event listeners
document.addEventListener('DOMContentLoaded', loadSavedSettings);
form.addEventListener('submit', saveSettings);
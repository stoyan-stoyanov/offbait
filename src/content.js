// content.js

function createActivateButton() {
    const button = document.createElement('button');
    button.id = 'summary-activate-button';
    button.innerHTML = '🪝'; // Just the hook emoji
    
    button.addEventListener('click', async () => {
        if (button.disabled) return;
        
        // Disable button and show loading state
        button.disabled = true;
        button.innerHTML = `<div class="spinner"></div>`;
        
        try {
            // Remove existing summary if present
            const existingSummary = document.getElementById('page-summary-extension');
            if (existingSummary) {
                existingSummary.remove();
            }
            
            // Generate new summary
            const pageContent = document.documentElement.innerHTML;
            const summaryData = await summarizePage(pageContent);
            
            const summaryDiv = createSummaryUI(summaryData);
            const shareButton = await createShareButton(summaryData);
            summaryDiv.appendChild(shareButton);
            
            // Add event listener to the close button to show the activate button again
            const closeButton = summaryDiv.querySelector('button');
            closeButton.addEventListener('click', () => {
                button.style.display = 'block';
            });
            
            document.body.insertBefore(summaryDiv, document.body.firstChild);
            
            // Hide the activate button
            button.style.display = 'none';
            
        } catch (error) {
            console.error("Error generating summary:", error);
            showCopiedMessage('❌ Error generating summary', 'error');
        } finally {
            // Reset button state
            button.disabled = false;
            button.innerHTML = '🪝';
        }
    });
    
    return button;
}

// Initialize button on page load
document.addEventListener('DOMContentLoaded', () => {
    if (isArticlePage()) {
        const button = createActivateButton();
        document.body.appendChild(button);
    }
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    if (isArticlePage()) {
        const button = createActivateButton();
        document.body.appendChild(button);
    }
}
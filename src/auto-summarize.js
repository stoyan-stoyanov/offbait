// auto-summarize.js
async function initAutoSummary() {
    try {
        // Check if auto-summarize is enabled
        const result = await browser.storage.local.get('autoSummarize');
        if (!result.autoSummarize) {
            return;
        }

        // Only proceed if we're on an article page
        if (!isArticlePage()) {
            return;
        }

        // Show loading state
        const loadingDiv = createLoadingState();
        document.body.insertBefore(loadingDiv, document.body.firstChild);

        // Generate summary
        const pageContent = document.documentElement.innerHTML;
        const summaryData = await summarizePage(pageContent);
        
        // Create and display summary
        const summaryDiv = createSummaryUI(summaryData);
        const shareButton = await createShareButton(summaryData);
        summaryDiv.appendChild(shareButton);
        
        loadingDiv.replaceWith(summaryDiv);

    } catch (error) {
        console.error("Error in auto-summary:", error);
    }
}

// Initialize on page load
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initAutoSummary();
} else {
    document.addEventListener('DOMContentLoaded', initAutoSummary);
}
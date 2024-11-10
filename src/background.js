// background.js

// Listen for clicks on the toolbar button
browser.browserAction.onClicked.addListener(async (tab) => {
    // Inject and execute the summarization code
    try {
        await browser.tabs.executeScript(tab.id, {
            code: `
                (async () => {
                    try {
                        // Remove existing summary if present
                        const existingSummary = document.getElementById('page-summary-extension');
                        if (existingSummary) {
                            existingSummary.remove();
                            return;
                        }

                        // Show loading state at top of page
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
                        console.error("Error generating summary:", error);
                        const errorDiv = document.createElement('div');
                        errorDiv.className = 'ob-body';
                        errorDiv.style.cssText = 'background: #fff0f0; padding: 25px 25%; border-bottom: 2px solid #ccc;';
                        errorDiv.innerHTML = '❌ Error generating summary. Please try refreshing the page.';
                        document.body.insertBefore(errorDiv, document.body.firstChild);
                    }
                })();
            `
        });
    } catch (error) {
        console.error("Error executing script:", error);
    }
});
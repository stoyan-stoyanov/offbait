//ui.js

function createLoadingState() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'page-summary-loading';
    loadingDiv.className = 'ob-body';
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 20px;
        height: 20px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    const loadingText = document.createElement('span');
    loadingText.textContent = 'Generating page summary...';
    
    loadingDiv.appendChild(spinner);
    loadingDiv.appendChild(loadingText);
    
    return loadingDiv;
}

async function createShareButton(summaryData) {
    const button = document.createElement('button');
    button.className = 'share-button';
    button.innerHTML = `
        <i class="fas fa-share-alt" style="font-size: 16px;"></i>
        Share Summary
    `;
    
    button.onclick = async () => {
        const shareText = `📝 Summary:\n${summaryData.summary}\n\n🎯 Key Takeaways:\n${summaryData.keyTakeaways.map(point => `• ${point}`).join('\n')}\n\n🔗 ${window.location.href}\n\n✨ Generated by OffBait\nGet the extension: https://unwaste.io/install`;
        
        try {
            await navigator.clipboard.writeText(shareText);
            showCopiedMessage();
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    
    return button;
}

function createSummaryUI(summaryData) {
    const summaryDiv = document.createElement('div');
    summaryDiv.id = 'page-summary-extension';
    summaryDiv.className = 'ob-body';
    
    // Create header
    const header = createHeader();
    
    // Create close button
    const closeButton = createCloseButton(() => summaryDiv.remove());
    
    // Create content elements
    const content = createContent(summaryData);
    
    // Assemble everything
    summaryDiv.appendChild(closeButton);
    summaryDiv.appendChild(header);
    Object.values(content).forEach(element => summaryDiv.appendChild(element));
    
    return summaryDiv;
}

function createHeader() {
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    `;
    
    const logoText = document.createElement('div');
    logoText.textContent = '🪝 offbait';
    logoText.style.cssText = `
        font-size: 24px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 5px;
    `;
    
    const rightSection = document.createElement('div');
    rightSection.style.cssText = `
        display: flex;
        align-items: center;
        gap: 15px;
    `;
    
    const settingsButton = document.createElement('button');
    settingsButton.innerHTML = '<i class="fas fa-cog"></i>';
    settingsButton.style.cssText = `
        background: none;
        border: none;
        cursor: pointer;
        color: #666;
        padding: 5px;
    `;
    settingsButton.title = "Open Settings";
    settingsButton.onclick = () => {
        browser.runtime.openOptionsPage();
    };
    
    const githubLink = document.createElement('a');
    githubLink.href = 'GITHUB_URL_HERE';
    githubLink.style.cssText = `
        color: #333;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
    `;
    githubLink.innerHTML = `
        <i class="fab fa-github" style="font-size: 20px;"></i>
        GitHub
    `;
    githubLink.target = '_blank';
    
    rightSection.appendChild(settingsButton);
    rightSection.appendChild(githubLink);
    
    header.appendChild(logoText);
    header.appendChild(rightSection);
    
    return header;
}

function createCloseButton(onClose) {
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.style.cssText = `
        position: absolute;
        right: 20px;
        top: 20px;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 16px;
        color: #7f8c8d;
        padding: 5px;
    `;
    closeButton.onclick = onClose;
    return closeButton;
}

function createContent(summaryData) {
    const elements = {};
    
    // Article Title
    elements.title = document.createElement('h1');
    elements.title.textContent = summaryData.title;
    elements.title.style.cssText = `
        margin: 0 0 20px 0;
        font-size: 1.6em;
        color: #2c3e50;
        font-weight: 600;
    `;
    
    // Summary Section
    elements.summaryTitle = document.createElement('h2');
    elements.summaryTitle.textContent = '✨ Summary';
    elements.summaryTitle.style.cssText = `
        margin: 0 0 10px 0;
        font-size: 1.4em;
        color: #2c3e50;
    `;
    
    elements.summaryText = document.createElement('p');
    elements.summaryText.textContent = summaryData.summary;
    elements.summaryText.style.cssText = `
        margin: 0 0 20px 0;
        line-height: 1.5;
        color: #34495e;
    `;
    
    // Key Takeaways
    elements.takeawaysTitle = document.createElement('h3');
    elements.takeawaysTitle.textContent = '🎯 Key Takeaways';
    elements.takeawaysTitle.style.cssText = `
        margin: 0 0 10px 0;
        font-size: 1.2em;
        color: #2c3e50;
    `;
    
    elements.takeawaysList = document.createElement('ul');
    elements.takeawaysList.style.cssText = `
        margin: 0 0 20px 0;
        padding-left: 20px;
        line-height: 1.4;
        color: #34495e;
        list-style: disc;
    `;
    
    summaryData.keyTakeaways.forEach(takeaway => {
        const li = document.createElement('li');
        li.textContent = takeaway;
        li.style.marginBottom = '5px';
        elements.takeawaysList.appendChild(li);
    });
    
    return elements;
}

// Helper function for showing copied message (not included in original code)
function showCopiedMessage() {
    // You can implement this function to show a notification when content is copied
    // For example:
    const notification = document.createElement('div');
    notification.textContent = 'Copied to clipboard!';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        animation: fadeOut 2s forwards;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}
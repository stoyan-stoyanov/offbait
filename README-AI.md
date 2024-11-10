# Repository Documentation

This documentation was automatically generated.


## ./README.md

```
# Page Summarizer Extension 🪝

> Tired of scrolling through 15 paragraphs just to find out you can actually microwave that leftover pizza? Yeah, we feel you.

In today's internet, content creators often bury the good stuff under mountains of fluff, ads, and SEO keywords. Why? Because that's how they make money. But your time is worth more than that.

This extension fights back against clickbait and content bloat. It uses AI to instantly extract what you actually want to know - the key points, the real answer, the important stuff. Whether it's a recipe buried under someone's life story or a product review hidden in affiliate links, we'll get you straight to the point.

Think of it as your personal BS filter for the internet. Not only will you save time, but maybe, just maybe, we'll help push the internet back towards what matters: quality content that respects your time.

## ✨ Features

- 🤖 AI-powered summarization using OpenAI's GPT models
- 🚀 Automatic or manual summary generation for web pages
- 📱 Clean, modern UI with responsive design
- 📋 One-click sharing functionality
- 🎯 Extractive key takeaways
- ⚙️ Configurable settings with API key management
- 🔄 Loading states and error handling
- 🎨 Tailored summaries based on content type (articles, recipes, product pages, etc.)
- 🌐 Support for both Chrome and Firefox browsers

## 🛠️ Technical Implementation

### Core Components

- **Content Script**: Handles page analysis and summary injection
- **Background Script**: Manages browser action and extension lifecycle
- **Options Page**: Provides user configuration interface
- **UI Components**: Creates modern, responsive summary displays

### Key Files

- `summarizer.js`: AI integration and content processing
- `ui.js`: Summary panel and interface components
- `auto-summarize.js`: Automatic summarization logic
- `options.js`: Settings management
- `utils.js`: Helper functions and utilities

### Browser Support

- Chrome (Manifest V3)
- Firefox (Manifest V2)

## 🔧 Configuration

### API Setup

1. Open the extension settings
2. Enter your OpenAI API key
3. Configure auto-summarization preference

### Permissions Required

- `activeTab`: For accessing current page content
- `storage`: For saving user preferences
- `scripting`: For Chrome manifest V3 support
- `host_permissions`: For running on web pages

## 💡 How It Works

1. **Content Detection**
   - Analyzes current page to determine if it's suitable for summarization
   - Excludes homepages and non-article pages

2. **Summary Generation**
   - Cleanses HTML content
   - Sends processed text to OpenAI API
   - Generates concise summary and key takeaways
   - Adapts output based on content type

3. **Display**
   - Shows loading indicator during generation
   - Presents summary in a clean, floating panel
   - Provides sharing and closing options

## 🔄 Build Process

```bash
# Clean and prepare build directories
./build.sh
```

This will:
1. Create separate builds for Chrome and Firefox
2. Copy appropriate manifest versions
3. Bundle necessary resources
4. Generate distribution ZIP files

## 🎨 UI Features

- Modern, system-font based typography
- Responsive layout with mobile support
- Animated loading states
- Success/error notifications
- Share button with copy confirmation
- Settings panel with toggle switches
- Clean, consistent styling

## 🔐 Security

- Secure API key storage
- Content Security Policy implementation
- Safe HTML content processing
- Error handling and validation

## 📦 Distribution

The extension can be packaged for:
- Chrome Web Store
- Firefox Add-ons

## 🛟 Support

For issues or feature requests, please:
1. Check existing GitHub issues
2. Submit detailed bug reports
3. Include browser and extension version

## 🔜 Future Improvements

- Additional summarization options
- More sharing capabilities
- Enhanced content detection
- Support for more browsers
- Offline summarization capabilities

## 🔗 Links

- [Chrome Web Store](#)
- [Firefox Add-ons](#)
- [GitHub Repository](#)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.```


## ./manifest.chrome.json

```
{
    "manifest_version": 3,
    "name": "Page Summarizer",
    "version": "1.0",
    "description": "Automatically adds a summary at the top of web pages",
    "permissions": [
        "activeTab",
        "scripting",
        "storage"
    ],
    "host_permissions": [
        "<all_urls>"
    ],
    "options_ui": {
        "page": "options.html",
        "open_in_tab": true
    },
    "action": {
        "default_icon": {
            "16": "icons/hook-16.png",
            "32": "icons/hook-32.png",
            "48": "icons/hook-48.png",
            "96": "icons/hook-96.png"
        },
        "default_title": "Summarize Page"
    },
    "content_scripts": [
        {
            "matches": ["<all_urls>"],
            "js": [
                "src/utils.js",
                "src/ui.js",
                "src/summarizer.js",
                "src/auto-summarize.js"
            ],
            "css": ["src/styles.css"]
        }
    ],
    "icons": {
        "16": "icons/hook-16.png",
        "32": "icons/hook-32.png",
        "48": "icons/hook-48.png",
        "96": "icons/hook-96.png"
    },
    "background": {
        "service_worker": "src/background.chrome.js"
    },
    "content_security_policy": {
        "extension_pages": "script-src 'self'; style-src 'self' https://cdnjs.cloudflare.com; font-src 'self' https://cdnjs.cloudflare.com; default-src 'self'"
    }
}```


## ./build.sh

```
# Clean previous builds
rm -rf build
mkdir -p build/chrome build/firefox

# Copy shared files to Chrome build
mkdir -p build/chrome/src
cp -r src/* build/chrome/src/
rm build/chrome/src/background.js
cp options.html build/chrome/options.html

# cp -r src/* build/firefox/
cp -r icons build/chrome/
# cp -r icons build/firefox/

# Copy respective manifest files
cp manifest.chrome.json build/chrome/manifest.json
# cp manifest.firefox.json build/firefox/manifest.json

# Create zip files
# The '../' makes it save to build/ instead of build/chrome/
cd build/chrome && zip -r ../chrome-extension.zip ./* && cd ../..
# cd build/firefox && zip -r ../firefox-extension.zip ./* && cd ../..

# Clean up everything except zip files
# rm -rf build/chrome/* build/firefox/*```


## ./manifest.json

```
{
    "manifest_version": 2,
    "name": "Page Summarizer",
    "version": "1.0",
    "description": "Automatically adds a summary at the top of web pages",
    "permissions": [
        "activeTab",
        "<all_urls>",
        "storage"
    ],
    "options_ui": {
        "page": "options.html",
        "open_in_tab": true
    },
    "browser_action": {
        "default_icon": {
            "16": "icons/hook-16.png",
            "32": "icons/hook-32.png",
            "48": "icons/hook-48.png",
            "96": "icons/hook-96.png"
        },
        "default_title": "Summarize Page"
    },
    "content_scripts": [
        {
            "matches": ["<all_urls>"],
            "js": [
                "src/utils.js",
                "src/ui.js",
                "src/summarizer.js",
                "src/auto-summarize.js",
                "src/options.js"
            ],
            "css": ["src/styles.css"]
        }
    ],
    "icons": {
        "16": "icons/hook-16.png",
        "32": "icons/hook-32.png",
        "48": "icons/hook-48.png",
        "96": "icons/hook-96.png"
    },
    "background": {
        "scripts": ["src/background.js"],
        "persistent": false
    },
    "content_security_policy": "script-src 'self'; style-src 'self' https://cdnjs.cloudflare.com; font-src 'self' https://cdnjs.cloudflare.com; default-src 'self'"
}```


## ./options.html

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>OffBait Settings</title>
    <link rel="stylesheet" href="src/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
    <div class="ob-container">
        <header class="ob-header">
            <div class="ob-logo">
                <i class="fa-solid fa-cog"></i>
            </div>
            <div class="ob-header-content">
                <h1 class="ob-title">Settings</h1>
            </div>
        </header>

        <form id="options-form">
            <div class="ob-section">
                <div class="ob-section-header">
                    <h3 class="ob-section-title"><i class="fa-solid fa-key"></i> API Configuration</h3>
                </div>
                
                <div class="ob-setting-row">
                    <div>
                        <div class="ob-setting-label">OpenAI API Key</div>
                        <div class="ob-setting-description">Enter your API key to enable AI-powered summarization</div>
                    </div>
                    <input 
                        type="password" 
                        id="apiKey" 
                        class="ob-input"
                        placeholder="sk-..." 
                        pattern="sk-[a-zA-Z0-9]{32,}"
                        required
                    />
                </div>
            </div>

            <div class="ob-section">
                <div class="ob-section-header">
                    <h3 class="ob-section-title"><i class="fa-solid fa-sliders"></i> Preferences</h3>
                </div>

                <div class="ob-setting-row">
                    <div>
                        <div class="ob-setting-label">Automatic Summarization</div>
                        <div class="ob-setting-description">Generate article summaries instantly when you open a new page</div>
                    </div>
                    <label class="ob-toggle-switch">
                        <input type="checkbox" id="autoSummarize">
                        <span class="ob-slider"></span>
                    </label>
                </div>
            </div>

            <div class="ob-actions">
                <button type="submit" class="ob-button">Save changes</button>
            </div>
        </form>

        <div id="message" class="ob-message"></div>
    </div>

    <script src="src/options.js"></script>
</body>
</html>```


## ./src/ui.js

```
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
}```


## ./src/auto-summarize.js

```
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
}```


## ./src/styles.css

```
/* styles.css */

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

/* Loading Animation */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Share Button */
.share-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background-color 0.2s;
}

.share-button:hover {
    background-color: #2980b9;
}

/* Copy Message */
.copied-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #2ecc71;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    animation: fadeIn 0.3s, fadeOut 0.3s 1.7s;
    z-index: 10000;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(10px); }
}

/* Summary Container Styles */
#page-summary-extension {
    background: white;
    padding: 25px 25%;
    border-bottom: 2px solid #ccc;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    position: relative;
}

/* Loading State */
#page-summary-loading {
    background: white;
    padding: 25px 25%;
    border-bottom: 2px solid #ccc;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 10px;
}


/* Options menu styles */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

ob-body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    line-height: 1.5;
    color: #334155;
    background-color: red;
    -webkit-font-smoothing: antialiased;
}

.ob-container {
    max-width: 720px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
}

.ob-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
}

.ob-logo {
    font-size: 1.75rem;
    color: #3b82f6;
}

.ob-header-content {
    flex: 1;
}

.ob-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    letter-spacing: -0.01em;
}

.ob-subtitle {
    color: #64748b;
    font-size: 0.875rem;
    margin-top: 0.125rem;
}

.ob-section {
    background: white;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    padding: 1.25rem;
    margin-bottom: 1.25rem;
}

.ob-section-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
}

.ob-section-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3b82f6;
    font-size: 0.875rem;
}

.ob-section-title {
    font-size: 0.75rem;
    font-weight: 600;
    color: #263345;
    letter-spacing: 0.05em;
}

.ob-setting-row {
    padding: 1rem 0;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 2rem;
    align-items: center;
}

.ob-setting-row:not(:last-child) {
    border-bottom: 1px solid #f1f5f9;
}

.ob-setting-label {
    font-weight: 500;
    color: #334155;
    font-size: 0.875rem;
}

.ob-setting-description {
    color: #64748b;
    font-size: 0.75rem;
    margin-top: 0.25rem;
}

.ob-input {
    width: 300px;
    padding: 0.5rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.875rem;
    font-family: inherit;
    color: #334155;
}

.ob-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.ob-toggle-switch {
    position: relative;
    width: 36px;
    height: 20px;
}

.ob-toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.ob-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #e2e8f0;
    transition: 0.15s;
    border-radius: 20px;
}

.ob-slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.15s;
    border-radius: 50%;
}

.ob-toggle-switch input:checked + .ob-slider {
    background-color: #3b82f6;
}

.ob-toggle-switch input:checked + .ob-slider:before {
    transform: translateX(16px);
}

.ob-actions {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    padding-top: 1.25rem;
    border-top: 1px solid #e2e8f0;
}

.ob-button {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    transition: 0.15s;
    cursor: pointer;
    font-family: inherit;
}

.ob-button:hover {
    background-color: #2563eb;
}

.ob-message {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.625rem 1rem;
    border-radius: 6px;
    font-size: 0.75rem;
    display: none;
    animation: ob-slideUp 0.2s ease-out;
    z-index: 100;
}

@keyframes ob-slideUp {
    from {
        transform: translate(-50%, 100%);
        opacity: 0;
    }
    to {
        transform: translate(-50%, 0);
        opacity: 1;
    }
}

.ob-success {
    background-color: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
}

.ob-error {
    background-color: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
}

@media (max-width: 640px) {
    .ob-setting-row {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .ob-input {
        width: 100%;
    }
}

/* deprecated floating button

#summary-activate-button {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 10000;
    background-color: #f4f4f4;
    color: white;
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

#summary-activate-button:hover {
    background-color: #b1c7d5;
    transform: scale(1.05);
    transition: transform 0.2s;
}

#summary-activate-button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
}

#summary-activate-button .spinner {
    width: 1.2rem;
    height: 1.2rem;
    border: 2px solid #fff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
*/```


## ./src/background.js

```
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
});```


## ./src/options.js

```
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
form.addEventListener('submit', saveSettings);```


## ./src/background.chrome.js

```
// background.chrome.js
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: async () => {
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
        }
    });
});```


## ./src/utils.js

```
// utils.js

function isArticlePage() {
    const url = window.location.href;
    const urlObj = new URL(url);
    return urlObj.pathname !== '/' && urlObj.pathname !== '';
}

function waitForContent() {
    return new Promise((resolve) => {
        if (document.body) {
            resolve();
            return;
        }

        const observer = new MutationObserver((mutations, obs) => {
            if (document.body) {
                obs.disconnect();
                resolve();
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    });
}

function showCopiedMessage() {
    const message = document.createElement('div');
    message.className = 'copied-message';
    message.textContent = '✓ Copied to clipboard';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}```


## ./src/content.js

```
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
}```


## ./src/summarizer.js

```
// summarizer.js

// Feature detection for browser API
const storage = typeof chrome !== 'undefined' ? chrome.storage : browser.storage;

async function getApiKey() {
    const result = await storage.local.get('apiKey');
    if (!result.apiKey) {
        throw new Error('Please set your OpenAI API key in the extension options');
    }
    return result.apiKey;
}

async function callOpenAI(content) {
    const apiKey = await getApiKey();
    console.log("API Key:", apiKey);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // model: "gpt-4o-2024-08-06",
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are the biggest expert at summarizing content from HTML. Extract a summary, and key takeaways from the provided text. If the title is a catchy question, attempt to answer the question directly and immediately. Focus only on the important informative stuff and be concise and clear. The summary shouldn't be longer than 3 sentences, and there should be max of 3-5 bullet points. Please give me the best info possible. Extract the highlights based on the type of the content. For example, if it's a recipe summarize the ingredients and detailed recipe steps in the key takeaways, if the content is from a product page extract key product information. If you do well I will give you a massive tip of 1000 dollars!"
                },
                {
                    role: "user",
                    content: `Please provide a high-quality summary of this content by focusing on relevant key information: ${content}`
                }
            ],
            response_format: {
                type: "json_schema",
                json_schema: { 
                    name: "article_summary",
                    schema: {
                        type: "object",
                        properties: {
                            summary: { type: "string" },
                            keyTakeaways: {
                                type: "array",
                                items: { type: "string" }
                            }
                        },
                        required: ["summary", "keyTakeaways"],
                        additionalProperties: false
                    },
                    strict: true
                }
            }
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API error details:", errorData);
        throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log("OpenAI response data:", data);
    return data.choices[0].message.content ? JSON.parse(data.choices[0].message.content) : data;
}

function cleanHtmlContent(htmlContent) {
    // Create a temporary element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Remove scripts, styles, and other non-content elements
    const elementsToRemove = tempDiv.querySelectorAll('script, style, nav, footer, header, aside');
    elementsToRemove.forEach(element => element.remove());
    
    // Get the main content (you might want to adjust these selectors based on common article containers)
    const mainContent = tempDiv.querySelector('article, main, .content, .article-content') || tempDiv;
    
    // Get text content and clean it up
    return mainContent.textContent
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 15000); // OpenAI has a token limit, so we'll truncate
}

async function summarizePage(htmlContent) {
    try {
        console.log("Summarization function called");
        
        // Clean the HTML content
        const cleanContent = cleanHtmlContent(htmlContent);
        
        // Get summary from OpenAI
        const summary = await callOpenAI(cleanContent);
        
        return {
            title: summary.title || document.title,
            summary: summary.summary,
            keyTakeaways: summary.keyTakeaways
        };
        
    } catch (error) {
        console.error("Error in summarization:", error);
        // Return a fallback response
        return {
            title: document.title || "Article Title",
            summary: "Failed to generate summary. " + error.message,
            keyTakeaways: ["Error: Could not generate key takeaways"]
        };
    }
}```


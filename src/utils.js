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
}
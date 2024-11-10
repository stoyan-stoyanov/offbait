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
}
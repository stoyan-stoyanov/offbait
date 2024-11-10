# Page Summarizer Extension

A Firefox extension that automatically generates and displays a summary at the top of web pages. The extension provides key takeaways and main points from the page content in a clean, user-friendly interface.

## Features

- 🚀 Automatic summary generation for all web pages (except homepages)
- ✨ Clean, modern UI with loading states
- 📋 One-click sharing functionality
- 🎯 Key takeaways section
- ❌ Easy-to-use close button
- 🔄 Loading indicator while generating summary

## How It Works

The extension automatically runs on web pages and:

1. Checks if the current page is not a homepage
2. Shows a loading indicator while generating the summary
3. Creates a summary panel containing:
   - Article title
   - Main summary paragraph
   - Key takeaways list
   - Share button

The summary panel appears at the top of the page with a white background and subtle shadow for better readability.

## Technical Implementation

### Content Script (`content.js`)

The main functionality is implemented through several key components:

- `isArticlePage()`: Determines if the current page should be summarized
- `yourSummarizationFunction()`: Generates the summary (currently returns mock data)
- `createLoadingState()`: Creates the loading UI while generating summary
- `summarizePage()`: Main function that orchestrates the summary generation and display
- `createShareButton()`: Implements the sharing functionality with clipboard support

### Permissions

The extension requires:
- `activeTab`: To access the current tab's content
- `<all_urls>`: To run on any webpage

## User Interface

The extension provides:
- A clean, modern interface with system fonts
- Loading spinner with animation
- Share button with copy-to-clipboard functionality
- Animated notifications for successful copying
- Close button to remove the summary

## Sharing Features

Users can share summaries via a dedicated share button that copies:
- Main summary
- Key takeaways
- Current page URL
- Attribution and link to extension

## Development Notes

To customize the extension:
1. Replace `LOGO_URL_HERE` with your actual logo URL
2. Replace `GITHUB_URL_HERE` with your repository URL
3. Implement actual summarization logic in `yourSummarizationFunction()`
4. Customize styling by modifying the CSS-in-JS styles

## Browser Support

Currently supports Firefox through Manifest V2.
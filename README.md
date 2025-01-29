# Tab Reloader Extension

Welcome to the Tab Reloader extension! 🚀

This browser extension allows you to automatically refresh specific tabs at customizable intervals, keeping your web experience streamlined and efficient.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Customizable Refresh Intervals:** Set how often you'd like the tab to refresh (in seconds).
- **Track Active Tab:** Automatically refreshes the current tab based on your specified interval.
- **Persistent Timer:** The timer continues even if you switch tabs, ensuring your tab gets refreshed on schedule.
- **Simple Control:** Start and stop the refresh for each tab individually.
- **User-Friendly Interface:** An intuitive popup UI that lets you control everything.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/GodOfZap/TabReloader.git
    ```
2. Go to Chrome's Extensions page:
    - Open `chrome://extensions/` in your browser.
    - Enable Developer mode in the top right.
3. Load the extension:
    - Click on **Load unpacked**.
    - Select the folder where you cloned the repository.
    - Once loaded, the Tab Reloader extension will appear in your browser’s extension bar!

## Usage

How to use:
1. Click on the Tab Reloader icon in your browser toolbar.
2. Enter the interval time (in seconds) you'd like the tab to refresh.
3. Click **Start Refresh** to begin reloading the current tab at the specified interval.
4. If you want to stop refreshing the tab, click **Stop Refresh**.
5. Your refresh timer will continue to count down, even if you switch to a different tab.

## Development

Want to customize or improve Tab Reloader? Awesome! Here's how you can get started:

### Setting Up Locally
1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/GodOfZap/TabReloader.git
    cd tab-reloader
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Load the extension in your browser:
    - Go to `chrome://extensions/`
    - Enable Developer mode.
    - Click **Load unpacked** and select the folder where your project is located.

### Making Changes
- The code is written using React for the popup UI and JavaScript for the background script.
- If you’re unfamiliar with it, these are the main files:
    - `background.js`: Handles background processes like tab refreshing and interval management.
    - `App.jsx`: The popup UI where users can set refresh intervals, start/stop refreshing, and see the countdown.
    - `manifest.json`: Contains metadata and configuration for the Chrome extension.

### Adding New Features
1. Feature Design: Think about how you want to improve the extension.
2. Write the Code: Implement the feature.
3. Test: Ensure everything works smoothly by loading the extension locally and testing it in your browser.
4. Commit Changes: After testing, commit your changes to your branch and create a pull request.

## Contributing

I'd love for you to contribute to Tab Reloader. Whether it's fixing bugs, improving the code, or adding new features, your contributions are welcome.

### Steps to Contribute:
1. Fork this repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Test your changes.
5. Create a pull request with a description of what you’ve done.

### Code of Conduct:
Please be respectful and kind. We believe in a collaborative environment and encourage healthy discussions. 

## License

MIT License. See the LICENSE file for details.

## Acknowledgments

Have Fun with Tab Reloader! 😄
This extension was built with simplicity and usability in mind, so you can save time and effort by automating tab refreshes. If you run into any issues or have feature requests, feel free to open an issue here on GitHub!

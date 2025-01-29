let tabTimers = {}; // Store tab timers

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message) => {
  const { action, tabId, interval, url } = message;

  if (action === "START") {
    // If the tab is already refreshing, clear any existing interval
    if (tabTimers[tabId]) {
      clearInterval(tabTimers[tabId].intervalId);
    }

    // Store data in local storage (tabId, interval, url, remaining time)
    tabTimers[tabId] = {
      intervalId: null,
      interval: interval,
      remainingTime: interval,
      url: url,
    };

    // Start the refresh interval for this tab
    tabTimers[tabId].intervalId = setInterval(() => {
      // Decrement the timer
      tabTimers[tabId].remainingTime -= 1;

      // If the timer reaches zero, refresh the tab
      if (tabTimers[tabId].remainingTime <= 0) {
        chrome.tabs.reload(tabId); // Refresh the specific tab
        tabTimers[tabId].remainingTime = interval; // Reset the timer for next refresh
      }

      // Save the updated data in local storage
      chrome.storage.local.set({
        [tabId]: {
          isRefreshing: true,
          interval,
          url,
          remainingTime: tabTimers[tabId].remainingTime,
        },
      });
    }, 1000); // Check every second

    // Save the refresh state in local storage
    chrome.storage.local.set({
      [tabId]: { isRefreshing: true, interval, url, remainingTime: interval },
    });
  }

  if (action === "STOP") {
    // Stop the refresh for the tab
    if (tabTimers[tabId]) {
      clearInterval(tabTimers[tabId].intervalId);
      delete tabTimers[tabId]; // Remove the tab's timer from storage
    }

    // Update storage to indicate the tab is no longer refreshing
    chrome.storage.local.set({
      [tabId]: { isRefreshing: false, interval: 0, url: "", remainingTime: 0 },
    });
  }
});

// When a tab is closed, clear its timer
chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabTimers[tabId]) {
    clearInterval(tabTimers[tabId].intervalId);
    delete tabTimers[tabId]; // Remove the tab's timer
  }

  // Clean up storage
  chrome.storage.local.remove(tabId.toString());
});

// Cleanup stale refresh data regularly
setInterval(() => {
  chrome.storage.local.get(null, (data) => {
    for (const tabId in data) {
      // Check if the tab is still open and refreshing
      chrome.tabs.get(Number(tabId), (tab) => {
        if (!tab) {
          // If the tab is no longer open, clear its data
          chrome.storage.local.remove(tabId);
          delete tabTimers[tabId];
        }
      });
    }
  });
}, 3600000); // Clean up every hour

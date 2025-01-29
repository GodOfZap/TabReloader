import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshTime, setRefreshTime] = useState(5); // Default refresh time (seconds)
  const [timer, setTimer] = useState(refreshTime);
  const [tabId, setTabId] = useState(null); // Store the tab ID for the currently refreshing tab
  const [tabUrl, setTabUrl] = useState(""); // Store the URL of the tab

  // Function to start refreshing the current tab
  const startRefresh = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      setTabId(activeTab.id);  // Store the active tab's ID
      setTabUrl(activeTab.url); // Store the URL of the active tab
      setIsRefreshing(true);
      setTimer(refreshTime);

      // Send message to background script to start refreshing the active tab
      chrome.runtime.sendMessage({
        action: "START",
        tabId: activeTab.id,
        interval: refreshTime,
        url: activeTab.url,
      });

      // Persist the refresh interval in local storage
      chrome.storage.local.set({
        [activeTab.id]: { isRefreshing: true, interval: refreshTime, url: activeTab.url, remainingTime: refreshTime },
      });
    });
  };

  // Function to stop refreshing the current tab
  const stopRefresh = () => {
    if (tabId) {
      // Send message to background script to stop refreshing this tab
      chrome.runtime.sendMessage({
        action: "STOP",
        tabId: tabId,
      });

      // Remove tab refresh state from chrome storage
      chrome.storage.local.remove(tabId.toString());
    }
    setIsRefreshing(false);
    setTimer(refreshTime); // Reset the timer to the default refresh time
  };

  // Handle time input change
  const handleTimeChange = (e) => {
    setRefreshTime(e.target.value);
    if (isRefreshing) {
      setTimer(e.target.value);
      stopRefresh(); // Stop the current refresh cycle
      startRefresh(); // Restart refresh with the new time
    }
  };

  // Check tab's refresh state on load and update UI
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.storage.local.get(activeTab.id.toString(), (data) => {
        if (data[activeTab.id] && data[activeTab.id].isRefreshing) {
          setIsRefreshing(true);
          setTabId(activeTab.id);
          setTabUrl(activeTab.url);
        }
      });
    });
  }, []);

  // Update the timer every second if refreshing
  useEffect(() => {
    let timerInterval;
    if (isRefreshing) {
      timerInterval = setInterval(() => {
        // Only decrement the timer if the tab is still refreshing
        chrome.storage.local.get(tabId.toString(), (data) => {
          if (data[tabId]) {
            const remainingTime = data[tabId].remainingTime;
            setTimer(remainingTime);
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval); // Cleanup the interval
  }, [isRefreshing, tabId]);

  return (
    <div className="app-container">
      <h1>Tab Reloader</h1>
      <div className="input-container">
        <label>Refresh Time (seconds):</label>
        <input
          type="number"
          value={refreshTime}
          onChange={handleTimeChange}
          min="1"
        />
      </div>
      <div className="button-container">
        <button
          className={`action-button ${isRefreshing ? "stop" : "start"}`}
          onClick={isRefreshing ? stopRefresh : startRefresh}
        >
          {isRefreshing ? "Stop Refresh" : "Start Refresh"}
        </button>
      </div>
      <div className="status-container">
        <p>Status: {isRefreshing ? "Refreshing..." : "Not Refreshing"}</p>
        {isRefreshing && (
          <>
            <p>Next refresh in: {timer}s</p>
            <p>Refreshing tab: {tabUrl}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default App;

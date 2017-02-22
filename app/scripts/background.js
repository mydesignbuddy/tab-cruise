// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';
import TabRotation from './tabRotation';

var curWindowId = null;
var isFullscreen = true;
var tabRotation = new TabRotation(rotatingTab, stopRotatingTab);

chrome.windows.onFocusChanged.addListener(function (windowId) {
  if (windowId != -1) {
    curWindowId = windowId;
  }
});

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function (tabId) {
  chrome.pageAction.show(tabId);
});

function rotatingTab() {
  chrome.tabs.query({ active: true, windowType: "normal", currentWindow: true }, function (curTab) {
    var curTab = curTab[0];
    chrome.windows.get(curTab.windowId, { populate: true },
      function (window) {
        var foundSelected = false;
        for (var i = 0; i < window.tabs.length; i++) {
          // Finding the selected tab.
          if (window.tabs[i].active) {
            foundSelected = true;
          }
          // Finding the next tab.
          else if (foundSelected) {
            // Selecting the next tab.
            chrome.tabs.update(window.tabs[i].id, { active: true });
            console.log("foundSelected: " + window.tabs[i].id);
            if (isFullscreen) {
              chrome.windows.update(curTab.windowId, { state: "fullscreen" });
            }
            return;
          } else {
            chrome.tabs.update(window.tabs[0].id, { active: true });
            if (isFullscreen) {
              chrome.windows.update(curTab.windowId, { state: "fullscreen" });
            }
          }
        }
      });
  })
};

function stopRotatingTab() {
  try {
    chrome.tabs.query({ active: true, windowType: "normal", currentWindow: true }, function (curTab) {
      var curTab = curTab[0];
      if (curTab) {
        chrome.windows.update(curTab.windowId, { state: "normal" });
      }
      return;
    });
  } catch (e){

  }
}

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
      switch (request.type) {
        case "userevent":
          tabRotation.stopIdle();
          break;
        case "getStatus":
          chrome.extension.sendMessage({
            type: "getStatusResult",
            isRotating: tabRotation.isRotating,
            isIdle: tabRotation.isIdle
          });
          break;
        case "startRotatingTabs":
          var idleTime = request.data.screensaverTime * 1000;
          var rotationTime = request.data.tabRotationSpeed * 1000;
          isFullscreen = request.data.isFullscreen;
          tabRotation.setTimer(rotationTime, idleTime);
          tabRotation.startRotation();
          break;
        case "stopRotatingTabs":
          tabRotation.stopRotation();
          break;
        case "openOptions":
          chrome.runtime.openOptionsPage();
          break;
        case "getSettings":
          chrome.storage.sync.get('settings', function (settings) {
            console.log(settings.settings, "getSettings");
            chrome.extension.sendMessage({
              type: "getSettingsResponse",
              data: settings.settings
            });
          });
          break;
        case "setSettings":
          console.log(request.data, "setSettings BG");
          chrome.storage.sync.set({ 'settings': request.data }, function () {
            chrome.extension.sendMessage({
              type: "saveSettingsUpdated",
              data: request.data
            });
          });
          break;
      }
      return true;
    });

  chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
      case "stop-tab-rotation":
        console.log("stop-tab-rotation");
        tabRotation.stopRotation();
        break;
    }
    return true;
  });

var screensaverTimeInput = document.getElementById('screensaverTime');
var tabRotationSpeedInput = document.getElementById('tabRotationSpeed');
var isFullscreenInput = document.getElementById('enableFullscreen');
var saveButton = document.getElementById('save');

var settings = {
  screensaverTime: null,
  tabRotationSpeed: null,
  isFullscreen: null
};

function getSettings() {
  chrome.extension.sendMessage({
    type: "getSettings"
  });
}
function setSettings(settings) {
  console.log(settings, "setSettings in Option Page");
  chrome.extension.sendMessage({
    type: "setSettings",
    data: settings
  });
}
function settingsUpdated(settings) {
  screensaverTimeInput.value = settings.screensaverTime;
  tabRotationSpeedInput.value = settings.tabRotationSpeed;
  isFullscreenInput.checked = settings.isFullscreen;
}

function getValues() {
  settings.screensaverTime = parseInt(screensaverTimeInput.value);
  settings.tabRotationSpeed = parseInt(tabRotationSpeedInput.value);
  settings.isFullscreen = (isFullscreenInput.checked) ? true : false;
  return settings;
}

saveButton.onclick = function () {
  setSettings(getValues());
}
window.onload = function () {
  getSettings();
}

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case "getSettingsResponse":
      settings = request.data;
      settingsUpdated(settings);
      break;
  }
});

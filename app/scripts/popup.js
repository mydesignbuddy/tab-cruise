var status = { isRotating: false, isIdle: false };

var quotes = [
  "Son, your ego is writing checks your body can't cash",
  "I feel the need...The need for speed!",
  "You can be my wingman anytime",
  "Let's turn and burn",
  "That's right Iceman! I am dangerous",
  "Talk to me Goose",
  "Help me help you",
  "Shut up, just shut up. You had me at hello",
  "You had me at hello",
  "The human head weighs 8 pounds.",
  "You complete me",
  "Show me the money!",
  "Have no dout, you are a killer, Louis!",
  "I assume I need no introduction",
  "Evil is a point of view",
  "Claudia, you've been a very, very, naughty little girl",
  "Do you still want death or have you tasted it enough?",
  "I've had to listen to that for centuries"
];

var screensaverTimeInput = document.getElementById('screensaverTime');
var tabRotationSpeedInput = document.getElementById('tabRotationSpeed');
var isFullscreenInput = document.getElementById('enableFullscreen');

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

function settingsUpdated(settings) {
  screensaverTimeInput.value = settings.screensaverTime;
  tabRotationSpeedInput.value = settings.tabRotationSpeed;
  isFullscreenInput.value = settings.isFullscreen;
}

function setSettings(settings) {
  console.log(settings, "setSettings in Option Page");
  chrome.extension.sendMessage({
    type: "setSettings",
    data: settings
  });
}

function getRandomQuote() {
  return quotes[Math.floor(quotes.length * Math.random())];
}

window.onload = function () {
  document.getElementById("quote").innerText = getRandomQuote();
  chrome.extension.sendMessage({
    type: "getStatus"
  });
  getSettings();
}

function getValues() {
  settings.screensaverTime = parseInt(screensaverTimeInput.value);
  settings.tabRotationSpeed = parseInt(tabRotationSpeedInput.value);
  settings.isFullscreen = (isFullscreenInput.checked) ? true : false;
  return settings;
}

/*document.getElementById("getCurrentWindowInfo").onclick = function () {
  chrome.extension.sendMessage({
    type: "getCurrentWindowInfo"
  });
};*/
document.getElementById("toggle").onclick = function () {
  if (status.isRotating == false) {
    setSettings(getValues());
    chrome.extension.sendMessage({
      type: "startRotatingTabs",
      data: getValues()
    });
  } else {
    chrome.extension.sendMessage({
      type: "stopRotatingTabs"
    });
  }
  window.close();
};

function updateStatus(isRotating, isIdle) {
  var button = document.getElementById("toggle");
  var hideBlock = document.getElementById("hideWhenEnabled");
  button.className = (isRotating) ? "red" : "green";
  button.innerText = (!isRotating) ? "Enabled" : "Disabled";
  status.isRotating = isRotating;
  status.isIdle = isIdle;
  if (isRotating) {
    hideBlock.style.display = "none";
  } else {
    hideBlock.style.display = "block";
  }
}

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case "getStatusResult":
      updateStatus(request.isRotating, request.isIdle);
      break;
    case "getSettingsResponse":
      settings = request.data;
      settingsUpdated(settings);
      break;
  }
  return true;
});

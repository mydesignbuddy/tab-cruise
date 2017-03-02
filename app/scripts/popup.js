import { UI } from './ui';

var popupUI;

class PopupUI extends UI {
  status = { isRotating: false, isIdle: false };
  quotes = [
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
  toggleButton = document.getElementById("toggle");
  hideBlock = document.getElementById("hideWhenEnabled");

  constructor() {
    super();
    var self = this;
    document.getElementById("quote").innerText = this.getRandomQuote();
    chrome.extension.sendMessage({
      type: "getStatus"
    });

    this.toggleButton.onclick = function () {
      if (self.status.isRotating == false) {
        console.log("startRotatingTabs")
        self.save();
        chrome.extension.sendMessage({
          type: "startRotatingTabs",
          data: self.getValues()
        });
      } else {
        console.log("stopRotatingTabs")
        chrome.extension.sendMessage({
          type: "stopRotatingTabs"
        });
      }
      window.close();
    };
    this.init();
  }

  init() {
    var self = this;
    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
      switch (request.type) {
        case "getStatusResult":
          self.updateStatus(request.isRotating, request.isIdle);
          break;
      }
    });
  }

  updateStatus(isRotating, isIdle) {
    this.toggleButton.className = (isRotating) ? "red" : "green";
    this.toggleButton.innerText = (!isRotating) ? "Enabled" : "Disabled";
    this.status.isRotating = isRotating;
    this.status.isIdle = isIdle;
    if (isRotating) {
      this.hideBlock.style.display = "none";
    } else {
      this.hideBlock.style.display = "block";
    }
  }

  getRandomQuote() {
    return this.quotes[Math.floor(this.quotes.length * Math.random())]
  }
}

window.onload = function () {
  popupUI = new PopupUI();
};

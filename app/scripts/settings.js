export class Settings {
  screensaverTime;
  tabRotationSpeed;
  isFullscreen;
  enableRefresh;

  constructor(settings) {
    if (settings != null) {
      this.screensaverTime = (settings.screensaverTime != null) ? settings.screensaverTime : 300;
      this.tabRotationSpeed = (settings.tabRotationSpeed != null) ? settings.tabRotationSpeed : 120;
      this.isFullscreen = (settings.isFullscreen != null) ? settings.isFullscreen : true;
      this.enableRefresh = (settings.enableRefresh != null) ? settings.enableRefresh : true;
    }
  }

  getSavedSettings() {
    chrome.extension.sendMessage({
      type: "getSettings"
    });
  }

  setSavedSettings(settings) {
    chrome.extension.sendMessage({
      type: "setSettings",
      data: settings
    });
  }
}

import { Settings } from './settings';
export class UI {
  screensaverTimeInput = null;
  tabRotationSpeedInput = null;
  isFullscreenInput = null;
  settings = new Settings(this.update);

  constructor() {
    this.screensaverTimeInput = document.getElementById('screensaverTime');
    this.tabRotationSpeedInput = document.getElementById('tabRotationSpeed');
    this.isFullscreenInput = document.getElementById('enableFullscreen');
    this.enableRefreshInput = document.getElementById('enableRefresh');
    this.settings.getSavedSettings();

    var self = this;
    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.type == "getSettingsResponse") {
        if (request.data != null) {
          self.settings.screensaverTime = request.data.screensaverTime;
          self.settings.tabRotationSpeed = request.data.tabRotationSpeed;
          self.settings.isFullscreen = request.data.isFullscreen;
          self.settings.enableRefresh = request.data.enableRefresh;
          self.update(self.settings)
        }
      }
    });
  }


  getValues() {
    var data = {};
    data.screensaverTime = parseInt(this.screensaverTimeInput.value);
    data.tabRotationSpeed = parseInt(this.tabRotationSpeedInput.value);
    data.isFullscreen = (this.isFullscreenInput.checked) ? true : false;
    data.enableRefresh = (this.enableRefreshInput.checked) ? true : false;
    return data;
  }

  update(settings) {
    this.settings = settings;
    this.screensaverTimeInput.value = settings.screensaverTime;
    this.tabRotationSpeedInput.value = settings.tabRotationSpeed;
    this.isFullscreenInput.checked = settings.isFullscreen;
    this.enableRefreshInput.checked = settings.enableRefresh;
  }
  save() {
    this.settings.setSavedSettings(this.getValues());
  }
}

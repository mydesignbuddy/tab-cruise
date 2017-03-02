import { UI } from './ui';

var optionUI;

class OptionUI extends UI {
  saveButton = document.getElementById("save");

  constructor() {
    super();
    var self = this;

    this.saveButton.onclick = function () {
      self.save();
      window.close();
    };
  }
}

window.onload = function () {
  optionUI = new OptionUI();
};

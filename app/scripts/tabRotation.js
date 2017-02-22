export default class TabRotation {
  isIdle = false;
  isRotating = false;
  idleTime = 6000;
  rotationTime = 1000;
  intervalId = null;
  timeoutId = null;
  rotationOnFunc = function () {
    console.log("ROTATE");
    this.diagnostics();
  };
  rotationOffFunc = function () {
    console.log("no rotate");
    this.diagnostics();
  };

  constructor(rotationOnFunc, rotationOffFunc) {
    this.rotationOnFunc = rotationOnFunc ? rotationOnFunc : this.rotationOnFunc;
    this.rotationOffFunc = rotationOffFunc ? rotationOffFunc : this.rotationOffFunc;
    this.setTimer();
  }

  setTimer(rotationTime, idleTime) {
    var self = this;
    if (rotationTime != null) {
      this.rotationTime = rotationTime;
    }
    if (idleTime != null) {
      this.idleTime = idleTime;
    }
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(function () {
      console.log("inverval");
      if (self.isIdle == true && self.isRotating == true) {
        self.rotationOnFunc();
      } else {
        self.rotationOffFunc();
      }
    }, this.rotationTime);
  }

  startRotation() {
    this.isIdle = true;
    this.isRotating = true;
  }
  stopRotation() {
    this.isIdle = false;
    this.isRotating = false;
  }
  startIdle() {
    this.isIdle = true;
  }
  stopIdle() {
    var self = this;
    console.log("reset idle")
    this.isIdle = false;
    if (this.timeoutId != null) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(function () {
      console.log("idle end");
      self.isIdle = true;
    }, this.idleTime);
  }



  diagnostics() {
    console.log("[i] " + this.isIdle + " [r] " + this.isRotating + " [it] " + this.idleTime + " [rt] " + this.rotationTime + " [iid] " + this.intervalId + " [tid] " + this.timeoutId);
  }
}

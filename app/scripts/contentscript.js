// detect user not idling
document.addEventListener('mousemove', function (e) {
  chrome.extension.sendMessage({
    type: "userevent"
	});
}, false);
document.addEventListener('keypress', function (e) {
  chrome.extension.sendMessage({
    type: "userevent"
	});
}, false);
document.addEventListener('click', function (e) {
  chrome.extension.sendMessage({
    type: "userevent"
	});
}, false);
document.addEventListener('scroll', function (e) {
  chrome.extension.sendMessage({
    type: "userevent"
	});
}, false);

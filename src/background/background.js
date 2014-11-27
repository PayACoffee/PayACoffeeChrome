function updateBadge() {
	getUnreadItems(function(data) {
		chrome.browserAction.setBadgeText({text: "!"});
	});
}
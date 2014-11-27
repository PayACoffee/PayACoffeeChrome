$(document).ready(function() {

	var configurationArray = new Array();

	donationEmail = $("meta[name=payacoffee]").attr("email");
	if(typeof donationEmail != 'undefined') {
		configurationArray.push(donationEmail);
	} else {
		configurationArray.push("None");
	}

	donationBitcoin = $("meta[name=payacoffee]").attr("bitcoin");
	if(typeof donationBitcoin != 'undefined') {
		configurationArray.push(donationBitcoin);
	} else {
		configurationArray.push("None");
	}

	donationTitle = $("meta[name=payacoffee]").attr("title");
	if(typeof donationTitle != 'undefined') {
		configurationArray.push(donationTitle);
	} else {
		configurationArray.push("None");
	}

	donationCurrency = $("meta[name=payacoffee]").attr("currency");
	if(typeof donationCurrency != 'undefined') {
		configurationArray.push(donationCurrency);
	} else {
		configurationArray.push("None");
	}

	donationAmount = $("meta[name=payacoffee]").attr("amount");
	if(typeof donationAmount != 'undefined') {
		configurationArray.push(donationAmount);
	} else {
		configurationArray.push("None");
	}

	configurationArray.push(window.location.hostname);

	// SAVE CONFIGURATION TO CHROME STORAGE API

	chrome.storage.local.set({ 'configurationApp' : configurationArray });

});
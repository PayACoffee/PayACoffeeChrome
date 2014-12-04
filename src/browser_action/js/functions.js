var finalEmail;
var finalBitcoin;
var finalBitcoinSymbol = "Ƀ";
var finalTitle;
var finalCurrency;
var finalCurrencySymbol;
var finalAmount;
var finalURL;

/*
GET VALUES FROM CHROME STORAGE API
*/

chrome.storage.local.get( "configurationApp" , function (obj) {
	tmpGlobal = obj['configurationApp'];

	tmpEmail = tmpGlobal.slice(0,1);
	tmpBitcoin = tmpGlobal.slice(1,2);
	tmpTitle = tmpGlobal.slice(2,3);
	tmpCurrency = tmpGlobal.slice(3,4);
	tmpAmount = tmpGlobal.slice(4,5);
	tmpURL = tmpGlobal.slice(5,6);

	getPayACoffeeEmail(tmpEmail.toString());
	getPayACoffeeBitcoin(tmpBitcoin.toString());
	getPayACoffeeTitle(tmpTitle.toString());
	getPayACoffeeCurrency(tmpCurrency.toString());
	getPayACoffeeAmount(tmpAmount.toString());
	getPayACoffeeURL(tmpURL.toString());

	setPreparePayACoffee();
});

/*
CHECK EXCEPTIONS AND PREPARE HTML
*/

// SET EMAIL FOR DONATION
function getPayACoffeeEmail(email) {
	if(email.indexOf('@') != -1) {
		finalEmail = email;
	} else {
		finalEmail = "";
	}
}

// SET BITCOIN ADDRESS TO SEND DONATION
function getPayACoffeeBitcoin(bitcoin) {
	if(bitcoin.length>=26 && bitcoin.length<=34) {
		finalBitcoin = bitcoin;
	} else {
		finalBitcoin = "";
	}
}

// SEND TITLE/DESCRIPTION FOR THE DONATION
function getPayACoffeeTitle(title) {
	if(title == "None" || title == "") {
		finalTitle = "Donation for " + tmpURL + ", using PayACoffee.com";
	} else {
		finalTitle = title;
	}
}

// SET CURRENCY FOR THE DONATION. "EUR", "USD", FOR EXAMPLE. BY DEFAULT: "USD"
function getPayACoffeeCurrency(currency) {
	if(currency == "None" || currency == "") {
		finalCurrency = "USD";
		finalCurrencySymbol = "$";
	} else {
		if(currency == "USD") {
			finalCurrency = "USD";
			finalCurrencySymbol = "$";
		} else if (currency == "EUR") {
			finalCurrency = "EUR";
			finalCurrencySymbol = "€";
		} else if (currency == "AUD") {
			finalCurrency = "AUD";
			finalCurrencySymbol = "$";
		} else if (currency == "BRL") {
			finalCurrency = "BRL";
			finalCurrencySymbol = "R$";
		} else if (currency == "CAD") {
			finalCurrency = "CAD";
			finalCurrencySymbol = "$";
		} else if (currency == "CZK") {
			finalCurrency = "CZK";
			finalCurrencySymbol = "Kč";
		} else if (currency == "DKK") {
			finalCurrency = "DKK";
			finalCurrencySymbol = "kr";
		} else if (currency == "HKD") {
			finalCurrency = "HKD";
			finalCurrencySymbol = "$";
		} else if (currency == "HUF") {
			finalCurrency = "HUF";
			finalCurrencySymbol = "Ft";
		} else if (currency == "ILS") {
			finalCurrency = "ILS";
			finalCurrencySymbol = "₪";
		} else if (currency == "JPY") {
			finalCurrency = "JPY";
			finalCurrencySymbol = "¥";
		} else if (currency == "MYR") {
			finalCurrency = "MYR";
			finalCurrencySymbol = "RM";
		} else if (currency == "MXN") {
			finalCurrency = "MXN";
			finalCurrencySymbol = "$";
		} else if (currency == "NOK") {
			finalCurrency = "NOK";
			finalCurrencySymbol = "kr";
		} else if (currency == "NZD") {
			finalCurrency = "NZD";
			finalCurrencySymbol = "$";
		} else if (currency == "PHP") {
			finalCurrency = "PHP";
			finalCurrencySymbol = "₱";
		} else if (currency == "PLN") {
			finalCurrency = "PLN";
			finalCurrencySymbol = "zł";
		} else if (currency == "GBP") {
			finalCurrency = "GBP";
			finalCurrencySymbol = "£";
		} else if (currency == "RUB") {
			finalCurrency = "RUB";
			finalCurrencySymbol = "руб";
		} else if (currency == "SGD") {
			finalCurrency = "SGD";
			finalCurrencySymbol = "$";
		} else if (currency == "SEK") {
			finalCurrency = "SEK";
			finalCurrencySymbol = "kr";
		} else if (currency == "CHF") {
			finalCurrency = "CHF";
			finalCurrencySymbol = "CHF";
		} else if (currency == "TWD") {
			finalCurrency = "TWD";
			finalCurrencySymbol = "NT$";
		} else if (currency == "THB") {
			finalCurrency = "THB";
			finalCurrencySymbol = "฿";
		} else if (currency == "TRY") {
			finalCurrency = "TRY";
			finalCurrencySymbol = "TRY";
		} else {
			finalCurrency = currency;
			finalCurrencySymbol = currency;
		}
	}
}

// SET AMOUNT FOR DONATION. DEFAULT: "1.00". IT CAN'T BE ON BTN CURRENCY!!
function getPayACoffeeAmount(amount) {
	if(amount == "None" || amount == "") {
		finalAmount = "1.00";
	} else {
		finalAmount = amount;
	}
}

// SET THE WEBSITE TO RECEIVE DONATION
function getPayACoffeeURL(web) {
	if(web == "None" || web == "") {
		finalURL = "This website";
	} else {
		finalURL = web;
	}
}

// PREPARE DIV FOR BROWSER_ACTION (EXTENSION)
function setPreparePayACoffee() {
	if(finalEmail.length > 0 || finalBitcoin.length > 0) {
		$("#divPageTitle").text(finalURL + ' is using Pay A Coffee!');
  		$("#divPageDonation").text('Help the website making a donation. Author will be really grateful.');
  		$("#divPayACoffee").html('<a href="http://payacoffee.com/why" target="_blank">Why send a donation?</a>');
  		if(finalEmail.length > 0) {
  			setPreparePayACoffeePayPal();
  		}
  		if(finalBitcoin.length > 0) {
  			setPreparePayACoffeeBitcoin();
  		}
	} else {
		$("#divPageTitle").text(finalURL + ' is NOT using Pay A Coffee :(');
  		$("#divPageDonation").text('Author will be really grateful if you explain him how Pay A Coffee works!');
  		$("#divDonationEmail").html("");
  		$("#divDonationBitcoin").html("");
  		$("#divPayACoffee").html('<a href="http://payacoffee.com/#features" target="_blank" class="button">Why use PayACoffee.com?</a>');
	}
}

// SET BUTTON FOR PAYPAL
function setPreparePayACoffeePayPal() {
	PayACoffeeURL = "http://payacoffee.com/donation?" + "type=paypal" + "&email=" + finalEmail + "&currency=" + finalCurrency + "&amount=" + finalAmount + "&title=" + finalTitle;
  	$("#divDonationEmail").html('<a href=' + PayACoffeeURL + ' target="_blank" class="button">Donate ' + finalCurrencySymbol + " " + finalAmount + ' using PayPal</a>');
}

// SET BUTTON FOR BITCOIN
function setPreparePayACoffeeBitcoin() {
	PayACoffeeURL = "http://payacoffee.com/donation?" + "type=bitcoin" + "&bitcoin=" + finalBitcoin + "&amount=" + finalAmount + "&title=" + finalTitle;
  	$("#divDonationBitcoin").html('<a href=' + PayACoffeeURL + ' target="_blank" class="button">Donate ' + finalBitcoinSymbol + " " + finalAmount/425 + ' using Bitcoin</a>');
}
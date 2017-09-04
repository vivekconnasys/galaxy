/* Define Currency variable */
var Curr = {};

/* Define Metals variable*/
var Metals = {};

/* Define roman numerals */
var romanNumerals = [ 'i', 'v', 'x', 'l', 'c', 'd', 'm' ];

/* Define roman numerals with values */
var romanWithVal = {i : 1,v : 5,x : 10,l : 50,c : 100,d : 500,m : 1000};

/* Regular Expressions for validation */
var checkHowManyCredits = new RegExp(/^how\s+many\s+credits\s+is\s+([a-z\s]+)[?]$/i);
var checkIsCredit = new RegExp(/^([a-z\s]+)is\s+(\d+.?\d*)\s+credits$/i);
var checkIsAssignment = new RegExp(/^[a-z]+\s+is\s+[i|v|x|l|c|d|m]$/i);
var checkHowMuchIs = new RegExp(/^how\s+much\s+is\s+([a-z\s]+)[?]$/i);


/*Calculate value of given currency starts*/
function convertCurrency(currArr) {
	
	var RomanStr = "";
	var Result = 0;
	for (var k = 0; k < currArr.length; k++) {
		if (Curr[currArr[k].toLowerCase()]) {
			RomanStr += Curr[currArr[k].toLowerCase()];
		} else if (Metals[currArr[k].toLowerCase()]) {
			console.log(currArr[k] + " is not a currency, it is a metal");
			return -1;
		} else {
			console.log(currArr[k] + " is unknown. Not defined in input.");
			return -1;
		}
	}
	
	var RomanNumbers = [];
	RomanStr.split("").forEach(function(e, i, arr) {
		RomanNumbers.push(romanWithVal[e]);
		if (romanWithVal[e] < romanWithVal[arr[i + 1]]) {
			RomanNumbers[i] *= -1;
		}
	});
	Result = RomanNumbers.reduce(function(sum, elt) {
		return sum + elt;
	});
	
	return Result;
}
/*Calculate value of given currency ends*/

/*Pass input line and processing it by regular expressions starts*/
exports.Buyer = function(line) {
	var inputLine = null;
	
	inputLine = checkIsAssignment.exec(line);
	if (inputLine !== null) {
		var lineStr = inputLine[0].split(/\s+/);
		if (!Curr[lineStr[0].toLowerCase()]) {
			var index = romanNumerals.indexOf(lineStr[2].toLowerCase());
			if (index > -1) {
				Curr[lineStr[0].toLowerCase()] = lineStr[2].toLowerCase();
				romanNumerals.splice(index, 1);
			} else {
				console.log(lineStr[2] + " is already assigned");
			}
		} else if (Curr[lineStr[0].toLowerCase()] !== romanWithVal[lineStr[2].toLowerCase()]) {
			console.log(lineStr[0] + " already has a conversion unit");
		}
		return;
	}
	
	inputLine = checkIsCredit.exec(line);
	if (inputLine !== null) {
		var creditValue = parseFloat(inputLine[2]);
		var lineStr = inputLine[1].trim();
		if (lineStr === "") {
			return console.log("No currency defined");
		}
		lineStr = lineStr.split(/\s+/);
		var metal = lineStr.pop();
		//console.log("metal: "+metal);
		if (Curr[metal.toLowerCase()]) {
			return console.log(metal + " is a currency, provide a Metal");
		}
		if (lineStr.length < 1) {
			return console.log("Please provide a currency");
		}
		var value = convertCurrency(lineStr);
		
		if (value !== -1) {
			value = creditValue / value;
			Metals[metal.toLowerCase()] = value;
		}
		return;
	}
	
	inputLine = checkHowMuchIs.exec(line);
	if (inputLine !== null) {
		var lineStr = inputLine[1].trim();
		
		if (lineStr === "") {
			return console.log("No currency defined");
		}
		lineStr = lineStr.split(/\s+/);
		var value = convertCurrency(lineStr);
		if (value !== -1) {
			return console.log(lineStr.join(" ") + " is " + value);
		} else {
			return;
		}
	}
	
	inputLine = checkHowManyCredits.exec(line);
	if (inputLine !== null) {
		var lineStr = inputLine[1].trim();
		
		if (lineStr === "") {
			return console.log("Please enter any currency");
		}
		lineStr = lineStr.split(/\s+/);
		var metal = lineStr.pop();
		
		if (!Metals[metal.toLowerCase()]) {
			return console.log(metal + " is not a Metal ");
		}
		if (lineStr.length < 1) {
			return console.log("No Currency provided");
		}
		var value = convertCurrency(lineStr);
		if (value !== -1) {
			value *= Metals[metal.toLowerCase()];
			return console.log(inputLine[1].trim() + " is " + value + " Credits");
		}
	}else{
		return console.log("I have no idea what you are talking about");
	}
};
/*Pass input line and processing it by regular expressions ends*/
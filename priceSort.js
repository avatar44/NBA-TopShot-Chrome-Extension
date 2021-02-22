// Only try to execute if the page is loaded
if (window.location.href.indexOf("/p2p/") > -1) {
    if (document.readyState !== "complete") {
        window.addEventListener("load",  setup);
    } else {
        setup();
    }
}

// Adds the price sorting radio button and calls the relevant sort function
function setup() {
    if (document.getElementById("toggle-button-extension") != null) {
        return;
    }

    // Check storage for toggle status default value
    var toggleValue = true;
    chrome.storage.sync.get("topshot-toggle-status", (obj) => {
        if (Object.keys(obj).length === 0 && obj.constructor === Object) {
            chrome.storage.sync.set({ "topshot-toggle-status": true });
        } else {
            toggleValue = obj["topshot-toggle-status"];
        }

        // Add toggle button onload
        var dropdown = document.getElementById('moment-detailed-serialNumber');
        var parentSpan = dropdown.parentElement.parentElement;

        var toggleSwitch = document.createElement("input");
        toggleSwitch.type = "radio";
        toggleSwitch.id = "toggle-button-extension";
        toggleSwitch.checked = toggleValue;

        var toggleLabel = document.createElement("label");
        toggleLabel.for = "toggle-button-extension";
        toggleLabel.innerText = "Sort by Price";
        toggleLabel.style.paddingLeft = "5px";

        var div = document.createElement("div");
        div.appendChild(toggleSwitch);
        div.appendChild(toggleLabel);
        div.onclick = toggleStatus;

        parentSpan.appendChild(div);
        parentSpan.parentElement.style.paddingBottom = "20px";

        // Sort listings by price or serial depending on stored default value
        toggleValue ? sortListings("price") : sortListings("serial");
    });
}

// Simply toggles which property we are sorting by
function toggleStatus() {
    var toggleSwitch = document.getElementById("toggle-button-extension");
    toggleSwitch.checked = !toggleSwitch.checked;
    chrome.storage.sync.set({ "topshot-toggle-status": toggleSwitch.checked });
    if (toggleSwitch.checked == true) {
        sortListings("price");
    }
    else {
        sortListings("serial");
    }
}

// Sort listings by property
function sortListings(sortBy) {
    // Grab the dropdown and listings
    var dropdown = document.getElementById('moment-detailed-serialNumber');
    dropdown.removeChild(dropdown.childNodes[0]);
    var optionsList = dropdown.options;
    
    const maxInt = Number.MAX_SAFE_INTEGER;
    
    var newList = [];
    let oneDigitSum = 0;
    let oneDigitCount = 0;
    let oneDigitMin = maxInt;
    let oneDigitSerial = maxInt;
    
    let twoDigitSum = 0;
    let twoDigitCount = 0;
    let twoDigitMin = maxInt;
    let twoDigitSerial = maxInt;
    
    let threeDigitSum = 0;
    let threeDigitCount = 0;
    let threeDigitMin = maxInt;
    let threeDigitSerial = maxInt;
    
    let fourOneDigitSumOne = 0;
    let fourOneDigitCountOne = 0;
    let fourOneDigitMinOne = maxInt;
    let fourOneDigitSerialOne = maxInt;
    
    let fourTwoDigitSumOne = 0;
    let fourTwoDigitCountOne = 0;
    let fourTwoDigitMinOne = maxInt;
    let fourTwoDigitSerialOne = maxInt;
    
    let fourThreeDigitSumOne = 0;
    let fourThreeDigitCountOne = 0;
    let fourThreeDigitMinOne = maxInt;
    let fourThreeDigitSerialOne = maxInt;
    
    let fourFourDigitSumOne = 0;
    let fourFourDigitCountOne = 0;
    let fourFourDigitMinOne = maxInt;
    let fourFourDigitSerialOne = maxInt;
    
    let fourDigitSumTwo = 0;
    let fourDigitCountTwo = 0;
    let fourDigitMinTwo = maxInt;
    let fourDigitSerialTwo = maxInt;
    
    let fiveDigitSumOne = 0;
    let fiveDigitCountOne = 0;
    let fiveDigitMinOne = maxInt;
    let fiveDigitSerialOne = maxInt;
    
    let fiveDigitSumTwo = 0;
    let fiveDigitCountTwo = 0;
    let fiveDigitMinTwo = maxInt;
    let fiveDigitSerialTwo = maxInt;

    for (var i = 0; i < optionsList.length; i++) {
        optionsList[i].price = optionsList[i].innerText.split('$')[1];
        newList.push(optionsList[i]);
        // single digit serials
        let currentSerial = optionsList[i].value;
        let currentPrice = optionsList[i].price.split(' ')[0].replace(/,/g, '');

        if (currentSerial < 10) {
            optionsList[i].style.backgroundColor = "#0F5298";
            oneDigitSum += parseFloat(currentPrice);
            oneDigitCount += 1;
            oneDigitMin = Math.min(oneDigitMin, currentPrice);
            oneDigitSerial = matchSerial(oneDigitMin, currentPrice, oneDigitSerial, currentSerial);
        }
        
        // double digit serials
        else if (currentSerial < 100) {
            optionsList[i].style.backgroundColor = "#3C99DC";
            twoDigitSum += parseFloat(currentPrice);
            twoDigitCount += 1;
            twoDigitMin = Math.min(twoDigitMin, currentPrice);
            twoDigitSerial = matchSerial(twoDigitMin, currentPrice, twoDigitSerial, currentSerial);
        }
        // triple digit serials
        else if (currentSerial < 1000) {
            optionsList[i].style.backgroundColor = "#66D3FA";
            threeDigitSum += parseFloat(currentPrice);
            threeDigitCount += 1;
            threeDigitMin = Math.min(threeDigitMin, currentPrice);
            threeDigitSerial = matchSerial(threeDigitMin, currentPrice, threeDigitSerial, currentSerial);
        }
        // four digit serials - 1000 to 1999
        else if (currentSerial < 2000) {
            optionsList[i].style.backgroundColor = "#66D3FA"; // change color
            fourOneDigitSumOne += parseFloat(currentPrice);
            fourOneDigitCountOne += 1;
            fourOneDigitMinOne = Math.min(fourOneDigitMinOne, currentPrice);
            fourOneDigitSerialOne = matchSerial(fourOneDigitMinOne, currentPrice, fourOneDigitSerialOne, currentSerial);
        }
        // four digit serials - 2000 to 2999
        else if (currentSerial < 3000) {
            optionsList[i].style.backgroundColor = "#66D3FA"; // change color
            fourTwoDigitSumOne += parseFloat(currentPrice);
            fourTwoDigitCountOne += 1;
            fourTwoDigitMinOne = Math.min(fourTwoDigitMinOne, currentPrice);
            fourTwoDigitSerialOne = matchSerial(fourTwoDigitMinOne, currentPrice, fourTwoDigitSerialOne, currentSerial);
        }
        
        // four digit serials - 3000 to 3999
        else if (currentSerial < 4000) {
            optionsList[i].style.backgroundColor = "#66D3FA"; // change color
            fourThreeDigitSumOne += parseFloat(currentPrice);
            fourThreeDigitCountOne += 1;
            fourThreeDigitMinOne = Math.min(fourThreeDigitMinOne, currentPrice);
            fourThreeDigitSerialOne = matchSerial(fourThreeDigitMinOne, currentPrice, fourThreeDigitSerialOne, currentSerial);
        }
        
        // four digit serials - 4000 to 4999
        else if (currentSerial < 5000) {
            optionsList[i].style.backgroundColor = "#66D3FA"; // change color
            fourFourDigitSumOne += parseFloat(currentPrice);
            fourFourDigitCountOne += 1;
            fourFourDigitMinOne = Math.min(fourFourDigitMinOne, currentPrice);
            fourFourDigitSerialOne = matchSerial(fourFourDigitMinOne, currentPrice, fourFourDigitSerialOne, currentSerial);
        }
        // four digit serials - 5000 to 9999
        else if (currentSerial < 10000) {
            optionsList[i].style.backgroundColor = "#66D3FA"; // change color
            fourDigitSumTwo += parseFloat(currentPrice);
            fourDigitCountTwo += 1;
            fourDigitMinTwo = Math.min(fourDigitMinTwo, currentPrice);
            fourDigitSerialTwo = matchSerial(fourDigitMinTwo, currentPrice, fourDigitSerialTwo, currentSerial);
        }
        // five digit serials - 10000 to 12499
        else if (currentSerial < 12500) {
            optionsList[i].style.backgroundColor = "#66D3FA"; // change color
            fiveDigitSumOne += parseFloat(currentPrice);
            fiveDigitCountOne += 1;
            fiveDigitMinOne = Math.min(fiveDigitMinOne, currentPrice);
            fiveDigitSerialOne = matchSerial(fiveDigitMinOne, currentPrice, fiveDigitSerialOne, currentSerial);
        }
        // five digit serials - 12500 to 15000
        else if (currentSerial < 15000) {
            optionsList[i].style.backgroundColor = "#66D3FA"; // change color
            fiveDigitSumTwo += parseFloat(currentPrice);
            fiveDigitCountTwo += 1;
            fiveDigitMinTwo = Math.min(fiveDigitMinTwo, currentPrice);
            fiveDigitSerialTwo = matchSerial(fiveDigitMinTwo, currentPrice, fiveDigitSerialTwo, currentSerial);
        }
        // the rest
        else {
            optionsList[i].style.backgroundColor = "#D5F3FE";
        }
    }

    // sort by price
    if (sortBy == "price") {
        newList = newList.sort((a, b) => {
            if (parseInt(a.price.replace(/,/g, '')) === parseInt(b.price.replace(/,/g, ''))) {
                return 0;
            }
            else {
                return (parseInt(a.price.replace(/,/g, '')) < parseInt(b.price.replace(/,/g, ''))) ? -1 : 1;
            }
        });
    }
    // sort by serial
    else if (sortBy == "serial") {
        newList = newList.sort((a, b) => {
            if (parseInt(a.value) === parseInt(b.value)) {
                return 0;
            }
            else {
                return (parseInt(a.value) < parseInt(b.value)) ? -1 : 1;
            }
        });
    }

    // replace listing with their sorted correspondants 
    for (var i = 0; i <= optionsList.length; i++) {
        optionsList[i] = newList[i];
    }

    // ****** CONSOLE LOG PARTY ******
    console.log('=================================');
    console.log(`0-9 average price: $${average(oneDigitSum, oneDigitCount)}`);
    console.log(`   #${oneDigitSerial} - $${oneDigitMin}`);
    console.log(`10-99 average price: $${average(twoDigitSum, twoDigitCount)}`);
    console.log(`   #${twoDigitSerial} - $${twoDigitMin}`);
    console.log(`100-999 average price: $${average(threeDigitSum, threeDigitCount)}`);
    console.log(`   #${threeDigitSerial} - $${threeDigitMin}`);
    console.log(`1000-1999 average price: $${average(fourOneDigitSumOne, fourOneDigitCountOne)}`);
    console.log(`   #${fourOneDigitSerialOne} - $${fourOneDigitMinOne}`);
    console.log(`2000-2999 average price: $${average(fourTwoDigitSumOne, fourTwoDigitCountOne)}`);
    console.log(`   #${fourTwoDigitSerialOne} - $${fourTwoDigitMinOne}`);
    console.log(`3000-3999 average price: $${average(fourThreeDigitSumOne, fourThreeDigitCountOne)}`);
    console.log(`   #${fourThreeDigitSerialOne} - $${fourThreeDigitMinOne}`);
    console.log(`4000-4999 average price: $${average(fourFourDigitSumOne, fourFourDigitCountOne)}`);
    console.log(`   #${fourFourDigitSerialOne} - $${fourFourDigitMinOne}`);
    console.log(`5000-9999 average price: $${average(fourDigitSumTwo, fourDigitCountTwo)}`);
    console.log(`   #${fourDigitSerialTwo} - $${fourDigitMinTwo}`);
    console.log(`10000-12499 average price: $${average(fiveDigitSumOne, fiveDigitCountOne)}`);
    console.log(`   #${fiveDigitSerialOne} - $${fiveDigitMinOne}`);
    console.log(`12500-15000 average price: $${average(fiveDigitSumTwo, fiveDigitCountTwo)}`);
    console.log(`   #${fiveDigitSerialTwo} - $${fiveDigitMinTwo}`);
    console.log('================================= \n');
    // ****** CONSOLE LOG PARTY ******

    optionsList[0].selected = true;
}

// UTILITIES
const average = function(sum, count) {
    let average = +sum / +count;

    return isNaN(average) ? "no sales in this range" : average.toFixed(0);
}

const matchSerial = function (minPrice, currPrice, minSerial, currSerial) {
    return minPrice == currPrice ? currSerial : minSerial;
}

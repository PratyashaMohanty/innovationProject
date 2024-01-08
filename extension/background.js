chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "openExtension") {
        chrome.windows.create({
            url: "popup.html",
            type: "popup",
            width: 365, // Set the width as per your requirement
            height: 595, // Set the height as per your requirement
            
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.from === 'popup.html') {
      const data = request.data;
      // Update the index page elements with the received address and balance
      document.getElementById('userAddress1').innerText = `${data.address.slice(0, 15)}...`;
      document.getElementById('accountBalance1').innerText = `${data.balance} MATIC`;
      
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "openbuy1") {
        // Send message to popup with amount and address
        chrome.windows.create({
            url: "popup.html",
            type: "popup",
            width: 365,
            height: 595
        })
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "openbuy2") {
        chrome.windows.create({
            url: "popup.html",
            type: "popup",
            width: 365, // Set the width as per your requirement
            height: 595, // Set the height as per your requirement
            
        });
    }
});

let receivedData = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Message received");
  if (request.data) {
    receivedData = request.data; // Store the received data
    sendResponse({ received: true });
  }
});

// Listen for requests for the data from the extension popup or options page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getData") {
    const data = getReceivedData();
    sendResponse({ data }); // Send the data in response
  }
});

// Function to get the stored data
function getReceivedData() {
  return receivedData;
}



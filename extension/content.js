
document.getElementById('openExtensionButton').addEventListener('click', function () {
    // Send a message to the background script
   // chrome.runtime.sendMessage({ command: 'openExtension' });
   chrome.runtime.sendMessage({ action: "openExtension" });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.from === 'popup' && request.data) {
        const data = request.data;
        console.log(data);
        // Update index page elements with the received address and balance
        document.getElementById('userAddress1').innerText = `${data.address.slice(0, 15)}...`;
        document.getElementById('accountBalance1').innerText = `${data.balance} ETH`;
    }
});

document.getElementById('buy1').addEventListener('click', function () {
    // Send a message to the background script
   // chrome.runtime.sendMessage({ command: 'openExtension' });
   chrome.runtime.sendMessage({ action: "openbuy1" });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.from === 'index') {
        const { amount, address } = request.data;
        // Use amount and address received from the background script here for interactions with the custom wallet
        console.log(`Received amount: ${amount}`);
        console.log(`Received address: ${address}`);
        // Perform actions with the received data for the custom wallet interaction
    }
});


// Capture the data you want to send from the webpage
const dataToSend = 0.0001; // Replace this with the actual data or logic to capture data

// Send the data to the background script of the extension
chrome.runtime.sendMessage({ data: dataToSend }, function(response) {
  console.log("Message Sent");
});
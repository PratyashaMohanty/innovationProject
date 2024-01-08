

const connectButton = document.getElementById('openExtensionButton');
const logoutButton = document.getElementById('logoutButton');
const connectCard = document.getElementById('connectCard');
const accountInfoCard = document.getElementById('accountInfoCard');

connectButton.addEventListener('click', () => {
    // Simulating a successful connection
    connectCard.style.display = 'none';
    accountInfoCard.style.display = 'block';
    // Call your function to retrieve and display account information here
});

logoutButton.addEventListener('click', () => {
    // Simulate logout by resetting the UI
    connectCard.style.display = 'block';
    accountInfoCard.style.display = 'none';
    // Additional logic for clearing account information or any other cleanup
});


document.getElementById('buy1').addEventListener('click', function() {
    const itemPrice = 0.0001; // Get the actual price dynamically if needed
    sendMessageToExtension(itemPrice);
});

document.getElementById('buy2').addEventListener('click', function() {
    const itemPrice = 0.0002; // Get the actual price dynamically if needed
    sendMessageToExtension(itemPrice);
});

function sendMessageToExtension(amount) {
    chrome.runtime.sendMessage({ amount }, function(response) {
        console.log('Message sent to extension:', response);
    });
}




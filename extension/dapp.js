// // document.addEventListener("DOMContentLoaded", function () {
// //     // Check if Web3 is injected
// //     if (typeof window.ethereum !== 'undefined') {
// //         const web3 = new Web3(window.ethereum);
  
// //         // Check if MetaMask clone extension is connected
// //         if (window.ethereum.isMetaMask) {
// //             console.log("MetaMask clone extension is installed!");
  
// //             document.getElementById("connectWallet").addEventListener("click", async function () {
// //                 try {
// //                     // Request connection to MetaMask clone extension
// //                     await connectWallet();
                    
// //                     // Now you can use web3 to interact with the blockchain
// //                     const accounts = await web3.eth.getAccounts();
// //                     console.log("Connected account:", accounts[0]);
  
// //                     // Your DApp logic goes here
// //                 } catch (error) {
// //                     console.error("Error connecting wallet:", error);
// //                 }
// //             });
// //         } else {
// //             console.error("MetaMask clone extension is not installed!");
// //         }
// //     } else {
// //         console.error("Web3 is not found. Please install MetaMask clone extension.");
// //     }
// //   });
  
//   async function connectWallet() {
//     try {
//         // Specify your JSON-RPC provider URL
//         const jsonRpcProviderUrl = "https://rpc.ankr.com/eth_sepolia/7f6139fa31312202a92493a160ee4234bf1c960dabe674f692074c540c6f860b";
        
//         // Request accounts using the specified JSON-RPC provider URL
//         const accounts = await window.ethereum.request({
//             method: "eth_requestAccounts",
//             params: [
//                 {
//                     eth_accounts: {},
//                     jsonrpc: "2.0",
//                     id: 1,
//                     method: "eth_requestAccounts",
//                     params: [],
//                     origin: window.location.origin,
//                 },
//             ],
//             target: jsonRpcProviderUrl,
//         });
  
//         console.log("Connected to wallet. Accounts:", accounts);
//     } catch (error) {
//         console.error("Error connecting wallet:", error);
//         throw error; // Re-throw the error to handle it in the calling function
//     }
//   }
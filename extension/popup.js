// import "./ethers.js";
// console.log(ethers)




document.addEventListener("DOMContentLoaded", function () {
    //IN THAT WE GOING TO TARGET THE ELEMENT

    document.getElementById("accountList").addEventListener("click", changeAccount);

    document.getElementById("userAddress").addEventListener("click", copyAddress);

    document.getElementById("transferFund").addEventListener("click", handler);

    document.getElementById("header_network").addEventListener("click", getOpenNetwork);

    document.getElementById("network_item").addEventListener("click", getSelectedNetwork);

    document.getElementById("add_network").addEventListener("click", setNetwork);

    document.getElementById("loginAccount").addEventListener("click", loginUser);

    document.getElementById("accountCreate").addEventListener("click", createUser);

    document.getElementById("openCreate").addEventListener("click", openCreate);

    document.getElementById("sign_up").addEventListener("click", signUp);

    document.getElementById("loginAccount").addEventListener("click", loginUser);

    document.getElementById("login_up").addEventListener("click", login);

    document.getElementById("logout").addEventListener("click", logout);

    document.getElementById("open_Transfer").addEventListener("click", openTransfer);

    document.querySelector(".goBack").addEventListener("click", goBack);

    document.getElementById("open_Import").addEventListener("click", openImport);

    document.getElementById("open_assets").addEventListener("click", openAssets);

    document.getElementById("open_activity").addEventListener("click", openActivity);

    document.getElementById("goHomePage").addEventListener("click", goHomePage);

    document.getElementById("openAccountImport").addEventListener("click", openImportModel);

    document.getElementById("close_import_account").addEventListener("click", closeImportModel);

    document.getElementById("add_new_token").addEventListener("click", addToken);

    document.getElementById("add_New_Account").addEventListener("click", addAccount);

    // chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //     if (request.amount) {
    //         document.getElementById('amount').value = request.amount.toFixed(4); // Populate the amount field
    //     }
    // });



});

//state variable
let providerURL = "https://rpc.ankr.com/eth_sepolia/7f6139fa31312202a92493a160ee4234bf1c960dabe674f692074c540c6f860b";
let privatekey;
let address;

//FUNCTION

function handler() {
    document.getElementById("transfer_center").style.display = "flex";

    const amount = document.getElementById("amount").value;
    const address = document.getElementById("address").value;
    const privatekey = "0xea32f43828740b990e0e1559ad1a087f9614bfdbc45731fb0eca64e38f304ef1";

   
    //meta mask -- parth's private key
    // const private_key = "e12b337741d3c7171901a44651066480cdfe7bcd8ea475da26f4c438bd02286e";

    //dummy new test account  address -- not meta mask account --needs to be changed 
    // const testAccount = "0x8522697130fFD33b255f12858F35d130b031b1e3";

    //provider
    console.log(ethers);
    const provider = new ethers.JsonRpcProvider(providerURL);

    let wallet = new ethers.Wallet(privatekey, provider);

    const tx =
    {
        to: address,
        value: ethers.parseEther(amount)
    }

    let a = document.getElementById("link");
    a.href = "somelink url";

    wallet.sendTransaction(tx).then((txObj) => {
        console.log("txHash:", txObj.hash);

        document.getElementById("transfer_center").style.display = "none";
        const a = document.getElementById("link");
        // new
        a.href = `https://mumbai.polygonscan.com/tx/${txObj.hash}`;
        document.getElementById("link").style.display = "block";
    });
}


        

      
// Function to retrieve data from background script
        function getDataFromBackground() {
            return new Promise((resolve, reject) => {
              chrome.runtime.sendMessage({ action: "getData" }, function(response) {
                if (response && response.data) {
                  resolve(response.data);
                } else {
                  reject("No data available");
                }
              });
            });
          }
          
          // Display received data in the popup
          function displayData() {
            const dataDisplay = document.getElementById("amount");
            console.log(dataDisplay);
            getDataFromBackground()
              .then(data => {
                dataDisplay.value = JSON.stringify(data); // Display data as JSON string
                console.log(JSON.stringify(data));
              })
              .catch(error => {
                dataDisplay.textContent = "Error: " + error;
              });
          }
          
          // Call function to display data when popup is opened
          document.addEventListener("DOMContentLoaded", function() {
            displayData();
            console.log("function called");
          });



function checkBalance(address) {
    const provider = new ethers.JsonRpcProvider(providerURL);
    provider.getBalance(address).then((balance) => {
        const balanceInEth = ethers.formatEther(balance);
        //const balanceInEth = balance;
        console.log(balanceInEth);

       
        chrome.tabs.query({windowType: "normal", active: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', data: { address: address, balance: balanceInEth } });
        });

  
        document.getElementById("accountBalance").innerHTML =` ${balanceInEth} ETH`;
        document.getElementById("userAddress").innerHTML = `${address.slice(0, 15
        )}...`;
  
    
    });


}

function getOpenNetwork() {
    document.getElementById("network").style.display = "block";
};

function getSelectedNetwork(e) {
    const element = document.getElementById("selected_network");
    element.innerHTML = e.target.innerHTML;

    if (e.target.innerHTML === "Ethereum Mainnet") {
        providerURL = "https://rpc.ankr.com/eth/7f6139fa31312202a92493a160ee4234bf1c960dabe674f692074c540c6f860b";
        document.getElementById("network").style.display = "none";
    }
    else if (e.target.innerHTML === "Polygon Mainnet") {
        providerURL = "https://rpc.ankr.com/polygon/7f6139fa31312202a92493a160ee4234bf1c960dabe674f692074c540c6f860b";
        document.getElementById("network").style.display = "none";

    }
    else if (e.target.innerHTML === "Polygon Mumbai") {
        providerURL = "https://polygon-mainnet.g.alchemy.com/v2/_Leh7gDuovc1EcJ-NUw5FqVNutUTVzcr";
        document.getElementById("network").style.display = "none";

    }
    else if (e.target.innerHTML === "Goerli test network") {
        providerURL = "https://rpc.ankr.com/eth_goerli/7f6139fa31312202a92493a160ee4234bf1c960dabe674f692074c540c6f860b";
        document.getElementById("network").style.display = "none";

    }
    else if (e.target.innerHTML === "sepolia test network") {
        providerURL = "https://rpc.ankr.com/eth_sepolia/7f6139fa31312202a92493a160ee4234bf1c960dabe674f692074c540c6f860b";
        document.getElementById("network").style.display = "none";

    }

    console.log(providerURL);
};

function setNetwork() {
    document.getElementById("network").style.display = "none";
};

function loginUser() {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("LoginUser").style.display = "block";
};

function createUser() {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("LoginUser").style.display = "block";
};

function openCreate() {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("create_popUp").style.display = "block";
};

function signUp() {
    console.log("sign up called");
    const name = document.getElementById("sign_up_name").value;
    const email = document.getElementById("sign_up_email").value;
    const password = document.getElementById("sign_up_password").value;
    const passwordConfirm = document.getElementById("sign_up_passwordConfirm").value;

    document.getElementById("field").style.display = "none";
    document.getElementById("center").style.display = "block";

    const wallet = ethers.Wallet.createRandom();

    if (wallet.address) {
        console.log(wallet);
        console.log(wallet.signingKey.privateKey);

        const url = "http://localhost:3000/api/v1/user/signup";

        const data =
        {
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            address: wallet.address,
            privateKey: wallet.signingKey.privateKey,
            mnemonic: wallet.mnemonic.phrase,
        };
        console.log(data);

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then((result) => {
            console.log(result);
            document.getElementById("createdAddress").innerHTML = wallet.address;
            document.getElementById("createdPrivateKey").innerHTML = wallet.signingKey.privateKey;
            document.getElementById("createdMnemonic").innerHTML = wallet.mnemonic.phrase;
            document.getElementById("center").style.display = "none";
            document.getElementById("accountData").style.display = "block";
            document.getElementById("sign_up").style.display = "none";
        }).catch((err) => {
            console.log(err)
        });
    }
}

function changeAccount() {
    const data = document.querySelector(".accountValue");
    const address = data.getAttribute("data-address");
    const privateKey = data.getAttribute("data-privateKey");

    console.log(privateKey, address);

    const userWallet = {
        address: address,
        private_key: privateKey,
        mnemonic: "Changed",
    };

    const jsonObj = JSON.stringify(userWallet);
    localStorage.setItem("userWallet", jsonObj);

    window.location.reload();
};

function copyAddress() {
    navigator.clipboard.writeText(address);
};

function login() {
    document.getElementById("login_form").style.display = "none";
    document.getElementById("center").style.display = "block";
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    // console.log(email, password);
    //API CALL
    const url = "http://localhost:3000/api/v1/user/login";
    const data = {
        email: email,
        password: password,
    };
    console.log(data);

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((result) => {
        // console.log(result)
        result.json().then((data) => {
            console.log(data.data.user);
            const userWallet = {
                address: data.data.user.address,
                privateKey: data.data.privateKey,
                mnemonic: data.data.user.mnemonic,
            };

            const jsonObj = JSON.stringify(userWallet);
            localStorage.setItem("userWallet", jsonObj);
            window.location.reload();
        });
        

    })
        .catch((error) => {
            console.log(error);
        });

};

function logout() {
    localStorage.removeItem("userWallet");
    window.location.reload();
};

function openTransfer() {
    document.getElementById("transfer_form").style.display = "block";
    document.getElementById("home").style.display = "none";

};

function goBack() {
    document.getElementById("transfer_form").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function openImport() {
    document.getElementById("import_token").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function openAssets() {
    document.getElementById("activity").style.display = "none";
    document.getElementById("assets").style.display = "block";
};

function openActivity() {
    document.getElementById("activity").style.display = "block";
    document.getElementById("assets").style.display = "none";
};

function goHomePage() {
    document.getElementById("create_popUp").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function openImportModel() {
    document.getElementById("import_account").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function closeImportModel() {
    document.getElementById("import_account").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function addToken() {
    const address = document.getElementById("token_address").value;
    const name = document.getElementById("token_name").value;
    const symbol = document.getElementById("token_symbol").value;

    //API CALL
    const url = "http://localhost:3000/api/v1/tokens/createtoken";
    const data = {
        name: name,
        address: address,
        symbol: symbol,
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((response) => response.json()).then((result) => {
        console.log(result);
        window.location.reload()
    }).catch((error) => {
        console.log("ERROR", error);
    });
};

function addAccount() {
    const privateKey = document.getElementById("add_account_private_key").value;
    const provider = new ethers.JsonRpcProvider(providerURL);
    let wallet = new ethers.Wallet(privateKey, provider);
    console.log(wallet);

    const url = "http://localhost:3000/api/v1/account/createaccount";

    const data = {
        privatekey: privateKey,
        address: wallet.address,

    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
};

function importGoBack() {
    document.getElementById("import_token").style.display = "none";
    document.getElementById("home").style.display = "block";
}


function myFunction() {
    console.log(ethers);
    const str = localStorage.getItem("userWallet");
    const parsedObj = JSON.parse(str);

    if (parsedObj?.address) {
        document.getElementById("LoginUser").style.display = "none";
        document.getElementById("home").style.display = "block";
        privatekey = parsedObj.private_key;
        address = parsedObj.address;
        checkBalance(parsedObj.address);
    }

    const tokenRender = document.querySelector(".assets");
    const accountRender = document.querySelector(".accountList");
    const url = "http://localhost:3000/api/v1/tokens/alltoken";

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let elements = "";
            data?.data?.tokens?.map((token) =>
            (elements += `
          <div class="assets_item">
            <img class="assets_item_img" src="wallet.png" alt="" />
            <span> ${token.address.slice(0, 15)}... </span>
            <span>${token.symbol}</span>
          </div>
        `)
            );
            tokenRender.innerHTML = elements;
           
        })
        .catch((error) => {
            console.log(error);
        });

    fetch("http://localhost:3000/api/v1/account/allaccount")
        .then((response) => response.json())
        .then((data) => {
            let accounts = "";
            data.data.accounts.map(
                (account, i) =>
                (accounts += `
            <div class="lists">
              <p> ${i + 1}</p>
              <p class="accountValue" data-address=${account.address} data-privateKey=${account.privateKey}> ${account.address.slice(0, 25)}...</p>
            </div>
                
          `)
          
            );
            accountRender.innerHTML = accounts;

        })
        .catch((error) => {
            console.log(error);
        });

    console.log(privatekey);
         
}


window.onload = myFunction;



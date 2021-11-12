
// contract address :
const contractAddress = '0x6F195383DF19635296E6A3dd8ba665C458846f73'

// add contract ABI from Remix:
//const { abi } = require('./build/contracts/DonationManager.json');
// const contractABI = build/contracts/DonationManager.json
// var contractABI = new web3.eth.Contract(contractABI, contractAddress)

const contractABI = [  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_donorName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "currentBalance",
        "type": "uint256"
      }
    ],
    "name": "createDonor",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "allDonors",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "donorID",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "donorAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amountDonated",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "donorName",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "distributorCount",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "donorCount",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "donationCount",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_donationName",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "_donorID",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "_USDperRecipientPerMonth",
        "type": "uint32"
      },
      {
        "internalType": "uint8",
        "name": "_adminFeePercent",
        "type": "uint8"
      },
    ],
    "name": "createDonation",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_depositAmount",
        "type": "uint256"
      }
    ],
    "name": "donorDeposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "_donationID",
        "type": "uint32"
      }
    ],
    "name": "makeDonation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_distributorID",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "_distributorStatus",
        "type": "uint32"
      }
    ],
    "name": "changeDistributorStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_donationID",
        "type": "uint32"
      }
    ],
    "name": "getDonationBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "donatedAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "grantedAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "requestedNotGranted",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getDistributorBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "availbleToWithdraw",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_distributorID",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "_donationID",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "_recipientCount",
        "type": "uint32"
      },
      {
        "internalType": "uint8",
        "name": "_distributionMonths",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "_recipientDetailsAreValid",
        "type": "bool"
      }
    ],
    "name": "createDistribution",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_distributionID",
        "type": "uint32"
      }
    ],
    "name": "requestDonationFunds",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "donations",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "donationID",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "donorID",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "donationName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "donationAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "donationGrantedAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "requestedNotGrantedAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "USDperRecipientPerMonth",
        "type": "uint32"
      },
      {
        "internalType": "uint8",
        "name": "adminFeePercent",
        "type": "uint8"
      },
      {
        "internalType": "enum DonationManager.DonationState",
        "name": "donationState",
        "type": "uint8"
      },
      {
        "internalType": "enum DonationManager.DonationPurpose",
        "name": "donationPurpose",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "distributionCount",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_distributorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_distributorCountry",
        "type": "string"
      }
    ],
    "name": "createDistributor",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "allDistributors",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "distributorID",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "distributorAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "distributorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "distributorCountry",
        "type": "string"
      },
      {
        "internalType": "enum DonationManager.DistributorStatus",
        "name": "distributorStatus",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_donorID",
        "type": "uint32"
      }
    ],
    "name": "getAllDonorBalances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "donatedAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "grantedAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "requestedNotGranted",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "fundsAvailableToWithdraw",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
]

//import fs from 'fs';
//var fs = require('fs');
// // // //import fs from './node_modules/fs-extra/fs';
//var abiFile = fs.readFileSync('./build/abi/DonationManager.json','utf-8');
// var parsed = JSON.parse(fs.readFileSync(jsonFile));
// var contractABI = parsed.abi;

//import contractJSON from '../build/contracts/DonationManager.json';
//var abiFile = './build/abi/DonationManager.json';
//var abiFile = './build/contracts/DonationManager.json';

const mmEnableButton  = document.getElementById('mm-connect');
const addDonor        = document.getElementById('addDonor');
const addDonation     = document.getElementById('addDonation');
const addDistributor  = document.getElementById('addDistributor');
const addDistribution = document.getElementById('addDistribution');
const makeDonationBtn = document.getElementById('makeDonation');
mmEnableButton.disabled = true;

var isConnectedToMM = false;
var currentDonorID = -1;
var currentDistributorID = -1;
var numDonors = -1;
var numDistributors = -1;

window.addEventListener('load', function() {
  // if (typeof web3 !== ‘undefined’) {
  //  web3 = new Web3(web3.currentProvider);
  //  } else {
  //  // set the provider you want from Web3.providers
  // web3 = new Web3(new Web3.providers.HttpProvider( “http://localhost:8545”));
  //  }
  if (typeof window.ethereum !== 'undefined') {
    console.log('window.ethereum is enabled' + mmEnableButton.disabled)
    if (window.ethereum.isMetaMask === true) {
      // let mmDetected = document.getElementById('mm-detected')
      // mmDetected.innerHTML += 'MetaMask Is Available!'
      mmEnableButton.disabled = false;
      console.log('MetaMask is active' + mmEnableButton.disabled)
      initialiseFrontEnd()
    } else {
      console.log('MetaMask is not available')
      let mmMessage = document.getElementById('mmMessage')
      mmMessage.innerHTML += 'MetaMask Not Available!'
      // let node = document.createTextNode('<p>MetaMask Not Available!<p>')
      // mmDetected.appendChild(node)
    }
  } else {
    console.log('window.ethereum is not found')
    // let mmDetected = document.getElementById('mm-detected')
    // mmDetected.innerHTML += '<p>MetaMask Not Available!<p>'
  }
})

const initialiseFrontEnd = async function () {
  let web3 = new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  numDonors = await dm.methods.donorCount().call()
  const donorCount = document.getElementById('donorheader')
  donorCount.innerHTML = 'Donors : ' + numDonors

  let numDonations = await dm.methods.donationCount().call()
  const donationCount = document.getElementById('donationheader')
  //console.log('num donation count: ' + numDonations)
  donationCount.innerHTML = 'Donations : ' + numDonations

  numDistributors = await dm.methods.distributorCount().call()
  const distributorCount = document.getElementById('distributorheader')
  distributorCount.innerHTML = 'Distributors : ' + numDistributors

  let numDistributions = await dm.methods.distributionCount().call()
  const distributionCount = document.getElementById('distributionheader')
  distributionCount.innerHTML = 'Distributions : ' + numDistributions

  setButtons()

  // Get Current Donations
  if (numDonations > 0) {
  try {
    let  donationStruct = [];
    let table = document.querySelector("table")
    //table.clearData();
    for (let i = 0; i < numDonations; i++) {
      let donation = await dm.methods.donations(i).call()
      donationStruct.push(donation);
    }
    console.log('Got Here get donation count: ' + donationStruct)
    generateTable(table, donationStruct)
    generateTableHead(table, Object.keys(donationStruct[0]))
    } catch (e) {
      console.log('Problem getting donations: ' )
    }    
  }
  // Get Current Distributions
  if (numDistributions > 0) {
    try {
      let  distributionStruct = [];
      let table = document.querySelector("table")
      for (let i = 0; i < numDistributions; i++) {
        let distribution = await dm.methods.doistributions(i).call()
        distributionStruct.push(distribution);
      }
      generateDistTable(table, distributionStruct)
      generateDistTableHead(table, Object.keys(distributionStruct[0]))
      } catch (e) {
        console.log('Problem getting distributionStruct ' )
      }    
    }
  }

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    if (key == 'donationID')  {
      let th = document.createElement("th");
      let text = document.createTextNode('Donation ID');
      th.appendChild(text);
      row.appendChild(th);  
    } 
    if (key == 'donationName')  {
      let th = document.createElement("th");
      let text = document.createTextNode('Name');
      th.appendChild(text);
      row.appendChild(th);  
    } 
    if (key == 'donationAmount') {
      let th = document.createElement("th");
      let text = document.createTextNode('Amount');
      th.appendChild(text);
      row.appendChild(th);  
    } 
    if (key == 'donationGrantedAmount') {
      let th = document.createElement("th");
      let text = document.createTextNode('Granted');
      th.appendChild(text);
      row.appendChild(th);  
    } 
    if (key == 'requestedNotGrantedAmount') {
      let th = document.createElement("th");
      let text = document.createTextNode('Refused');
      th.appendChild(text);
      row.appendChild(th);  
    } 
    if (key == 'USDperRecipientPerMonth') {
      let th = document.createElement("th");
      let text = document.createTextNode('USD/Month');
      th.appendChild(text);
      row.appendChild(th);  
    } 
    if (key == 'adminFeePercent') {
      let th = document.createElement("th");
      let text = document.createTextNode('Fee %');
      th.appendChild(text);
      row.appendChild(th);  
    } 
    if (key == 'donationState') {
      let th = document.createElement("th");
      let text = document.createTextNode('State');
      th.appendChild(text);
      row.appendChild(th);  
    } 
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      if (key == 'donationID')  {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
      if (key == 'donationName')  {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
      if (key == 'donationAmount')  {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
      if (key == 'donationGrantedAmount') {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      } 
      if (key == 'requestedNotGrantedAmount') {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      } 
      if (key == 'USDperRecipientPerMonth') {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      } 
      if (key == 'adminFeePercent') {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      } 
      if (key == 'donationState') {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      } 
    }
  }
}

function generateDistTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    if (key == 'donationID')  {
      let th = document.createElement("th");
      let text = document.createTextNode('Dist ID');
      th.appendChild(text);
      row.appendChild(th);  
    } 
    if (key == 'distributionAmount') {
      let th = document.createElement("th");
      let text = document.createTextNode('Claimed');
      th.appendChild(text);
      row.appendChild(th);  
    } 
    if (key == 'recipientCount') {
      let th = document.createElement("th");
      let text = document.createTextNode('Recipients');
      th.appendChild(text);
      row.appendChild(th);  
    } 
    if (key == 'distributionMonths') {
      let th = document.createElement("th");
      let text = document.createTextNode('Refused');
      th.appendChild(text);
      row.appendChild(th);  
    } 
  }
}

function generateDistTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      if (key == 'donationID')  {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
      if (key == 'distributionAmount')  {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
      if (key == 'recipientCount') {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      } 
      if (key == 'distributionMonths') {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      } 
    }
  }
}

// Metamask connection
mmEnableButton.onclick = async () => {
  let web3 = new Web3(window.ethereum)
  await ethereum.request({ method: 'eth_requestAccounts'})
  let accounts = await web3.eth.getAccounts();
  const bal = await web3.eth.getBalance(accounts[0]);
  console.log('balance = : ', await web3.eth.getBalance(accounts[0]));
  console.log(bal);
  let mmCurrentAccount = document.getElementById('mm-current-account');
  mmCurrentAccount.innerHTML = 'Current Account: ' + ethereum.selectedAddress
  let mmCurrentBalance = document.getElementById('mm-current-balance');
  mmCurrentBalance.innerHTML = 'Current Balance: ' + bal
  isConnectedToMM = true
  // Check who we are connected as - it could be a donor or distributor or neither (unregistered)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  currentDonorID = -1
  currentDsitributorID = -1
  for (let x = 0; x < numDonors; x ++) {
    let donorStruct = await dm.methods.allDonors(x).call()
    if (donorStruct.donorAddress.toUpperCase() == ethereum.selectedAddress.toUpperCase()) {
      //console.log('Got a match: ' + donorStruct.donorAddress + ' ' + donorStruct.donorName+ ' ' + donorStruct.donorID)
      let connectedAs = document.getElementById('donor-connection');
      connectedAs.innerHTML = 'Connected as Donor: ' + donorStruct.donorName + ' ID ' + donorStruct.donorID;
      currentDonorID = donorStruct.donorID;
      getDonorBalances()
    }     
  }

  if (currentDonorID == -1) {
    for (let x = 0; x < numDistributors; x ++) {
      let distribStruct = await dm.methods.allDistributors(x).call()
      //console.log('match? ' + distribStruct.distributorAddress + ' ' + ethereum.selectedAddress.toUpperCase())
      if (distribStruct.distributorAddress.toUpperCase() == ethereum.selectedAddress.toUpperCase()) {
        console.log('Got a match: ' + distribStruct.distributorAddress + ' ' + distribStruct.distributorName+ ' ' + distribStruct.distributorID)
        let connectedAs = document.getElementById('distributor-connection');
        currentDistributorID = distribStruct.distributorID;
        connectedAs.innerHTML = 'Connected as Distributor: ' + distribStruct.distributorName + ' ID ' + 
                        distribStruct.distributorID + '  Country: ' + distribStruct.distributorCountry + 
                        '  Status: ' + distribStruct.distributorStatus;
        //                distribStruct.distributorID + 'Balance: ' + await web3.eth.getBalance(accounts[0]);
        //getDistributorDetails()
      }     
    }    
  }
  setButtons()
}

// Only enable the adddonor button if this connection is not a distributor or contract owner
const setButtons = function() {
  addDonor.disabled = true;
  addDistributor.disabled = true;
  addDistribution.disabled = true;
  addDonation.disabled = true;
  makeDonationBtn.disabled = true;
  if (isConnectedToMM) {
    if ((currentDonorID >=0 ) && (currentDistributorID == -1)) {
      //addDonor.disabled = false;
      addDonation.disabled = false;
      makeDonationBtn.disabled = false;
      //console.log('Enabled Donation? ' + addDonation.disabled)
    }   

    if ((currentDonorID == -1 ) && (currentDistributorID >= 0)) {
      addDistribution.disabled = false;
      addDistributor.disabled = false;
    }   

    if ((currentDonorID == -1) && (currentDistributorID == -1)) {
      addDonor.disabled = false;
      addDistributor.disabled = false;
    }   
  } else {
    console.log('MetaMask is not connected')
    let mmMessage = document.getElementById('mmMessage')
    mmMessage.innerHTML += 'MetaMask Not Connected!'
    let node = document.createTextNode('<p>MetaMask Not Available!<p>')
    mmMessage.appendChild(node)
  }
}

// get current donors and populate table
const getDonorBalances = async function () {
  const donatedTotal = document.getElementById('donatedTotal')
  // const grantedTotal = document.getElementById('grantedTotal')
  // const notGrantedTotal = document.getElementById('notGrantedTotal')
  // const withdrawlTotal = document.getElementById('withDrawlTotal')
  var web3 = new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  //let donorStruct = await dm.methods.allDonors(x).call()
  let donorBalances = await dm.methods.getAllDonorBalances(currentDonorID).call()
  console.log('Getting balances: ' + ' ' + donorBalances.donatedAmount + ' ' + currentDonorID)
  donatedTotal.innerHTML    = 'Donated : ' + donorBalances.donatedAmount + 'Granted total: ' + donorBalances.grantedAmount
            + 'Not Granted : ' + donorBalances.requestedNotGranted
  // grantedTotal.innerHTML    = 'Granted total: ' + donorBalances.grantedAmount
  // notGrantedTotal.innerHTML = 'Not Granted : ' + donorBalances.requestedNotGranted
  //withdrawlTotal.innerHTML  = 'Available to withdraw: ' + donorBalances.fundsAvailableToWithdraw
}

/* get current distributor and populate table
const getDistributorDetails = async function () {
  const donatedTotal = document.getElementById('donatedTotal')
  const grantedTotal = document.getElementById('grantedTotal')
  const notGrantedTotal = document.getElementById('notGrantedTotal')
  const withdrawlTotal = document.getElementById('withDrawlTotal')
  var web3 = new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  let donorBalances = await dm.methods.getAllDonorBalances(currentDonorID).call()
  donatedTotal.innerHTML = 'Connected as Donor: ' + donorBalances.donatedTotal
  grantedTotal.innerHTML = 'Connected as Donor: ' + donorBalances.grantedTotal
  notGrantedTotal.innerHTML = 'Connected as Donor: ' + donorBalances.notGrantedTotal
  withdrawlTotal.innerHTML = 'Connected as Donor: ' + donorBalances.withdrawlTotal
}*/

// Add a donor:
addDonor.onclick = async () => {
  const donorName = document.getElementById('inputDonorName').value;
  console.log(donorName)
  var web3 = await new Web3(window.ethereum)
  var accounts = await web3.eth.getAccounts();
  const bal = await web3.eth.getBalance(accounts[0]);
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  await dm.methods.createDonor(donorName,bal).send({from: ethereum.selectedAddress})
}

addDonation.onclick = async () => {
  const donationName = document.getElementById('inputDonationName').value;
  const donationUSDpd = document.getElementById('inputUSDpm').value;
  const donationFee = document.getElementById('inputFeePct').value;
  //const donorID = document.getElementById('inputDonationName').value;
  console.log(donationName)
  var web3 = await new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  if (currentDonorID >= 0) {
    await dm.methods.createDonation(donationName,currentDonorID,donationUSDpd,donationFee).send({from: ethereum.selectedAddress})
    let table = document.querySelector("table")
    // Refresh the table data
    table.clearData();
    initialiseFrontEnd()
  }
}

makeDonation.onclick = async () => {
  const donationID = document.getElementById('inputDonationID').value;
  const donationAmount = document.getElementById('inputDonationAmount').value;
  console.log('Make Donation '+ donationAmount)
  var web3 = await new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  if (currentDonorID >= 0) {
    await dm.methods.makeDonation(donationAmount,donationID).send({from: ethereum.selectedAddress})
    initialiseFrontEnd()
  }
}

addDistributor.onclick = async () => {
  const distributorName = document.getElementById('inputDistributorName').value;
  const distributorCountry = document.getElementById('inputDistributorCountry').value;
  console.log(distributorName + ' ' + distributorCountry)
  var web3 = await new Web3(window.ethereum)
  var accounts = await web3.eth.getAccounts();
  //const bal = await web3.eth.getBalance(accounts[0]);
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  await dm.methods.createDistributor(distributorName,distributorCountry).send({from: ethereum.selectedAddress})
}

addDistribution.onclick = async () => {
  const donationID = document.getElementById('inputDonID').value;
  const recipients = document.getElementById('inputRecipients').value;
  const months = document.getElementById('inputMonths').value;
  var web3 = await new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  if (currentDistributorID >= 0) {
    //console.log('DIST _' + currentDistributorID + '_' + donationID + '_' + recipients + '_' + months)
    try { 
    await dm.methods.createDistribution(currentDistributorID,donationID,recipients,months,true).send({from: ethereum.selectedAddress})
    } catch (e) {
      console.log('Problem creating distribution ' + e.reason )
      // let node = document.createTextNode('<p>e<p>')
      // mmMessage.appendChild(node)
      }    
  }
}


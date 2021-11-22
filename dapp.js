//const { Contract } = require("ethers");

// contract address :
const contractAddress = '0x331A60480eC566e8214151bD268Fe08498Bb5EA0'

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
        "internalType": "uint256",
        "name": "_USDperRecipientPerMonth",
        "type": "uint256"
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
      },
      {
        "internalType": "uint32",
        "name": "_donorID",
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
      },
      {
        "internalType": "uint32",
        "name": "_donorID",
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
        "internalType": "uint256",
        "name": "USDperRecipientPerMonth",
        "type": "uint256"
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
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "distributions",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "distributionID",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "distributorID",
        "type": "uint32"
      },
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
        "internalType": "uint256",
        "name": "distributionAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "recipientCount",
        "type": "uint32"
      },
      {
        "internalType": "uint8",
        "name": "distributionMonths",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "recipientDetailsAreValid",
        "type": "bool"
      },
      {
        "internalType": "enum DonationManager.DistributionState",
        "name": "distributionState",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_distributionID",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "_donorID",
        "type": "uint32"
      },
      {
        "internalType": "address payable",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "giveFunds",
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
      },
      {
        "internalType": "uint32",
        "name": "_donorID",
        "type": "uint32"
      }
    ],
    "name": "approveFunds",
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
//const approveDistribution = document.getElementById('approveDistribution');
const makeDonationBtn = document.getElementById('makeDonation');
const refreshPage     = document.getElementById('refreshPage');
const dist_table      = document.getElementById("distrotable")
const table           = document.getElementById("donationtable")
const sendFunds       = document.getElementById('sendDistribution');

const distributorWithdrawlBtn = document.getElementById("distributorWithdrawlBtn")
const donorWithdrawlBtn       = document.getElementById("donorWithdrawlBtn")
const loadRecipientFile       = document.getElementById("loadRecipientFile")

mmEnableButton.disabled = true;

var showBalance           = 0
var donorName             = 'None'
var distributorName       = 'None'
var isConnectedToMM       = false;
var currentDonorID        = -1;
var currentDistributorID  = -1;
var numDonors             = -1;
var numDistributors       = -1;

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
  //web3.handleRevert = true
  dm.setProvider(window.ethereum)
  //dm.handleRevert = true

  numDonors = await dm.methods.donorCount().call()
  const donorCount = document.getElementById('donorheader')
  donorCount.innerHTML = 'Donors : ' + numDonors

  let numDonations = await dm.methods.donationCount().call()
  const donationCount = document.getElementById('donationheader')
  //console.log('num donation count: ' + numDonations)
  donationCount.innerHTML = 'Donations : ' + numDonations

  numDistributors = await dm.methods.distributorCount().call()
  const distributorCount = document.getElementById('distributorheader')
  distributorCount.innerHTML = 'Distributors (NGO) : ' + numDistributors

  let numDistributions = await dm.methods.distributionCount().call()
  console.log('DISTS' + numDistributions)
  const distributionCount = document.getElementById('distributionheader')
  distributionCount.innerHTML = 'Distributions : ' + numDistributions

  setButtons()

  // Get Current Donations
  if (numDonations > 0) {
  try {
    let  donationStruct = [];
    for (let i = 0; i < numDonations; i++) {
      let donation = await dm.methods.donations(i).call()
      donationStruct.push(donation);
    }
    generateTable(table, donationStruct)
    generateTableHead(table, Object.keys(donationStruct[0]))
    } catch (e) {
      console.log('Problem getting donations: ' + e.message)
    }
  }
  // Get Current Distributions
  if (numDistributions > 0) {
    try {
      let  distributionStruct = [];
      for (let i = 0; i < numDistributions; i++) {
        let distribution = await dm.methods.distributions(i).call()
        //console.log('Got Here get distribution count: ' + distribution.distributionState)
        distributionStruct.push(distribution);
      }
      generateDistTable(dist_table, distributionStruct)
      generateDistTableHead(dist_table, Object.keys(distributionStruct[0]))
      } catch (e) {
        console.log('Problem getting distributionStruct ' + e.message )
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
      let text = document.createTextNode('Donated');
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
      let text = document.createTextNode('Awaiting Approval');
      th.appendChild(text);
      row.appendChild(th);
    }
    if (key == 'USDperRecipientPerMonth') {
      let th = document.createElement("th");
      let text = document.createTextNode('Eth/Month');
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
      let text = document.createTextNode('Donation Status');
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
        let text = document.createTextNode(element[key]/1e18);
        cell.appendChild(text);
      }
      if (key == 'donationGrantedAmount') {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]/1e18);
        cell.appendChild(text);
      }
      if (key == 'requestedNotGrantedAmount') {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]/1e18);
        cell.appendChild(text);
      }
      if (key == 'USDperRecipientPerMonth') {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]/1e18);
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
        //console.log('Text' + text.nodeValue)
        if (text.nodeValue == 0) {text.nodeValue = 'Created';  }
        if (text.nodeValue == 1) {text.nodeValue = 'Funded';  }
        if (text.nodeValue == 2) {text.nodeValue = 'Distributing';  }
        cell.appendChild(text);
      }
    }
  }
}

function generateDistTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    if (key == 'distributionID')  {
      let th = document.createElement("th");
      let text = document.createTextNode('Distribution ID');
      th.appendChild(text);
      row.appendChild(th);
    }
    if (key == 'donationID')  {
      let th = document.createElement("th");
      let text = document.createTextNode('Donation ID');
      th.appendChild(text);
      row.appendChild(th);
    }
    if (key == 'distributorID')  {
      let th = document.createElement("th");
      let text = document.createTextNode('Distributor ID');
      th.appendChild(text);
      row.appendChild(th);
    }
    if (key == 'distributionAmount') {
      let th = document.createElement("th");
      let text = document.createTextNode('Amount Claimed');
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
      let text = document.createTextNode('Months');
      th.appendChild(text);
      row.appendChild(th);
    }
    if (key == 'distributionState') {
      let th = document.createElement("th");
      let text = document.createTextNode('Distribution Status');
      th.appendChild(text);
      row.appendChild(th);
    }
  }
}

function generateDistTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      if (key == 'distributionID')  {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
      if (key == 'donationID')  {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }      if (key == 'distributorID')  {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
      if (key == 'distributionAmount')  {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]/1e18);
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
      if (key == 'distributionState') {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        if (text.nodeValue == 0) {text.nodeValue = 'Created';  }
        if (text.nodeValue == 1) {text.nodeValue = 'Requested';  }
        if (text.nodeValue == 2) {text.nodeValue = 'Approved';  }
        if (text.nodeValue == 3) {text.nodeValue = 'NOT Approved';  }
        cell.appendChild(text);
      }
    }
  }
}

// Metamask connection
mmEnableButton.onclick = async () => {
  refreshPageFunction()
}

// Refresh the page without connecting to MM
refreshPage.onclick = async () => {
  //  Refresh the table data
  table.innerHTML = "";
  dist_table.innerHTML = "";
  initialiseFrontEnd()
}

const refreshPageFunction = async function ()  {
  let web3 = new Web3(window.ethereum)
  await ethereum.request({ method: 'eth_requestAccounts'})
  let accounts = await web3.eth.getAccounts();
  showBalance = await web3.eth.getBalance(accounts[0])/1e18;
  //console.log('balance Account[0] = : ', await web3.eth.getBalance(accounts[0]));
  // Initialise
  let connectedAsDonor       = document.getElementById('donor-connection');
  let connectedAsDistributor = document.getElementById('distributor-connection');
  let donatedTotal           = document.getElementById('donatedTotal')
  connectedAsDonor.innerHTML = ''
  connectedAsDistributor.innerHTML = ''
  donatedTotal.innerHTML = ''
  isConnectedToMM = true
  // Check who we are connected as - it could be a donor or distributor or neither (unregistered)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  currentDonorID = -1
  currentDistributorID = -1
  for (let x = 0; x < numDonors; x ++) {
    let donorStruct = await dm.methods.allDonors(x).call()
    if (donorStruct.donorAddress.toUpperCase() == ethereum.selectedAddress.toUpperCase()) {
      donorName             = donorStruct.donorName
      console.log('Got a match: ' + donorStruct.donorAddress + ' ' + donorStruct.donorName+ ' ' + donorStruct.donorID)
      connectedAsDonor.innerHTML = 'Connected as Donor: ' + donorStruct.donorName + ' ID ' + donorStruct.donorID;
      currentDonorID = donorStruct.donorID;
      showBalance = await web3.eth.getBalance(donorStruct.donorAddress)/1e18;
      getDonorBalances()
    }
  }

  if (currentDonorID == -1) {
    for (let x = 0; x < numDistributors; x ++) {
      let distribStruct = await dm.methods.allDistributors(x).call()
      //console.log('match? ' + distribStruct.distributorAddress + ' ' + ethereum.selectedAddress.toUpperCase())
      if (distribStruct.distributorAddress.toUpperCase() == ethereum.selectedAddress.toUpperCase()) {
        //console.log('Got a match: ' + distribStruct.distributorAddress + ' ' + distribStruct.distributorName+ ' ' + distribStruct.distributorID)
        currentDistributorID = distribStruct.distributorID;
        distributorName       = distribStruct.distributorName;
        let status = 'NEW';
        if (distribStruct.distributorStatus == 1) {status = 'UNTrusted'} ;
        if (distribStruct.distributorStatus == 2) {status = 'Trusted'} ;
        connectedAsDistributor.innerHTML = 'Connected as Distributor: ' + distribStruct.distributorName + '     ID ' +
                        distribStruct.distributorID + '      Country: ' + distribStruct.distributorCountry +
                        '      Status:   ' + status;
      showBalance = await web3.eth.getBalance(distribStruct.distributorAddress)/1e18;
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
  //approveDistribution.disabled = true;
  makeDonationBtn.disabled = true;
  donorWithdrawlBtn.disabled = true;
  distributorWithdrawlBtn.disabled = true;
  loadRecipientFile.disabled = true;
  sendFunds.disabled = true;
  let mmMessage = document.getElementById('mmMessage')

  if (isConnectedToMM) {

    if ((currentDonorID >=0 ) && (currentDistributorID == -1)) {
      //addDonor.disabled = false;
      addDonation.disabled = false;
      makeDonationBtn.disabled = false;
      //approveDistribution.disabled = false;
      canSendFunds();
      //console.log('Enabled Donation? ' + addDonation.disabled)
      mmMessage.innerHTML = 'MetaMask IS Connected as DONOR ID ' + currentDonorID + ' bal ' + showBalance
    }

    if ((currentDonorID == -1 ) && (currentDistributorID >= 0)) {
      addDistribution.disabled = false;
      addDistributor.disabled = false;
      mmMessage.innerHTML = 'MetaMask IS Connected as DISTRIBUTOR ID ' + currentDistributorID  + ' bal ' + showBalance
    }

    if ((currentDonorID == -1) && (currentDistributorID == -1)) {
      addDonor.disabled = false;
      addDistributor.disabled = false;
      mmMessage.innerHTML = 'MetaMask IS Connected as a new (unregistered) user '  + ' bal ' + showBalance
    }
  } else {
    console.log('MetaMask ' + isConnectedToMM)
    mmMessage.innerHTML = 'MetaMask Is NOT Connected!'
    let connectedAs = document.getElementById('distributor-connection');
    connectedAs.innerHTML = '';
    currentDonorID        = -1;
    donorName             = 'None';
    currentDistributorID  = -1;
    distributorName       = 'None';
  }
}

const canSendFunds = async function() {
  const inputDistributionID = document.getElementById('inputDistributionID').value;
  var web3 = new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)

  let distributionsStruct = await dm.methods.distributions(inputDistributionID).call()
  let sendAmount = distributionsStruct.distributionAmount
  let distribStruct = await dm.methods.allDistributors(0).call()
  const distAddr   = distribStruct.distributorAddress
  console.log('Distr Addr looked up from contract ' + distAddr + '_' + sendAmount)
  console.log('Distr Status ' + distributionsStruct.distributionState)
  if (distributionsStruct.distributionState == 1 ) {
    sendFunds.disabled = false;
  }

}

// get current donors and populate table
const getDonorBalances = async function () {
  const donatedTotal = document.getElementById('donatedTotal')
  var web3 = new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  let donorBalances = await dm.methods.getAllDonorBalances(currentDonorID).call()
  //console.log('Sender balance: ' + ' ' + msg.sender.balance + ' _ ' + currentDonorID)
  //console.log('Getting balances: ' + ' ' + donorBalances.donatedAmount/1e18 + ' ' + currentDonorID)
  //console.log('Withdraw balance: ' + ' ' + donorBalances.fundsAvailableToWithdraw)
  donatedTotal.innerHTML    = 'Donated : ' + donorBalances.donatedAmount/1e18 + '  Granted : ' + donorBalances.grantedAmount/1e18
            + '  Not Granted : ' + donorBalances.requestedNotGranted/1e18 + ' Withdraw ' + donorBalances.fundsAvailableToWithdraw/1e18
}

// Add a donor:
addDonor.onclick = async () => {
  const donorName = document.getElementById('inputDonorName').value;
  console.log(donorName)
  var web3 = await new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  await dm.methods.createDonor(donorName).send({from: ethereum.selectedAddress})
  //initialiseFrontEnd()
  // location.reload()
  // refreshPageFunction()
}

addDonation.onclick = async () => {
  const donationName = document.getElementById('inputDonationName').value;
  const donationFee = document.getElementById('inputFeePct').value;
  //const donorID = document.getElementById('inputDonationName').value;
  console.log(donationName)
  var web3 = await new Web3(window.ethereum)
  const donationUSDpd = web3.utils.toBN(document.getElementById('inputUSDpm').value * 1e18);
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  if (currentDonorID >= 0) {
    await dm.methods.createDonation(donationName,currentDonorID,donationUSDpd,donationFee).send({from: ethereum.selectedAddress})
    let table = document.querySelector("table")
    //location.reload()
    //refreshPageFunction()
  }
}

makeDonation.onclick = async () => {
  //const toBN = web3.utils.toBN;
  const donationID = document.getElementById('inputDonationID').value;
  var web3 = await new Web3(window.ethereum)
  let donationAmount = web3.utils.toBN(document.getElementById('inputDonationAmount').value * 1e18);
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  if (currentDonorID >= 0) {
    console.log('Make Donation '+ donationAmount + ' from donor ' + currentDonorID + ' ON donation ' + donationID)
    await dm.methods.makeDonation(donationAmount,donationID,currentDonorID).send({from: ethereum.selectedAddress})
    refreshPageFunction()
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
  const distMessages = document.getElementById('distrutionErrors');

  var web3 = await new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.handleRevert = true
  dm.setProvider(window.ethereum)
  if (currentDistributorID >= 0) {
    try {
      await dm.methods.createDistribution(currentDistributorID,donationID,recipients,months,true).send({from: ethereum.selectedAddress})
      distMessages.innerHTML = 'Distribution Added Successfully'
      refreshPageFunction()
    } catch (e) {
      distMessages.innerHTML = 'Distribution cannot be added - check that donation is funded and has sufficient funds.'
        console.log('Message ' + e.message )
        console.log('Code ' + e.code )
//        console.log('Reason ' + e.reason )
      }
  }
}

// approveDistribution.onclick = async () => {
//   const inputDistributionID = document.getElementById('inputDistributionID').value;
//   var web3 = await new Web3(window.ethereum)
//   const dm = new web3.eth.Contract(contractABI, contractAddress)
// //  dm.handleRevert = true
//   dm.setProvider(window.ethereum)
//   if (currentDonorID >= 0) {
//     try {
//       //console.log('Input DID ' + inputDistributionID + ' _ ' + currentDonorID )
//       await dm.methods.approveFunds(inputDistributionID, currentDonorID).send({from: ethereum.selectedAddress})
//       refreshPageFunction()
//     } catch (e) {
//         console.log('Message ' + e.message )
// //        console.log('Code ' + e.code )
// //        console.log('Reason ' + e.reason )
//       }
//   }
// }

// This process triggers the send ffrom the front end and not the contract cos Icannot get the approve model to work
sendDistribution.onclick = async () => {
  const inputDistributionID = document.getElementById('inputDistributionID').value;
  var web3 = await new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  if (currentDonorID >= 0) {
    try {
      let distributionsStruct = await dm.methods.distributions(inputDistributionID).call()
      let sendAmount = distributionsStruct.distributionAmount
      let distribStruct = await dm.methods.allDistributors(0).call()
      const distAddr   = distribStruct.distributorAddress
      console.log('Distr Addr looked up from contract ' + distAddr + '_' + sendAmount)
      console.log('Distr Status ' + distributionsStruct.distributionState)
      if (distributionsStruct.distributionState == 1 ) {
        await dm.methods.giveFunds(inputDistributionID, currentDonorID).send({from: ethereum.selectedAddress})
        //await dm.methods.giveFunds(inputDistributionID, currentDonorID, distAddr).send({from: dm.contractAddress})
        await web3.eth.sendTransaction({to : distAddr, value: sendAmount, from: ethereum.selectedAddress})
      }
    } catch (e) {
        console.log('Message ' + e.message )
        console.log('Code ' + e.code )
//        console.log('Reason ' + e.reason )
      }
  }
}
/*
async function error() {
  console.log('Errorrr')
}

async function getRevertReason(txHash){

  const tx = await web3.eth.getTransaction(txHash)

  var result = await web3.eth.call(tx, tx.blockNumber)

  result = result.startsWith('0x') ? result : `0x${result}`

  if (result && result.substr(138)) {

    const reason = web3.utils.toAscii(result.substr(138))
    console.log('Revert reason:', reason)
    return reason

  } else {

    console.log('Cannot get reason - No return value')

  }
*/

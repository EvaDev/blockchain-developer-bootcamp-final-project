
// contract address :
const contractAddress = '0x343910CEd089676d2224bE97DdD22A187eF473DD'

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
      {
        "internalType": "uint32",
        "name": "_donationPurpose",
        "type": "uint32"
      }
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
  },]

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
mmEnableButton.disabled = true;
addDonor.disabled = true;
addDistributor.disabled = true;
addDistribution.disabled = true;
// Only enable the adddonor button if this connection is not a distributor or contract owner
addDonation.disabled = true;

let currentDonorID = -1;
let currentDsitributorID = -1;
let numDonors = -1;
let numDistributors = -1;

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
      getDonationDetails()
    } else {
      console.log('MetaMask is not available')
      // let mmDetected = document.getElementById('mm-detected')
      // mmDetected.innerHTML += 'MetaMask Not Available!'
      // let node = document.createTextNode('<p>MetaMask Not Available!<p>')
      // mmDetected.appendChild(node)
    }
  } else {
    console.log('window.ethereum is not found')
    // let mmDetected = document.getElementById('mm-detected')
    // mmDetected.innerHTML += '<p>MetaMask Not Available!<p>'
  }
})

const getDonationDetails = async function () {
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

  // Get Current Donations
  if (numDonations > 0) {
  try {
    let  donationStruct = [];
    let table = document.querySelector("table")
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
    }}

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    if (key == 'donationID')  {
      let th = document.createElement("th");
      let text = document.createTextNode('ID');
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
      let text = document.createTextNode('USD pd');
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
      let text = document.createTextNode('ID');
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
  addDonation.disabled = true;
  addDistribution.disabled = true;
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

  // Check who we are connected as - it could be a donor or distributor or neither (unregistered)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  for (let x = 0; x < numDonors; x ++) {
    let donorStruct = await dm.methods.allDonors(x).call()
    console.log('match? ' + donorStruct.donorAddress + ' ' + ethereum.selectedAddress.toUpperCase())
    if (donorStruct.donorAddress.toUpperCase() == ethereum.selectedAddress.toUpperCase()) {
      console.log('Got a match: ' + donorStruct.donorAddress + ' ' + donorStruct.donorName+ ' ' + donorStruct.donorID)
      let connectedAs = document.getElementById('mm-connection');
      connectedAs.innerHTML = 'Connected as Donor: ' + donorStruct.donorName + ' ID ' + donorStruct.donorID;
      addDonation.disabled = false;
      currentDonorID = donorStruct.donorID;
    }     
  }
  if (currentDonorID = -1) {
    for (let x = 0; x < numDistributors; x ++) {
      let distribStruct = await dm.methods.allDistributors(x).call()
      console.log('match? ' + distribStruct.distributorAddress + ' ' + ethereum.selectedAddress.toUpperCase())
      if (distribStruct.distributorAddress.toUpperCase() == ethereum.selectedAddress.toUpperCase()) {
        console.log('Got a match: ' + distribStruct.distributorAddress + ' ' + distribStruct.distributorName+ ' ' + distribStruct.distributorID)
        let connectedAs = document.getElementById('mm-connection');
        connectedAs.innerHTML = 'Connected as Distributor: ' + distribStruct.donorName + ' ID ' + distribStruct.distributorID;
        addDistribution.disabled = false;
        currentDistributorID = distribStruct.distributorID;
      }     
    }    
  }
  if ((currentDonorID = -1) && (currentDonorID = -1)) {
    addDonor.disabled = false;
    addDistributor.disabled = false;
  }   
}

// get current donors and populate table
// const getDonations = document.getElementById('getDonations')
// getDonations.onclick = async () => {
//   var web3 = new Web3(window.ethereum)
//   const dm = new web3.eth.Contract(contractABI, contractAddress)
//   dm.setProvider(window.ethereum)
//   var donorStruct = await dm.methods.allDonors(0).call()
//   console.log('Got Here: ' + donorStruct.donorID)

//   for (let x = 0; x < donorStruct.count; x ++) {
//     if donorStruct[x].
//     const connectedAs = document.getElementById('mm-connection')
//     connectedAs.innerHTML = 'Connected as Donor: ' + donorStruct.donorName
//   }
// }

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
  const donationUSDpd = document.getElementById('inputUSDpd').value;
  const donationFee = document.getElementById('inputFeePct').value;
  const donorID = document.getElementById('inputDonationName').value;
  console.log(donationName)
  var web3 = await new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  if (currentDonorID >= 0) {
    await dm.methods.createDonation(donationName,currentDonorID,donationUSDpd,donationFee,0).send({from: ethereum.selectedAddress})
  }
}

makeDonation.onclick = async () => {
  const donationID = document.getElementById('inputDonationID').value;
  const donationAmount = document.getElementById('inputDonationAmount').value;
  console.log('Make Donation '+ donationAmount)
  var web3 = await new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  await dm.methods.makeDonation(donationAmount,donationID).send({from: ethereum.selectedAddress})
}

addDistributor.onclick = async () => {
  const distributorName = document.getElementById('inputDistributorName').value;
  const distributorCountry = document.getElementById('inputDistributorCountry').value;
  console.log(distributorName + ' ' + distributorCountry)
  var web3 = await new Web3(window.ethereum)
  var accounts = await web3.eth.getAccounts();
  const bal = await web3.eth.getBalance(accounts[0]);
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  await dm.methods.createDistributor(distributorName,bal).send({from: ethereum.selectedAddress})
}

addDistribution.onclick = async () => {
  const donationID = document.getElementById('inputDonationID').value;
  const recipients = document.getElementById('inputUSDpd').value;
  const months = document.getElementById('inputFeePct').value;
  var web3 = await new Web3(window.ethereum)
  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)
  if (currentDistributorID >= 0) {
    await dm.methods.createDistribution(currentDistributorID,donationID,recipients,months,true).send({from: ethereum.selectedAddress})
  }
}


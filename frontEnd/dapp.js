
// contract address :
const contractAddress = '0xECdE515D91bb1Aa9Af274A260C15c908F4A1852d'

// add contract ABI from Remix:
//const { abi } = require('./build/contracts/DonationManager.json');
// const contractABI = build/contracts/DonationManager.json
// var contractABI = new web3.eth.Contract(contractABI, contractAddress)

// import fs from 'fs';
// // //import fs from './node_modules/fs-extra/fs';
// var jsonFile = './build/contracts/DonationManager.json';
// var parsed = JSON.parse(fs.readFileSync(jsonFile));
// var contractABI = parsed.abi;

import contractJSON from '../build/contracts/DonationManager.json';

window.addEventListener('load', function() {

  if (typeof window.ethereum !== 'undefined') {
    console.log('window.ethereum is enabled')
    if (window.ethereum.isMetaMask === true) {
      console.log('MetaMask is active')
      let mmDetected = document.getElementById('mm-detected')
      mmDetected.innerHTML += 'MetaMask Is Available!'

      // add in web3 here
      var web3 = new Web3(window.ethereum)

    } else {
      console.log('MetaMask is not available')
      let mmDetected = document.getElementById('mm-detected')
      mmDetected.innerHTML += 'MetaMask Not Available!'
      // let node = document.createTextNode('<p>MetaMask Not Available!<p>')
      // mmDetected.appendChild(node)
    }
  } else {
    console.log('window.ethereum is not found')
    let mmDetected = document.getElementById('mm-detected')
    mmDetected.innerHTML += '<p>MetaMask Not Available!<p>'
  }
})


var web3 = new Web3(window.ethereum)

// Grabbing the button object,

const mmEnable = document.getElementById('mm-connect');

// since MetaMask has been detected, we know
// `ethereum` is an object, so we'll do the canonical
// MM request to connect the account.
//
// typically we only request access to MetaMask when we
// need the user to do something, but this is just for
// an example

mmEnable.onclick = async () => {
  await ethereum.request({ method: 'eth_requestAccounts'})
  var accounts = await web3.eth.getAccounts();
  const bal = await web3.eth.getBalance(accounts[0]);
  console.log('balance = : ', await web3.eth.getBalance(accounts[0]));
  //console.log(bal);
  // grab mm-current-account
  // and populate it with the current address
  var mmCurrentAccount = document.getElementById('mm-current-account');
  mmCurrentAccount.innerHTML = 'Current Account: ' + ethereum.selectedAddress

  var mmCurrentBalance = document.getElementById('mm-current-balance');
  mmCurrentBalance.innerHTML = 'Current Balance: ' + bal
}

// grab the button for input to a contract:

const ssSubmit = document.getElementById('addDonor');

ssSubmit.onclick = async () => {
  // grab donor Name

  const ssInputValue = document.getElementById('inputDonorName').value;
  console.log(ssInputValue)

  var web3 = await new Web3(window.ethereum)

  // instantiate smart contract instance
  //var contractABI = new web3.eth.Contract(contractJSON.abi, contractAddress);

  console.log(bal);
  console.log(contractABI);

  const dm = new web3.eth.Contract(contractABI, contractAddress)
  dm.setProvider(window.ethereum)

  await dm.methods.createDonor(ssInputValue,bal).send({from: ethereum.selectedAddress})

}

const ssGetValue = document.getElementById('ss-get-value')

ssGetValue.onclick = async () => {

  var web3 = new Web3(window.ethereum)

  const simpleStorage = new web3.eth.Contract(ssABI, ssAddress)
  simpleStorage.setProvider(window.ethereum)

  var value = await simpleStorage.methods.retrieve().call()

  console.log(value)

  const ssDisplayValue = document.getElementById('ss-display-value')

  ssDisplayValue.innerHTML = 'Current Simple Storage Value: ' + value

}

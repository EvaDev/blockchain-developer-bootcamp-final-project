
//import Web3 from 'web3';
//const Web3 = require('web3');

// contract address on Ropsten:
const myContractAddress = '0xECdE515D91bb1Aa9Af274A260C15c908F4A1852d'

// add contract ABI :
// const web3 = new Web3(window.web3.currentProvider);
// const { abi } = require('./build/contracts/DonationManager.json');
// var smart_contract_interface = new web3.eth.Contract(abi, myContractAddress)
const myABI = build/contracts/DonationManager.json
import DonationManager from '/build/contracts/DonationManager.json';
web3 = new Web3(Web3.givenProvider);
const myContractWeb3 = new web3.eth.contract(DonationManager.abi, myContractAddress);
//https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3
//const accounts = await ethereum.request({ method: 'eth_accounts' });

// and then call the function that I want to
// const functionThatIWantToUseFromSmartContract = async () =>{
//     const account = await window.ethereum.enable();
//     const accounts = account[0];
//     const gas = await
//     myContractWeb3.methods.theFunction(args).estimateGas();
//     await myContractWeb3.methods.theFunction(args).send();
// }
// Using the 'load' event listener for Javascript to
// check if window.ethereum is available

window.addEventListener('load', function() {

	if (typeof web3 !== 'undefined') {
	   App.web3Provider = web3.currentProvider;
	   web3 = new Web3(web3.currentProvider);
	} else {
	   // If no injected web3 instance is detected, fallback to Ganache.
	   App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:8545');
	   web3 = new Web3(App.web3Provider);
	}

	//await window.ethereum.enable();

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
  // grab mm-current-account
  // and populate it with the current address
  var mmCurrentAccount = document.getElementById('mm-current-account');
  mmCurrentAccount.innerHTML = 'Current Account: ' + ethereum.selectedAddress
}

// grab the button for input to a contract:

const ssSubmit = document.getElementById('ss-input-button');

ssSubmit.onclick = async () => {
  // grab value from input

  const ssInputValue = document.getElementById('ss-input-box').value;
  console.log(ssInputValue)

  var web3 = new Web3(window.ethereum)

  // instantiate smart contract instance

  const simpleStorage = new web3.eth.Contract(ssABI, ssAddress)
  simpleStorage.setProvider(window.ethereum)

  await simpleStorage.methods.store(ssInputValue).send({from: ethereum.selectedAddress})

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

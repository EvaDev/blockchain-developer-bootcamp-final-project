const { expect } = require('chai');
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
//const { accounts, contract } = require('@openzeppelin/test-environment');
// Load compiled artifacts
const DonationManager = artifacts.require('DonationManager');
//const DonationManager = contract.fromArtifact('DonationManager');
//const truffleAssert = require('truffle-assertions');

contract('DonationManager', (accounts) => {
      let donationManager;
      const [contractOwner, donorA, distributorX, donorB, distributorY, fundingAccount] = accounts;
      const eth100 = 100e18;
      const eth10  = 10e18;
      const toBN = web3.utils.toBN;
      const eth10String = 10e18.toString();

      before(async () => {
        donationManager = await DonationManager.new({ from: contractOwner });
        const startbalA   = await web3.eth.getBalance(donorA);
        console.log ('Donor A Start balance ', web3.utils.fromWei(startbalA.toString(),'ether'));
        await donationManager.createDonor( "DonorA" ,toBN(startbalA) , { from: donorA } );
        // Set Distributor balance to zero
        //await donationManager.transfer(fundingAccount, eth10.toString(), { from: distributorX });
        await donationManager.createDistributor("DistributorX", "South Africa", {from: distributorX } );
        await donationManager.createDonation("Donation A1", 0, 40, 5, 0, {from: donorA } );
        //await donationManager.donorDeposit(toBN(eth10), {from: donorA } );
        await donationManager.makeDonation( toBN(eth10), 0, {from: donorA } );
        await donationManager.createDistribution(0, 0, 500, 1, true, {from: distributorX } );
      });

      it('Check the donor A account ', async function () {
        const donorStruct = await donationManager.allDonors.call(0,{ from: donorA });
        const donorMap    = await donationManager.donorBalances.call(donorA);
        console.log ('Donor A account ', donorStruct.donorAddress);
        console.log ('Donor A Mapping Balance ', donorMap.toString());
        expect((await donationManager.donorCount()).toString()).to.equal('1');
        expect(donorStruct.donorName.toString()).to.equal('DonorA');
      });
      it('Check  Distributor X account ', async function () {
        const distributorStruct = await donationManager.allDistributors.call(0,{from: distributorX });
        const distributorbal = await web3.eth.getBalance(distributorX);
        console.log ('Distributor X Start balance ', web3.utils.fromWei(distributorbal.toString(),'ether'));
        console.log ('Distributor X account ', distributorStruct.distributorAddress);
        expect((await donationManager.distributorCount()).toString()).to.equal('1');
        //expect((await this.donationManager.donorBalances(donorA)).toString()).to.equal('0');
        expect(distributorStruct.distributorName.toString()).to.equal('DistributorX');
      });
      it('Check Donation A1 exists and funding = 10 Eth', async function () {
        const donorStruct = await donationManager.allDonors.call(0,{ from: donorA });
        const donationStruct = await donationManager.donations.call(0);
        console.log ('Donation A1 Start amount ', web3.utils.fromWei(donationStruct.donationAmount.toString(),'ether'));
        //console.log ('Donation A1 USD/Recipient/Month ', donationStruct.USDperRecipientPerMonth.toString());
        expect(donationStruct.USDperRecipientPerMonth.toString()).to.equal('40');
        expect(donationStruct.donationName.toString()).to.equal('Donation A1');
        expect(donorStruct.amountDonated.toString()).to.equal('10000000000000000000');
        expect(donationStruct.donationAmount.toString()).to.equal('10000000000000000000');
      });
      it('Check  Distribution X1 A1 ', async function () {
        const distributionStruct = await donationManager.distributions.call(0,{from: distributorX });
        //console.log ('Distribution X1 A1 ', distributionStruct);
        expect((await donationManager.distributionCount()).toString()).to.equal('1');
        //expect((await this.donationManager.donorBalances(donorA)).toString()).to.equal('0');
        expect(distributionStruct.distributionAmount.toString()).to.equal('20000');
      });
    });

/*describe('DonationManager as donor A', function() {
  //it('donorDeposit increased balance', async () => {
    //await this.donationManager.donorDeposit(eth10);
    const [contractOwner, donorA, distributorX, donorB, distributorY, fundingAccount] = accounts;
    //const [ owner ] = accounts;

    beforeEach(async function() {
      this.contract = await DonationManager.new({ from: donorA });
    });

    it('the deployer is the owner', async function () {
      const startbal = await web3.eth.getBalance(donorA);
      console.log ('Donor A ', donorA);
      console.log ('Donor A Start balance ', web3.utils.fromWei(startbal.toString(),'ether'));
      expect(await this.contract.owner()).to.equal(donorA);
    });
  });


// Start test block
contract('DonationManager', function (accounts) {

  const [contractOwner, donorA, distributorX, donorB, distributorY, fundingAccount] = accounts;
  const eth100 = 100e18;
  const eth10  = 10e18;

  before(async function () {
    // Deploy a new DonationManager contract for each test
    this.donationManager = await DonationManager.new();
    const contractOwner = await this.donationManager.owner();
    const startbal = await web3.eth.getBalance(distributorX);
    console.log ('Contract Owner ', contractOwner);
    console.log ('Distributor Start balance ', web3.utils.fromWei(startbal.toString(),'ether'));
    //await this.donationManager.transfer(accounts[5], 1, { from: donorA });
  });

  // Test case one
  it('Create a donor account and retrieve it', async function () {
    // Set the donors & distributor balances to zero
    //await this.donationManager.transfer(accounts[5], eth10.toString(), { from: donorA });
    // Store a value
    await this.donationManager.createDonor("DonorA",{from: accounts[1] } );

    const donor = await this.donationManager.allDonors.call(0);
    // Test if the returned value is the same one
    expect((await this.donationManager.donorCount()).toString()).to.equal('1');
    //expect((await this.donationManager.donorBalances(donorA)).toString()).to.equal('0');
    expect(donor.donorName.toString()).to.equal('DonorA');
  });

  it('Create a distributor account and retrieve it', async function () {
    // Set the donors & distributor balances to zero
    //await this.donationManager.transfer(accounts[5], eth10.toString(), { from: accounts[2] });
    // Store a value
    await this.donationManager.createDistributor("DistributorX",{from: distributorX } );

    const distributor = await this.donationManager.allDistributors.call(0);
    const distributorbal = await web3.eth.getBalance(accounts[2]);
    console.log ('Distributor Eth balance ', web3.utils.fromWei(distributorbal.toString(),'ether'));
    // Test if the returned value is the same one
    expect((await this.donationManager.distributorCount()).toString()).to.equal('1');
    //expect((await this.donationManager.donorBalances(donorA)).toString()).to.equal('0');
    expect(distributor.distributorName.toString()).to.equal('DistributorX');
  });

  describe('Test donorDeposit() method', () => {
    it('donorDeposit increased balance', async () => {
      await this.donationManager.donorDeposit(eth10 );
      const amount = ethers.utils.parseEther('0');
      await expect(
        vendorContract.connect(addr1).buyTokens({
          value: amount,
        }),
      ).to.be.revertedWith('Send ETH to buy some tokens');
  });

});

describe('DonationManager as deployer', function() {
  //it('donorDeposit increased balance', async () => {
    //await this.donationManager.donorDeposit(eth10);
    const [contractOwner, donorA, distributorX, donorB, distributorY, fundingAccount] = accounts;
    //const [ owner ] = accounts;

    beforeEach(async function() {
      this.contract = await DonationManager.new({ from: contractOwner });
      //this.contract = await DonationManager.new();
    });

    it('the deployer is the owner', async function () {
      console.log ('Contract Owner ', contractOwner);
      const startbal = await web3.eth.getBalance(contractOwner);
      console.log ('Contract Owner Start balance ', web3.utils.fromWei(startbal.toString(),'ether'));
      const startbalA = await web3.eth.getBalance(donorA);
      console.log ('Donor A ', donorA);
      console.log ('Donor A Start balance ', web3.utils.fromWei(startbalA.toString(),'ether'));
      expect(await this.contract.owner()).to.equal(contractOwner);
    });

    it('Create a donor account and retrieve it', async function () {
      // Set the donors & distributor balances to zero
      //await this.donationManager.transfer(accounts[5], eth10.toString(), { from: donorA });
      // Store a value
      await this.contract.createDonor("DonorA", {from: donorA } );

      const donor = await this.contract.allDonors.call(0);
      // Test if the returned value is the same one
      const startbalA = await web3.eth.getBalance(donorA);
      console.log ('Donor A ', donorA);
      console.log ('Donor A Start balance ', web3.utils.fromWei(startbalA.toString(),'ether'));
      expect((await this.contract.donorCount()).toString()).to.equal('1');
      //expect((await this.donationManager.donorBalances(donorA)).toString()).to.equal('0');
      expect(donor.donorName.toString()).to.equal('DonorA');
    });

  });

*/

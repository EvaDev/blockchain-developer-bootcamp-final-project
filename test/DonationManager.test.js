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
      const eth01  = 1e16;
      const oneETH = new BN(1);
      const toBN = web3.utils.toBN;
      const eth10String = 10e18.toString();

      // Set up some test data
      before(async () => {
        donationManager = await DonationManager.new({ from: contractOwner });
        const startbalA   = await web3.eth.getBalance(donorA);
        console.log ('Donor A Start balance ', web3.utils.fromWei(startbalA.toString(),'ether'));
        await donationManager.createDonor( "DonorA"  , { from: donorA } );
        await donationManager.createDistributor("DistributorX", "South Africa", {from: distributorX } );
        await donationManager.createDonation("Donation A1",0, toBN(eth01), 5, {from: donorA } );
        await donationManager.makeDonation( toBN(eth10), 0, 0, {from: donorA } );
        await donationManager.createDistribution(0, 0, 500, 1, true, {from: distributorX } );
      });

      it('Check the donor A account ', async function () {
        const donorStruct = await donationManager.allDonors.call(0,{ from: donorA });
        console.log ('Donor A account ', donorStruct.donorAddress);
        expect(donorStruct.donorName.toString()).to.equal('DonorA');
      });

      it('Check the donor count ', async function () {
        expect((await donationManager.donorCount()).toString()).to.equal('1');
      });

      it('Check  Distributor X account ', async function () {
        const distributorStruct = await donationManager.allDistributors.call(0,{from: distributorX });
        const distributorbal = await web3.eth.getBalance(distributorX);
        console.log ('Distributor X Start balance ', web3.utils.fromWei(distributorbal.toString(),'ether'));
        console.log ('Distributor X account ', distributorStruct.distributorAddress);
        expect(distributorStruct.distributorName.toString()).to.equal('DistributorX');
      });

      it('Check  Distributor count ', async function () {
        expect((await donationManager.distributorCount()).toString()).to.equal('1');
      });

      it('Check Donation A1 exists and funding = 10 Eth', async function () {
        const donorStruct = await donationManager.allDonors.call(0,{ from: donorA });
        const donationStruct = await donationManager.donations.call(0);
        console.log ('Donation A1 Start amount ', web3.utils.fromWei(donationStruct.donationAmount.toString(),'ether'));
        //console.log ('Donation A1 USD/Recipient/Month ', donationStruct.USDperRecipientPerMonth.toString());
        expect(donationStruct.USDperRecipientPerMonth.toString()).to.equal('10000000000000000');
        expect(donationStruct.donationName.toString()).to.equal('Donation A1');
        expect(donorStruct.amountDonated.toString()).to.equal('10000000000000000000');
        expect(donationStruct.donationAmount.toString()).to.equal('10000000000000000000');
      });

      it('Check  Distribution X1 A1 ', async function () {
        const distributionStruct = await donationManager.distributions.call(0,{from: distributorX });
        //console.log ('Distribution X1 A1 ', distributionStruct);
        expect((await donationManager.distributionCount()).toString()).to.equal('1');
        //expect((await this.donationManager.donorBalances(donorA)).toString()).to.equal('0');
        expect(distributionStruct.distributionAmount.toString()).to.equal('5000000000000000000');
      });

      it('Check Donor B cannot donate to donation of DonorA', async function () {
        await expectRevert.unspecified(
          donationManager.makeDonation( toBN(eth10), 0, 0, {from: donorB } ), '');
          //'This function is restricted to donors.');
      });

    //   it('Approve Transfer to distributor ', async function () {
    //     const distributionStruct = await donationManager.distributions.call(0,{from: distributorX });
    //     //const approveFunds = await donationManager.approve(contractOwner,  oneETH ,{from: donorA });
    //     const approveFunds = await donationManager.approve(donorA,  oneETH ,{from: contractOwner });
    //     //const approveFunds = await donationManager.approve.call(contractOwner,  distributionStruct.distributionAmount ,{from: donorA });
    //     expectEvent(approveFunds, 'Approval', {
    //       owner: contractOwner,
    //       spender: donorA,
    //       value: oneETH
    //     });
    // });
    //   it('Send Funds Transfer to distributor ', async function () {
    //     const distributionStruct = await donationManager.distributions.call(0,{from: distributorX });
    //     //const oneETH = new BN(1/10);
    //     console.log('transfer ' + distributionStruct.distributionAmount + ' _ ' + donorA.balance);  
    //     //const sentFunds = await distributorX.transfer(distributionStruct.distributionAmount ,{from: donorA });
    //     const sentFromFunds = await donationManager.transferFrom(donorA, distributorX, oneETH ,{from: donorA });
    //     //const sentFunds = await donationManager.transferFrom(donorA, contractOwner, oneETH ,{from: donorA });
    //     //const sentFunds = await donationManager.transferFrom(donorA, contractOwner, distributionStruct.distributionAmount,{from: donorA });
    //     expectEvent(sentFunds, 'Transfer', {
    //         from: donorA,
    //         to: distributorX,
    //         value: oneETH //this.value,
    //       });
    //   });
        
    });

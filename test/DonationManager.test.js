const { expect } = require('chai');
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { accounts } = require('@openzeppelin/test-environment');
// Load compiled artifacts
const DonationManager = artifacts.require('DonationManager');

// Start test block
contract('DonationManager', function (accounts) {

  const [contractOwner, donorA, distributorX] = accounts;

  beforeEach(async function () {
    // Deploy a new DonationManager contract for each test
    this.donationManager = await DonationManager.new();
  });

  // Test case one
  it('Create a donor account and retrieve it', async function () {
    // Store a value
    await this.donationManager.createDonor("DonorA",{from: accounts[1] } );

    const donor = await this.donationManager.allDonors.call(0);
    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.donationManager.donorCount()).toString()).to.equal('1');
    //expect((await this.donationManager.donorBalances(donorA)).toString()).to.equal('0');
    expect(donor.donorName.toString()).to.equal('DonorA');
  });

  /*describe('Test donorDeposit() method', () => {
    it('donorDeposit reverted no eth sent', async () => {
      const amount = ethers.utils.parseEther('0');
      await expect(
        vendorContract.connect(addr1).buyTokens({
          value: amount,
        }),
      ).to.be.revertedWith('Send ETH to buy some tokens');
    });
    */
});

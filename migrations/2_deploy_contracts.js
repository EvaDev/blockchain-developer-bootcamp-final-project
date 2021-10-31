const DonationManager = artifacts.require("./DonationManager.sol");

module.exports = function (deployer) {
  deployer.deploy(DonationManager);
};

const Migrations = artifacts.require("DonationManager");

module.exports = function (deployer) {
  deployer.deploy(DonationManager);
};

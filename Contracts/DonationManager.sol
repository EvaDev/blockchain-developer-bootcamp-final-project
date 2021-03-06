// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

/// @title A contract for managing donations and distribution of donated funds
/// @author Sean Evans Nov 2021
/// @notice This contract is meant for the Consensys academoy final project

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

//contract DonationManager is Initializable, ERC20Upgradeable, PausableUpgradeable, OwnableUpgradeable, ERC20PermitUpgradeable {
contract DonationManager is ERC20, Pausable, Ownable {

    enum DonationState      { DonationCreated, Funded, Distributing }
    enum DonationPurpose    { FoodTokens, Hospital, Disaster }
    enum DistributorStatus  { New, unTrusted, Trusted }
    enum DistributionState  { DistributionCreated, FundsRequested, FundsApproved , FundsNOTApproved }

    /// @dev Donor Details
    /// @notice  AmountDonated is the amount of balance ring fenced to all donations
    struct Donor {
       uint32       donorID;
       address      donorAddress;
       uint256      amountDonated;
       string       donorName;
    }

    /// @dev Organisation responsible for distributing funds to recipients
    struct  Distributor {
       uint32       distributorID;
       address      distributorAddress;
       string       distributorName;
       string       distributorCountry;
       DistributorStatus  distributorStatus;
    }

    /// @dev Currently one donor per donation but one donor can do many donations
    /// @notice donationAmount = Funds availalbe to be claimed (must be <= donor's balance)
    /// @notice donationGrantedAmount = Funds approved to distributions - possibly sent to distributor
    /// @notice requestedNotGrantedAmount = Funds requested by distributors but not granted (approved) yet - potential claims
    /// @dev A donation can have multiple distributions
    struct  Donation {
       uint32       donationID;
       uint32       donorID;
       string       donationName;
       uint256      donationAmount;
       uint256      donationGrantedAmount;
       uint256      requestedNotGrantedAmount;
       uint256      USDperRecipientPerMonth;
       uint8        adminFeePercent;
       DonationState    donationState;
       DonationPurpose  donationPurpose;
    }
    //uint32[]         distributionIDs;

    /// @dev distributionAmount = USD per person * recipientCountr * distributionMonths
    /// @notice Number of recipients with trusted details; New distributors max 1000 recipients or USD 50k
    /// @notice Number of months to run the distribution; for example New distributors can only run 1 month
    /// @dev recipientDetailsAreValid is not properly implemented yet: possibly check against IPFS link to unmodifiable list of trusted recipients
    struct  Distribution {
       uint32       distributionID;
       uint32       distributorID;
       uint32       donationID;
       uint32       donorID;
       uint256      distributionAmount;
       uint32       recipientCount;
       uint8        distributionMonths;
       bool         recipientDetailsAreValid;
       DistributionState  distributionState;
    }

    /// @dev Donors
    uint32 public donorCount;
    mapping (uint32 => Donor )   public allDonors;
    mapping (address => uint256) public donorBalances;
    event LogDonorAdded(address indexed donorAddress, uint32 donorID, uint256 balance);
    event LogDonorDeposit(address indexed donorAddress, uint256 donationAmount);
    event LogDonorWithdrawal(address indexed donorAddress, uint256 withdrawAmount, uint256 remainingBalance);
    event LogSender(address senderAddr, uint256 senderBal);

    /// @dev Distributors
    uint32 public distributorCount;
    mapping (uint32 => Distributor ) public allDistributors;
    mapping (address => uint256)     internal distributorBalances;
    event LogDistributorStatus(address indexed distributorAddress, uint32 distributorID,  string distributorName, DistributorStatus distributorStatus);
    event LogDistributorWithdrawal(address indexed donorAddress, uint256 withdrawAmount, uint256 remainingBalance);

    /// @dev Donations
    uint32 public donationCount;
    /// @dev Using arrays rather than mappings where I need to iterate over the contents
    Donation[] public donations;
    event LogDonationState(uint32 donationID, string donationName, DonationState);

    /// @dev Disrtibutions
    uint32 public distributionCount;
    Distribution[] public distributions;
    event LogDistributionState(uint32 distributionID, string distributorName, string donationName, DistributionState);
    event LogDistributionRequest(uint32 distributionID, string distributorName, uint256 donationAmount);

    modifier isDonor() {
        require(donorBalances[msg.sender] >= 0, "This function is restricted to donors." );
        _;
    }

    /// @dev A distributor cannot become a donor
    /// @dev A donor can only be added once
    modifier onlyDonor() {
        require(distributorBalances[msg.sender] == 0 , "cannot be called by distributors." );
        require(donorBalances[msg.sender] == 0 , "cannot create another donor for this account." );
        _;
    }

    /// @dev A donor cannot become a distributor
    modifier onlyDistributor() {
        require(donorBalances[msg.sender] == 0 , "cannot be called by donors." );
        _;
    }

    modifier isDistributor() {
        require(distributorBalances[msg.sender] >= 0, "This function is restricted to distributors." );
        _;
    }

    /// @dev We can proceed with distributing funds after these checks
    /// @dev If the distributorStatus is new they cannot request funding for more than 1000 recipients
    /// @dev The donation must have sufficient funds for the distribution
    /// @dev The distribution list must be valid (outside the scope of this project)
    modifier distributionCanProceed(uint32 _distributionID, uint32 _donorID) {
        require(distributions[_distributionID].distributionAmount >= 0 , "Distribution cannot proceed - Distribution amount is <= 0");
        require(distributions[_distributionID].recipientDetailsAreValid , "Distribution cannot proceed - Distribution list is invlid");
        require(distributions[_distributionID].donorID == _donorID , "Distribution cannot proceed - Distribution is not for this donor");
        require(distributions[_distributionID].distributionState == DistributionState.FundsRequested, "Distribution cannot proceed status is not funds requested");
        require(allDistributors[distributions[_distributionID].distributorID].distributorStatus != DistributorStatus.unTrusted, "Distribution cannot proceed - Distributor untrusted");
        require(donations[distributions[_distributionID].donationID].requestedNotGrantedAmount >= distributions[_distributionID].distributionAmount , "Distribution cannot proceed");
        //require(donorBalances[msg.sender] >= distributions[_distributionID].distributionAmount , "Distribution cannot proceed - insufficient funds");
        _;
    }

    modifier distributorStatusCanChange(uint32 _distributorID) {
        require(allDistributors[_distributorID].distributorStatus != DistributorStatus.unTrusted, "Distribution cannot proceed - Distributor untrusted");
        _;
    }

    modifier distributionsAreUpToDate(uint32 _donorID) {
        for (uint32 i = 0; i < distributions.length; i++) {
            require((distributions[i].donorID == _donorID && distributions[i].distributionState  == DistributionState.FundsRequested), "First Approve or deny open distributions.");
        }
        _;
    }

    modifier donationIsFunded(uint32 _donationID) {
        require((donations[_donationID].donationState == DonationState.Funded || donations[_donationID].donationState == DonationState.Distributing),
        "Distribution cannot proceed until donation is funded.");
        _;
    }

    constructor() ERC20("", "") {
        donorCount = 0;
        distributorCount = 0;
        donationCount = 0;
        distributionCount = 0;
    }

    /// @dev Create a new donor - It connot come from the same address as an exiting distributor
    /// @dev amount donated is just a running balance, not an actual account balance
    function createDonor(string memory _donorName) public onlyDonor returns( bool ) {
        allDonors[donorCount] = Donor( {
            donorID         : donorCount,
            donorAddress    : payable(msg.sender),
            amountDonated   : 0,
            donorName       : _donorName
        });
        //donorBalances[msg.sender] = 0;
        // Set donor balance to amount in donor's account
        donorBalances[msg.sender] = msg.sender.balance;
        emit LogDonorAdded(msg.sender, donorCount, msg.sender.balance);
        donorCount = donorCount + 1;
        return true;
    }

    /// @dev Create a new distributor - It connot come from the same address as an exiting donor
    function createDistributor(string memory _distributorName, string memory _distributorCountry)
        public onlyDistributor returns ( bool ) {
        allDistributors[distributorCount] = Distributor( {
            distributorID       : distributorCount,
            distributorAddress  : payable(msg.sender),
            distributorName     : _distributorName,
            distributorCountry  : _distributorCountry,
            distributorStatus   : DistributorStatus.New
        });
        /// @notice  Set the distributor's balance to
        distributorBalances[msg.sender] = msg.sender.balance;
        emit LogDistributorStatus(msg.sender, distributorCount, _distributorName, DistributorStatus.New);
        distributorCount = distributorCount + 1;
        return true;
    }

    /// @dev Create a new Donation. It can only be created by donors
    function createDonation(string memory _donationName, uint32  _donorID,
        uint256  _USDperRecipientPerMonth, uint8  _adminFeePercent)
        public isDonor returns ( bool ) {

        Donation memory currentDonation;

        currentDonation.donationID                  = donationCount;
        currentDonation.donorID                     = _donorID;
        currentDonation.donationName                = _donationName;
        currentDonation.donationAmount              = 0;
        currentDonation.donationGrantedAmount       = 0;
        currentDonation.requestedNotGrantedAmount   = 0;
        currentDonation.USDperRecipientPerMonth     = _USDperRecipientPerMonth;
        currentDonation.adminFeePercent             = _adminFeePercent;
        donations.push(currentDonation);

/*
        d.donationPurpose         = DonationPurpose.FoodTokens;
        d.donationPurpose         = DonationPurpose.FoodTokens(_donationPurpose);
*/
        emit LogDonationState(donationCount, _donationName, DonationState.DonationCreated);
        /// @notice Add this donation to the donor
        donationCount = donationCount + 1;
        return true;
    }

    // function donorDeposit(uint256 _depositAmount) public isDonor payable {
    //     donorBalances[msg.sender] += _depositAmount;
    //     require(msg.value > _depositAmount, "Insufficient funds");
    //     (bool sent,) = msg.sender.call{value: _depositAmount}("");
    //     require(sent, "Failed to deposit funds to the donor");
    //     emit LogDonorDeposit(msg.sender, _depositAmount);
    // }

    /// @dev Allow the donor to ring fence funds for a donation. No actual transfer of funds.
    function makeDonation(uint256 _donationAmount, uint32 _donationID, uint32 _donorID) public isDonor  {
      require((msg.sender.balance - allDonors[_donationID].amountDonated) >= _donationAmount, "Donation amount exceeds donor available balance");
      require(donations[_donationID].donorID  == _donorID, "Donation does not belong to this donor");
      uint32 donorID = donations[_donationID].donorID;
      allDonors[donorID].amountDonated += _donationAmount;
      donations[_donationID].donationAmount += _donationAmount;
      donations[_donationID].donationState = DonationState.Funded;
      emit LogDonationState(_donationID, donations[_donationID].donationName, DonationState.Funded);
    }

    /// @dev Allow the donor to change the status of the distributor to either trusted or untrusted.
    /// @dev Once set to untrusted it cannot be altered.
    function changeDistributorStatus(uint32 _distributorID, uint32 _distributorStatus)
            public isDonor distributorStatusCanChange(_distributorID) {
      DistributorStatus newDistributorStatus = DistributorStatus(_distributorStatus);
      allDistributors[_distributorID].distributorStatus = newDistributorStatus;
      emit LogDistributorStatus(msg.sender, _distributorID,
                                allDistributors[_distributorID].distributorName,
                                DistributorStatus(_distributorStatus));
    }

    /// @dev Get the balances of a specific donation : Used by the distributor to check what funds are available
    /// @return donatedAmount
    /// @return grantedAmount Distributed Amount - funds actually sent to distributor
    /// @return requestedNotGranted Requested amount but not approved
    function getDonationBalance(uint32 _donationID)
      public view returns (uint256 donatedAmount, uint256 grantedAmount, uint256 requestedNotGranted) {
      return (donations[_donationID].donationAmount, donations[_donationID].donationGrantedAmount, donations[_donationID].requestedNotGrantedAmount);
    }

    /// @dev Get the balances of the donor ; i.e. all summarise all donations made by this donor
    /// @return donatedAmount  Total Donated Amount
    /// @return grantedAmount Distributed Amount - funds actually sent to distributor
    /// @return requestedNotGranted Requested amount but not approved
    /// @return fundsAvailableToWithdraw Funds available to withdraw
    function getAllDonorBalances(uint32 _donorID)  public isDonor view
        returns (uint256 donatedAmount, uint256 grantedAmount, uint256 requestedNotGranted,
        uint256 fundsAvailableToWithdraw) {
      uint256  _donatedAmount = 0;
      uint256  _grantedAmount = 0;
      uint256  _requestedNotGranted = 0;
      uint256  _fundsAvailableToWithdraw = 0;
      //uint256  _fundsAvailableToWithdraw = msg.sender.balance;   // For some reason giving very high balances???
      //uint256  _fundsAvailableToWithdraw = address(this).balance;

      for (uint32 i = 0; i < donations.length; i++) {
            if (donations[i].donorID == _donorID) {
                _donatedAmount += donations[i].donationAmount;
                _grantedAmount += donations[i].donationGrantedAmount;
                _requestedNotGranted += donations[i].requestedNotGrantedAmount;
                _fundsAvailableToWithdraw =  allDonors[i].donorAddress.balance;
            }
      }
      return (_donatedAmount,_grantedAmount,_requestedNotGranted,_fundsAvailableToWithdraw );
    }

    /// @dev Get the balances of the ddistributor across all distributions
    // function getDistributorBalance() public isDistributor view returns (uint256 availbleToWithdraw) {
    //   return (distributorBalances[msg.sender]);
    // }

    /// @dev Create a new distribution - It cannot come from an exiting donor
    /// @notice Requires that The donor list is verified - verification of lists to happen outside on IPFS - not implemented
    function createDistribution(uint32 _distributorID, uint32 _donationID, uint32 _recipientCount, uint8 _distributionMonths,
                                bool _recipientDetailsAreValid)
                                public isDistributor donationIsFunded(_donationID) returns( bool ) {

        uint256  distributionClaim = _recipientCount * _distributionMonths * donations[_donationID].USDperRecipientPerMonth;
        uint256  availableToClaim  = donations[_donationID].donationAmount -
                                (donations[_donationID].donationGrantedAmount + donations[_donationID].requestedNotGrantedAmount);
        require( availableToClaim >= distributionClaim, "This donation has insufficient funds to distribute." );

        Distribution memory currentDistribution;
            currentDistribution.distributionID          = distributionCount;
            currentDistribution.distributorID           = _distributorID;
            currentDistribution.donationID              = _donationID;
            currentDistribution.donorID                 = donations[_donationID].donorID;
            currentDistribution.distributionAmount      = distributionClaim;
            currentDistribution.recipientCount          = _recipientCount;
            currentDistribution.distributionMonths      = _distributionMonths;
            currentDistribution.recipientDetailsAreValid  = _recipientDetailsAreValid;
            //currentDistribution.distributionState       = DistributionState.DistributionCreated;
            distributions.push(currentDistribution);

        emit LogDistributionState(distributionCount, allDistributors[_distributorID].distributorName,
                                  donations[_donationID].donationName, DistributionState.DistributionCreated);

        /// @notice Now make a claim against the Donation
        donations[_donationID].requestedNotGrantedAmount += distributionClaim;
        distributions[distributionCount].distributionState = DistributionState.FundsRequested;
        emit LogDistributionState(distributionCount, allDistributors[_distributorID].distributorName,
                                  donations[_donationID].donationName, DistributionState.FundsRequested);
        distributionCount = distributionCount + 1;
        return true;
    }

    /// @dev send funds to a Distributor if the conditions are met
    /// @notice if successful Update the amount granted on the donation and reduce the amount requested
    function approveFunds(uint32 _distributionID, uint32 _donorID) public returns ( bool ){

      address donorAddr = (allDonors[_donorID].donorAddress);
      uint256 distrAmt  = distributions[_distributionID].distributionAmount;
      require((distrAmt > 0 ), "Distribution amount cannot be negative");
      require((distrAmt < donorAddr.balance ), "Insufficient Donor Funds");

      donations[_donorID].donationGrantedAmount += distrAmt;
      donations[_donorID].requestedNotGrantedAmount -= distrAmt;
      distributions[_distributionID].distributionState = DistributionState.FundsApproved;
      //(bool approved ) = approve( owner() ,distrAmt);
      emit LogSender( address(this) ,  distrAmt );
      (bool approved ) = approve( address(this) ,distrAmt);
      require(approved, "Failed to approve funds transfer to the distributor");
      return approved;
    }

    function giveFunds(uint32 _distributionID, uint32 _donorID ) 
                public isDonor returns( bool ){
    // function giveFunds(uint32 _distributionID, uint32 _donorID, address payable recipient )
    //             public payable isDonor distributionCanProceed(_distributionID, _donorID) returns( bool ){

      //address distAddr  = (allDistributors[distributions[_distributionID].distributorID].distributorAddress);
      address donorAddr = (allDonors[_donorID].donorAddress);
      uint256 distrAmt  = distributions[_distributionID].distributionAmount;
      require((distrAmt > 0 ), "Distribution amount cannot be negative");
      require((msg.sender == donorAddr ), "Sender is not the Donor ");
      require((distrAmt < msg.sender.balance ), "Insufficient Funds");

      donations[_donorID].donationGrantedAmount += distrAmt;
      donations[_donorID].requestedNotGrantedAmount -= distrAmt;
      distributions[_distributionID].distributionState = DistributionState.FundsApproved;
      donorBalances[allDonors[_donorID].donorAddress] -=  distrAmt;

      emit LogSender( msg.sender ,  distrAmt );
      //(bool sent ) = transferFrom( donorAddr, recipient, distrAmt);
      //(bool sent ,) = recipient.call{value: distrAmt}("");

      emit LogDistributionState(_distributionID, allDistributors[distributions[_distributionID].distributorID].distributorName,
                                 donations[distributions[_distributionID].donationID].donationName,
                                 DistributionState.FundsApproved);
      emit LogDonationState(distributions[_distributionID].donationID,
                            donations[distributions[_distributionID].donationID].donationName,
                            DonationState.Distributing);

      return true;
    }

    /// @dev Allow the donor to withdraw funds balance provided there are no distributions that have submitted funding requests
    function donorWithdrawal(uint256 _withdrawAmount, uint32 _donorID) public payable isDonor distributionsAreUpToDate (_donorID) {
      require(msg.sender.balance >= _withdrawAmount, "Withdrawal request exceeds donor balance");
      //donorBalances[msg.sender] -= _withdrawAmount;
      emit LogDonorWithdrawal(msg.sender, _withdrawAmount, (msg.sender.balance - _withdrawAmount));
      //payable(msg.sender).transfer(_withdrawAmount);
      (bool sent,) = msg.sender.call{value: _withdrawAmount}("");
      require(sent, "Failed to withdraw funds to the donor");
    }

    /// @dev Allow the distributor to withdraw funds balance
    function distributorWithdrawal(uint _withdrawAmount) public payable isDistributor  {
      require(msg.sender.balance >= _withdrawAmount, "Withdrawal request exceeds balance");
      //distributorBalances[msg.sender] -= _withdrawAmount;
      emit LogDistributorWithdrawal(msg.sender, _withdrawAmount, (msg.sender.balance - _withdrawAmount));
      //payable(msg.sender).transfer(withdrawAmount);
      (bool sent,) = msg.sender.call{value: _withdrawAmount}("");
      require(sent, "Failed to withdraw funds to the donor");
    }

/*    function initialize() initializer public {
        __ERC20_init("MyToken", "MTK");
        __Pausable_init();
        __Ownable_init();
        __ERC20Permit_init("MyToken");
    }
*/
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

}

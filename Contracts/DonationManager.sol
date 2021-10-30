// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

/// @title A contract for managing donations and distribution of donated funds
/// @author Sean Evans Nov 2021
/// @notice This contract is meant for the Consensys academoy final project
/// @dev

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract DonationManager is Initializable, ERC20Upgradeable, PausableUpgradeable, OwnableUpgradeable, ERC20PermitUpgradeable {

    enum DonationState      { DonationCreated, Funded, Distributing, DonationClosed }
    enum DonationPurpose    { FoodTokens, Hospital, Disaster , Covid, NotSpecified }
    enum DistributorStatus  { New, unTrusted, Trusted }
    enum DistributionState  { DistributionCreated, FundsRequested, FundsApproved , FundsNOTApproved, DistributionClosed }
    enum DistributionMethod { FundsToRecipient, FundsToDistributor, FundsToOriganisation, TokenToRecipient, TokenToRetailer }

    struct Donor {
       uint32       donorID;                        /// @dev Donor Details
       address      donorAddress;                   /// @dev Donor Depositor Wallet
       uint256      amountDonated;                  /// @dev Amount of balance ring fenced to donations
       string       donorName;                      /// @dev Donor Name
    }

    struct  Distributor {
       uint32       distributorID;                  /// @dev Org responsible for distributing funds to recipients
       address      distributorAddress;             /// @dev Can transfer funds to a distributor from a donation
       string       distributorName;                /// @dev Distributor Name
       string       distributorCountry;             /// @dev Distributor Country
       DistributorStatus  distributorStatus;        /// @dev Status of the Distributor
    }

    struct  Donation {
       uint32       donationID;                     /// @dev Identifier for this Donation
       uint32       donorID;                        /// @dev Donor : Currently one donor per donation (Donors full balance is available to this donation)
       string       donationName;                   /// @dev Donation Name
       uint256      donationAmount;                 /// @dev Funds availalbe to be claimed (must be <= donor's balance)
       uint256      donationGrantedAmount;          /// @dev Funds approved to distributions - possibly sent to distributor
       uint256      requestedNotGrantedAmount;      /// @dev Funds requested by distributors but not granted (approved) yet - potential claims
       uint32       USDperRecipientPerMonth;
       uint8        adminFeePercent;
       DonationState    donationState;
       DonationPurpose  donationPurpose;
       uint32[]         distributionIDs;            /// @dev A donation can have multiple distributions
    }

    struct  Distribution {
       uint32       distributionID;                 /// @dev Identifiier for this distribution
       uint32       distributorID;                  /// @dev Org responsible for distributing funds to recipients
       uint32       donationID;                     /// @dev Donation record
       uint32       donorID;                        /// @dev Donor providing the funds
       uint256      distributionAmount;             /// @dev USD per person * recipientCountr * distributionMonths
       uint32       recipientCount;                 /// @dev Number of recipients with trusted details; New distributors max 1000 recipients or USD 50k
       uint8        distributionMonths;             /// @dev Number of months to run the distribution; New distributors can only run 1 month
       bool         recipientDetailsAreValid;       /// @dev Not implemented : check against IPFS link to unmodifiable list of trusted recipients
       DistributionState  distributionState;
       DistributionMethod distributionMethod;
    }

    /// @dev Donors
    uint32 public donorCount;
    mapping (uint32 => Donor )   public allDonors;
    mapping (address => uint256) public donorBalances;    // Donation Balances
    event LogDonorAdded(address indexed donorAddress, uint32 donorID);
    event LogDonorDeposit(address indexed donorAddress, uint256 donationAmount);
    event LogDonorWithdrawal(address indexed donorAddress, uint256 withdrawAmount, uint256 remainingBalance);

    /// @dev Distributors
    uint32 public distributorCount;
    mapping (uint32 => Distributor ) public allDistributors;
    mapping (address => uint256)     public distributorBalances;    // Distributor Balances
    event LogDistributorStatus(address indexed distributorAddress, uint32 distributorID,  string distributorName, string distributorStatus);
    event LogDistributorWithdrawal(address indexed donorAddress, uint256 withdrawAmount, uint256 remainingBalance);

    /// @dev Donations
    uint32 public donationCount;
    //mapping (uint32 => Donation )   public allDonations;
    // Note to self : Using arrays rather than mappings where I need to iterate over contents
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
    modifier onlyDonor() {
        require(distributorBalances[msg.sender] == 0 , "cannot be called by distributors." );
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
    modifier distributionCanProceed(uint32 _distributionID) {
        require(distributions[_distributionID].distributionAmount >= 0 , "Distribution cannot proceed - Distribution amount is <= 0");
        require(distributions[_distributionID].recipientDetailsAreValid , "Distribution cannot proceed - Distribution list is invlid");
        require(distributions[_distributionID].distributionState == DistributionState.FundsRequested, "Distribution cannot proceed status is not funds requested");
        require(allDistributors[distributions[_distributionID].distributorID].distributorStatus != DistributorStatus.unTrusted, "Distribution cannot proceed - Distributor untrusted");
        require(donations[distributions[_distributionID].donationID].requestedNotGrantedAmount >= distributions[_distributionID].distributionAmount , "Distribution cannot proceed");
        require(donorBalances[msg.sender] >= distributions[_distributionID].distributionAmount , "Distribution cannot proceed - insufficient funds");
        _;
    }

    modifier distributionsAreUpToDate(uint32 _donorID) {
        for (uint32 i = 0; i < distributions.length; i++) {
            require((distributions[i].donorID == _donorID && distributions[i].distributionState  == DistributionState.FundsRequested), "First Approve or deny open distributions.");
        }
        _;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {
        donorCount = 0;
        distributorCount = 0;
        donationCount = 0;
        distributionCount = 0;
    }

    /// @dev Create a new distributor - It connot come from the same address as an exiting distributor
    function createDonor(string memory _donorName)  public onlyDonor returns( bool ) {
        allDonors[donorCount] = Donor( {
            donorID     : donorCount,
            donorAddress:  payable(msg.sender),
            amountDonated : 0,
            donorName   : _donorName   //, donationIDs : []
        });
        donorBalances[msg.sender] = 0;
        emit LogDonorAdded(msg.sender, donorCount);
        donorCount = donorCount + 1;
        return true;
    }

    /// @dev Create a new distributor - It connot come from the same address as an exiting donor
    function createDistributor(string memory _distributorName, string memory _distributorCountry)
        public onlyDistributor returns ( bool ) {
        allDistributors[distributorCount] = Distributor( {
            distributorID   : distributorCount,
            distributorAddress  : payable(msg.sender),
            distributorName: _distributorName,
            distributorCountry: _distributorCountry,
            distributorStatus: DistributorStatus.New  //,distributionIDs : []
        });
        // Set the donation balance to
        distributorBalances[msg.sender] = 0;
        emit LogDistributorStatus(msg.sender, distributorCount, _distributorName, "New");
        distributorCount = distributorCount + 1;
        return true;
    }

    /// @dev Create a new Donation. It can only be created by donors
    function createDonation(string memory _donationName, uint32  _donorID,
        uint32  _USDperRecipientPerMonth, uint8  _adminFeePercent, uint32 _donationPurpose)
        public isDonor returns ( bool ) {
        // Create a new donation
        Donation storage d = donations[donationCount];
        d.donorID                 = _donorID;
        d.donationName            = _donationName;
        d.donationAmount          = 0;
        d.donationGrantedAmount   = 0;
        d.requestedNotGrantedAmount = 0;
        d.USDperRecipientPerMonth = _USDperRecipientPerMonth;
        d.adminFeePercent         = _adminFeePercent;
        d.donationState           = DonationState.DonationCreated;
        d.donationPurpose         = DonationPurpose(_donationPurpose);

        /// @notice Add this donation to the donor
        emit LogDonationState(donationCount, _donationName, DonationState.DonationCreated);
        donationCount = donationCount + 1;
        return true;
    }

    function donorDeposit(uint256 _depositAmount) public isDonor payable {
        donorBalances[msg.sender] += _depositAmount;
        (bool sent,) = msg.sender.call{value: _depositAmount}("");
        require(sent, "Failed to deposit funds to the donor");
        emit LogDonorDeposit(msg.sender, _depositAmount);
    }

    /// @dev Allow the donor to ring fence funds for a donation. No actual transfer of funds.
    function makeDonation(uint256 _donationAmount, uint32 _donationID) public isDonor  {
      require((donorBalances[msg.sender] - allDonors[_donationID].amountDonated) >= _donationAmount, "Donation amount exceeds donor available balance");
      uint32 donorID = donations[_donationID].donorID;
      allDonors[donorID].amountDonated += _donationAmount;
      donations[_donationID].donationAmount += _donationAmount;
      emit LogDonationState(_donationID, donations[_donationID].donationName, DonationState.Funded);
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
    function getDonorBalance(uint32 _donorID)  private isDonor view
        returns (uint256 donatedAmount, uint256 grantedAmount, uint256 requestedNotGranted, uint256 fundsAvailableToWithdraw) {
      uint256  _donatedAmount = 0;
      uint256  _grantedAmount = 0;
      uint256  _requestedNotGranted = 0;
      for (uint32 i = 0; i < donations.length; i++) {
            if (donations[i].donorID == _donorID) {
                _donatedAmount += _donatedAmount;
                _grantedAmount += _grantedAmount;
                _requestedNotGranted += _requestedNotGranted;
            }
      }
      return (_donatedAmount,_grantedAmount,_requestedNotGranted,donorBalances[msg.sender] );
    }

    /// @dev Create a new distribution - It connot come from an exiting donor
    function createDistribution(uint32 _distributorID, uint32 _donationID, uint32 _recipientCount, uint8 _distributionMonths,
                                bool _recipientDetailsAreValid, uint8 _distributionMethod)
                                public isDistributor  returns( bool ) {

        uint32  distributionClaim = _recipientCount * _distributionMonths * donations[_donationID].USDperRecipientPerMonth;
        uint256  availableToClaim  = donations[_donationID].donationAmount -
                                (donations[_donationID].donationGrantedAmount + donations[_donationID].requestedNotGrantedAmount);
        require( availableToClaim >= distributionClaim, "This donation has insufficient funds to distribute." );
        /// @notice Requires that The donor list is verified - verification of lists to happen outside on IPFS
        Distribution storage dist = distributions[distributionCount];

            dist.distributorID           = _distributorID;
            dist.donationID              = _donationID;
            dist.donorID                 = donations[_donationID].donorID;
            dist.distributionAmount      = distributionClaim;
            dist.recipientCount          = _recipientCount;
            dist.distributionMonths      = _distributionMonths;
            dist.recipientDetailsAreValid  = _recipientDetailsAreValid;
            dist.distributionState       = DistributionState.DistributionCreated;
            dist.distributionMethod      = DistributionMethod(_distributionMethod);

        emit LogDistributionState(distributionCount, allDistributors[_distributorID].distributorName,
                                  donations[_donationID].donationName, DistributionState(_distributionMethod));

        /// @notice Now make a claim against the Donation
        donations[_donationID].requestedNotGrantedAmount += distributionClaim;
        distributions[distributionCount].distributionState = DistributionState.FundsRequested;
        emit LogDistributionState(distributionCount, allDistributors[_distributorID].distributorName,
                                  donations[_donationID].donationName, DistributionState(_distributionMethod));
        distributionCount = distributionCount + 1;
        return true;
    }

    /// @dev send funds to a Distribution if the conditions are met
    function requestDonationFunds(uint32 _distributionID) public payable isDonor distributionCanProceed(_distributionID) {
      /// @notice Update the amount granted on the donation and reduce the amount requested
      donations[distributions[_distributionID].donationID].donationGrantedAmount += distributions[_distributionID].distributionAmount;
      donations[distributions[_distributionID].donorID].requestedNotGrantedAmount -= distributions[_distributionID].distributionAmount;
      distributions[_distributionID].distributionState = DistributionState.FundsApproved;
      emit LogDistributionState(_distributionID, allDistributors[distributions[_distributionID].distributorID].distributorName,
                                 donations[distributions[_distributionID].donationID].donationName,
                                 DistributionState.FundsApproved);
      emit LogDonationState(distributions[_distributionID].donationID,
                            donations[distributions[_distributionID].donationID].donationName,
                            DonationState.Funded);
      /// @notice Transfer funds from donor to distributor
      address distAddr = payable(allDistributors[distributions[_distributionID].distributorID].distributorAddress);
      uint256 distrAmt = distributions[_distributionID].distributionAmount;
      // Check that this is actually seding from donor to distributor
      (bool sent,) = distAddr.call{value: distrAmt}("");
      require(sent, "Failed to send funds to the distributor");
    }

    // Allow the donor to withdraw funds balance provided there are no distributions that have submitted funding requests
    function donorWithdrawal(uint256 _withdrawAmount, uint32 _donorID) public payable isDonor distributionsAreUpToDate (_donorID) {
      require(donorBalances[msg.sender] >= _withdrawAmount, "Withdrawal request exceeds donor balance");
      donorBalances[msg.sender] -= _withdrawAmount;
      emit LogDonorWithdrawal(msg.sender, _withdrawAmount, donorBalances[msg.sender]);
      //payable(msg.sender).transfer(_withdrawAmount);
      (bool sent,) = msg.sender.call{value: _withdrawAmount}("");
      require(sent, "Failed to withdraw funds to the donor");
    }

    // Allow the distributor to withdraw funds balance
    function distributorWithdrawal(uint _withdrawAmount) public payable isDistributor  {
      require(distributorBalances[msg.sender] >= _withdrawAmount, "Withdrawal request exceeds balance");
      distributorBalances[msg.sender] -= _withdrawAmount;
      emit LogDistributorWithdrawal(msg.sender, _withdrawAmount, distributorBalances[msg.sender]);
      //payable(msg.sender).transfer(withdrawAmount);
      (bool sent,) = msg.sender.call{value: _withdrawAmount}("");
      require(sent, "Failed to withdraw funds to the donor");
    }

    function initialize() initializer public {
        __ERC20_init("MyToken", "MTK");
        __Pausable_init();
        __Ownable_init();
        __ERC20Permit_init("MyToken");
    }

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
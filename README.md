Sean Evans Consensys block chain developer bootcamp final project
Nov 2021
Ethereum address : evadev.eth
email : robertseanevans@icloud.com


**Directory structure**

The Covid pandemic has shone a spotlight on the need to easily and quickly distribute donor funds to worthy / trusted recipients as food tokens. Although a multi faceted problem this project will tackle some aspects of solving the problems using block chain technology given certain simplifying assumptions.

There are 4 main concepts in the donation manager process :
A = Donors        : Have funds available and want them to go to the needy
B = Donations     : A portion of the donor funds with some metadata.
                    A donors can make multiple donations
C = Distributors  : Have on the ground connections with the needy (Also called NGO’s)
D = Distributions : Links a donation to a list of recipients and can be allocated funds of successful
                    A distributor can create multiple distributions
                    A distribution can only come from one donation

**Simplified workflow on the website**
1. Donors will
    1. register themselves
    2. create a donation with
        2.1. Amount available for distribution, and how many USD per recipient per month they are willing to fund
    3. deposit funds into the donation manager contract under the donor's address
    4. approve or deny funds to be sent to a distributor once conditions are met
    5. get their donation balances
    6. optionally withdraw any unused funds out of the donor's balance
2. Distributors  will
    1. register themselves
    2. create a distribution against a donation that has been funded
    3. request the funding from the donation for a specific distribution
    4. withdraw funds from the distributor's balance  

![Screenshot](flow.png)

**Simplifying assumptions:**
The basis of such a system is trust. This project will not definitively provide the ideal trust mechanisms necessary, but its worth describing them for completeness.

Donors need to trust that the lists of recipients are not bogus. As such a trust building mechanism could be added to this process in the form of either
1. Additional third parties (teachers, community leaders etc) that have to vet the recipient lists.
2. The NGO can only submit small lists of recipients initally; in other words the contract donation size for a new NGO is limited but can grow at a a given rate for each successful campaign completed (perhaps measured by redemption %)
3. The retailer could play a role in vetting that that the recipient that present themselves are indeed the intended recipients as per the NGO list

These additional trust mechanisms would be outside the scope of the project.

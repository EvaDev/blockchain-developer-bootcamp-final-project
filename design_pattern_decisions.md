Sean Evans Consensys block chain developer bootcamp final project
Nov 2021
Ethereum address : evadev.eth
email : robertseanevans@icloud.com

**Design Pattern Decisions**

For simplicity I wanted to keep everything in a single contract but this may cause contract size limit issues.

The main contract is ownable to allow the contract owner to pause the contract.

Different roles are created within the contract and these are enforced with modifiers
- Donors  (can create & fund Donations, Approve funds to distributors)
- Distributors (can create distributions, request funds)

A key design decision are the data structures to support these relationships
 ![Screenshot](model.png)

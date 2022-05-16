Simple interface for airdropping erc1155 token to a multiple addresses.

1. Upload your image to an ipfs service such as Pinata. Save it's path.
2. Deploy Airdrop.sol. Save it's contract address.
3. In Token1155.sol remove "XXX" with your ipfs path.
4. Deploy Token1155.sol passing to it your collection name, token id and initial quantity to be minted, airdrop contract address.
5. Run "npm start", connect your wallet, fill in all fields and click "Submit".

This app was created for a specific case, often encountered when you need to airdrop erc1155 tokens to multiple addresses with one click.

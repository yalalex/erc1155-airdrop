import React, { useState } from 'react';
import { ethers } from 'ethers';

import AirdropContract_abi from './AirdropContract_abi.json';

function App() {
  let airdropContractAddress = '0x123456789abcdefghklmnopqrstuvwxyz';

  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [errorMessage, setErrorMessage] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const [token, setToken] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [tokenID, setTokenID] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  // reload the page to avoid any errors with chain change mid use of application
  const chainChangedHandler = () => {
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      airdropContractAddress,
      AirdropContract_abi,
      tempSigner
    );
    setContract(tempContract);
  };

  const sendTokens = (e) => {
    e.preventDefault();
    const recipientsArray = recipients.split(',');
    contract.AirdropERC1155(token, recipientsArray, tokenID, 1);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h4>Connect your wallet to start:</h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div>
        <h3>Your address: {defaultAccount}</h3>
      </div>
      <form onSubmit={sendTokens}>
        <label>
          Token address:
          <input
            type='text'
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
            }}
          />
        </label>
        <div>
          <label>
            Token ID:{' '}
            <input
              type='number'
              value={tokenID}
              onChange={(e) => {
                setTokenID(e.target.value);
              }}
            />
          </label>
        </div>
        <label>
          Recipients:
          <div>
            <textarea
              type='textarea'
              value={recipients}
              onChange={(e) => {
                setRecipients(e.target.value);
              }}
            />
          </div>
        </label>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default App;

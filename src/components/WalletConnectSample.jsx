import React, { useState } from "react";
import { ethers } from "ethers";

function WalletConnectSample() {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        const signer = provider.getSigner();
        const connectedAddress = await signer.getAddress();
        setAddress(connectedAddress);

        const balance = await provider.getBalance(connectedAddress);
        setBalance(ethers.utils.formatEther(balance));

      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.error("Metamask not detected");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {provider ? (
          <div>
            <p>{address}</p>
            {/* <p>Balance: {balance} ETH</p> */}
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="rounded-[80px] py-3 px-6 bg-[#ffffff33] hover:opacity-[0.60]"
          >
            Wallet Connect
          </button>
        )}
      </header>
    </div>
  );
}

export default WalletConnectSample;

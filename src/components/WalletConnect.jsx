"use client";
import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

function WalletConnect() {
  const [account, setAccount] = useState("");

  /* web3Modal configuration for enabling wallet access */
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "bbb7a611cd754fd8ae46791c31c6e26b",
          },
        },
      },
    });
    return web3Modal;
  }

  /* the connect function uses web3 modal to connect to the user's wallet */
  async function connect() {
    try {
      const web3Modal = await getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const accounts = await provider.listAccounts();
      const network = await provider.getNetwork();
      console.log("nettwork ==> ", network )
      setAccount(accounts[0]);
      localStorage.setItem("isWalletConnected", "true");
    } catch (err) {
      console.log("error:", err);
    }
  }

  return (
    <div>
      <div className="header">
        {!account && (
          <div className="accountInfo">
            <button
              onClick={connect}
              className="rounded-[80px] py-3 px-6 bg-[#ffffff33] hover:opacity-[0.60]"
            >
              Wallet Connect
            </button>
          </div>
        )}
        {account && <p className="accountInfo">{account}</p>}
      </div>
    </div>
  );
}

export default WalletConnect;

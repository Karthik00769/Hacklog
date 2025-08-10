// src/components/HacklogIntegration.jsx
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import HacklogABI from "../abis/Hacklog.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_HACKLOG_ADDRESS;
const FUJI_CHAIN_ID = Number(process.env.REACT_APP_CHAIN_ID || 43113);

export default function HacklogIntegration() {
  const [provider, setProvider] = useState(null); // ethers provider
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [status, setStatus] = useState("");

  // connect wallet
  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: true,
      });
      const instance = await web3Modal.connect();
      const prov = new ethers.providers.Web3Provider(instance);
      const signer = prov.getSigner();
      const addr = await signer.getAddress();
      const network = await prov.getNetwork();
      if (network.chainId !== FUJI_CHAIN_ID) {
        setStatus(`Please switch your wallet to Avalanche Fuji (chainId ${FUJI_CHAIN_ID}).`);
      } else {
        setStatus("Connected to Fuji");
      }
      setProvider(prov);
      setSigner(signer);
      setAccount(addr);
      const c = new ethers.Contract(CONTRACT_ADDRESS, HacklogABI, signer);
      setContract(c);
    } catch (err) {
      console.error(err);
      setStatus("Wallet connect failed");
    }
  };

  // fetch owned tokens (uses ERC721Enumerable functions)
  const fetchOwnedTokens = async () => {
    if (!contract || !account) return;
    try {
      const bal = await contract.balanceOf(account);
      const b = bal.toNumber();
      setBalance(b);
      const myTokens = [];
      for (let i = 0; i < b; i++) {
        // tokenOfOwnerByIndex(owner, index)
        const tokenId = await contract.tokenOfOwnerByIndex(account, i);
        const id = tokenId.toString();
        // tokenURI(tokenId)
        const uri = await contract.tokenURI(tokenId);
        myTokens.push({ tokenId: id, tokenURI: uri });
      }
      setTokens(myTokens);
    } catch (err) {
      console.error("fetchOwnedTokens error:", err);
      setStatus("Failed to fetch tokens");
    }
  };

  // Example read-only: fetch totalSupply and show first N tokens' URIs
  const fetchAllTokensSample = async () => {
    if (!contract) return;
    try {
      const total = await contract.totalSupply();
      const n = total.toNumber();
      const list = [];
      const MAX = Math.min(n, 20); // limit to 20 for safety
      for (let i = 0; i < MAX; i++) {
        const tokenId = await contract.tokenByIndex(i);
        const uri = await contract.tokenURI(tokenId);
        list.push({ tokenId: tokenId.toString(), tokenURI: uri });
      }
      console.log({ totalSupply: n, sample: list });
    } catch (err) {
      console.warn("could not read totalSupply or tokenByIndex:", err);
    }
  };

  // Optional mint function (owner-only on the contract). Requires connected signer to be owner.
  const mint = async (to, uri) => {
    if (!contract) {
      setStatus("Connect wallet first");
      return;
    }
    try {
      setStatus("Sending mint transaction...");
      const tx = await contract.safeMint(to, uri);
      await tx.wait();
      setStatus("Mint successful");
      await fetchOwnedTokens();
    } catch (err) {
      console.error("mint error:", err);
      setStatus("Mint failed: " + (err?.message || err));
    }
  };

  useEffect(() => {
    if (contract && account) {
      fetchOwnedTokens();
      fetchAllTokensSample();
    }
    // eslint-disable-next-line
  }, [contract, account]);

  return (
    <div style={{ padding: 20 }}>
      <h2>HackLog — Avalanche Fuji Integration</h2>
      <p>Status: {status}</p>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected: {account}</p>
          <p>Your HackLog token balance: {balance}</p>
          <h3>Your tokens</h3>
          <ul>
            {tokens.map((t) => (
              <li key={t.tokenId}>
                <strong>#{t.tokenId}</strong> — <a href={t.tokenURI} target="_blank" rel="noreferrer">Metadata</a>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 20 }}>
            <h4>Owner mint (if you are owner)</h4>
            <MintForm onMint={(to, uri) => mint(to, uri)} />
          </div>
        </div>
      )}
    </div>
  );
}

// small controlled form for minting
function MintForm({ onMint }) {
  const [to, setTo] = useState("");
  const [uri, setUri] = useState("");
  return (
    <div>
      <input placeholder="recipient address" value={to} onChange={(e) => setTo(e.target.value)} style={{ width: 400 }} />
      <br />
      <input placeholder="tokenURI (IPFS / URL)" value={uri} onChange={(e) => setUri(e.target.value)} style={{ width: 400, marginTop: 8 }} />
      <br />
      <button onClick={() => onMint(to, uri)} style={{ marginTop: 8 }}>Mint</button>
    </div>
  );
}

// https://docs.walletconnect.com/appkit/next/core/installation

// https://docs.walletconnect.com/appkit/next/core/siwe => Check this out as well, make a new project for it, since we would use it with next-auth

// https://docs.dynamic.xyz/adding-dynamic/using-wagmi => Alternative for web3modal
// https://demo.privy.io/ => Alternative for web3modal

import ConnectButton from "@/components/ConnectButton";
import ContractInteraction from "@/components/ContractInteraction";
import Hooks from "@/components/Hooks";

// https://docs.walletconnect.com/appkit/next/onboarding/socials => Check out how to perform user onboarding with email and socials accounts

// In public folder in /.well-known/walletconnect.txt we have a code for domain verification purposes for wallet connect Verify API

// https://docs.walletconnect.com/appkit/next/cloud/relay => For relay servers, unlikely we will need this? The Relay API specifically acts as a decentralized WebSocket-based messaging layer. It enables real-time communication between dApps and wallets by relaying encrypted messages through nodes in the WalletConnect network. Essentially it lets you use your project id and allow list to prevent malicious access.

// The Blockchain API is the RPC service that powers AppKit's blockchain functions such as account balances, ENS resolution, transaction history, and more.
// The Blockchain API is free for 6 million requests per 30 days.

// https://docs.walletconnect.com/appkit/next/cloud/analytics => Analytics overview

// https://docs.walletconnect.com/appkit/next/cloud/analytics => Notification API setup

export default function Home() {
  return (
    <section className="px-4 py-2">
      <div className="mt-2 mb-2">Hello world!</div>
      <ConnectButton />
      <ContractInteraction />
      <Hooks />
    </section>
  );
}

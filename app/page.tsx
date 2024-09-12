// https://docs.walletconnect.com/appkit/next/core/installation

// https://docs.walletconnect.com/appkit/next/core/siwe => Check this out as well, make a new project for it, since we would use it with next-auth

// https://docs.dynamic.xyz/adding-dynamic/using-wagmi => Alternative for web3modal
// https://demo.privy.io/ => Alternative for web3modal

import ConnectButton from "@/components/ConnectButton";
import ContractInteraction from "@/components/ContractInteraction";
import Hooks from "@/components/Hooks";

// https://docs.walletconnect.com/appkit/next/onboarding/socials => Check out how to perform user onboarding with email and socials accounts

// In public folder in /.well-known/walletconnect.txt we have a code for domain verification purposes for wallet connect Verify API

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

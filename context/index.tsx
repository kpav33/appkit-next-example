"use client";

// Context provider that will wrap our application and initialize AppKit (createWeb3Modal needs to be called inside a React Client Component file)

import React, { ReactNode } from "react";
import { config, projectId, metadata } from "@/config";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { State, WagmiProvider } from "wagmi";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// https://docs.walletconnect.com/appkit/next/core/options
// Create modal
createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  //   enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableAnalytics: false,
  // defaultChain: mainnet,
  // Select wallets that are going to be shown on the modal's main view
  // featuredWalletIds: [
  //   "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
  //   "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
  // ],
  // allowUnsupportedChain: true,
  // Select tokens for AppKit to show the user's balance of
  // tokens: {
  //   1: {
  //     address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  //     image: "token_image_url", //optional
  //   },
  //   137: {
  //     address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
  //     image: "token_image_url", //optional
  //   },
  // },
  // chainImages: {
  //   1: "https://my.images.com/eth.png",
  // },
  // connectorImages: {
  //   coinbaseWallet: "https://images.mydapp.com/coinbase.png",
  //   metamask: "https://images.mydapp.com/metamask.png",
  // },
  // termsConditionsUrl: "https://www.mytermsandconditions.com",
  // privacyPolicyUrl: "https://www.myprivacypolicy.com",
  // Enabled by default
  // enableOnramp: false,
  // customWallets: [
  //   {
  //     id: "myCustomWallet",
  //     name: "My Custom Wallet",
  //     homepage: "www.mycustomwallet.com", // Optional
  //     image_url: "my_custom_wallet_image", // Optional
  //     mobile_link: "mobile_link", // Optional - Deeplink or universal
  //     desktop_link: "desktop_link", // Optional - Deeplink
  //     webapp_link: "webapp_link", // Optional
  //     app_store: "app_store", // Optional
  //     play_store: "play_store", // Optional
  //   },
  // ],
  // ----------------------------------------------------------------
  // Theming options
  // themeMode: "light",
  // themeVariables: {
  //   "--w3m-color-mix": "#00BB7F",
  //   "--w3m-color-mix-strength": 40,
  //   "--w3m-font-family": "sans-serif",
  //   "--w3m-accent": "red",
  //   "--w3m-font-size-master": "18px",
  //   "--w3m-border-radius-master": "15px",
  //   "--w3m-z-index": 10,
  // },
});

export default function AppKitProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

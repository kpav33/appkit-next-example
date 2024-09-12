// For a quick integration you can use defaultWagmiConfig function which wraps Wagmi's createConfig function with a predefined configuration. This includes WalletConnect, Coinbase and Injected connectors, and the Blockchain API as a transport
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";
// If using createConfig instead of defaultWagmiConfig, we can use authConnector to enable or disable different auth options
import { authConnector } from "@web3modal/wagmi";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://kpav-appkit-next-example.netlify.app", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mainnet, sepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // We are using the recommended configuration from Wagmi for SSR
  // The ssr flag will delay the hydration of the Wagmi's store to avoid hydration mismatch errors
  ssr: true,
  // Using cookies is optional, if this was not defined Wagmi would use local storage instead
  storage: createStorage({
    storage: cookieStorage,
  }),
  // Configure auth options
  auth: {
    // By using email to connect to the application appkit will send the user a one time password to copy and paste in the modal and verify their authenticity. This will create a non-custodial wallet for the user, which will be available in any application that integrates AppKit and email login. User can optionally chose to move from non-custodial wallet to self-custodial by using Upgrade Wallet on AppKit.
    email: true, // default to true
    // If you first use email (gmail) to login and create an account and then later on try to sign in by using google auth with the same email account that was already used to create an account, it takes you to your already previously created account
    // This are all of the available socials for logging in, remove any as desired, when you have two or more providers the first provider in the array will get a special Connect with provider button
    socials: [
      "google",
      "x",
      "github",
      "discord",
      "apple",
      "facebook",
      "farcaster",
    ],
    // Defines whether your want to show wallet options on the first connect screen, if this is false and socials are enabled, it will show a button that directs you to a new screen display wallet options
    showWallets: true, // default to true
    // Defines if you want to enable wallet features, they allow users to view their balance, send, receive and buy funds
    walletFeatures: true, // default to true
  },
});

// // Create wagmiConfig custom without defaultWagmiConfig
// export const config = createConfig({
//   chains: [sepolia],
//   transports: {
//     [sepolia.id]: http(),
//   },
//   connectors: [
//     walletConnect({ projectId, metadata, showQrModal: false }), // showQrModal must be false.
//     authConnector({
//       chains,
//       options: { projectId },
//       email: true, // default to true
//       socials: [
//         "google",
//         "x",
//         "github",
//         "discord",
//         "apple",
//         "facebook",
//         "farcaster",
//       ],
//       showWallets: true, // default to true
//       walletFeatures: true, // default to true
//     }),
//     // Other connectors...
//   ],
//   ssr: true,
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
// });

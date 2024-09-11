// For a quick integration you can use defaultWagmiConfig function which wraps Wagmi's createConfig function with a predefined configuration. This includes WalletConnect, Coinbase and Injected connectors, and the Blockchain API as a transport
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

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
  // Using cookies is options, if this was not defined Wagmi would use local storage instead
  storage: createStorage({
    storage: cookieStorage,
  }),
});

// // Create wagmiConfig custom without defaultWagmiConfig
// export const config = createConfig({
//   chains: [sepolia],
//   transports: {
//     [sepolia.id]: http(),
//   },
//   connectors: [
//     walletConnect({ projectId, metadata, showQrModal: false }), // showQrModal must be false.
//     // Other connectors...
//   ],
//   ssr: true,
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
// });

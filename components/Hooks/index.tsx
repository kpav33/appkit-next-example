"use client";

import React, { useEffect, useState } from "react";
import {
  useWeb3Modal,
  useWalletInfo,
  useWeb3ModalState,
  useWeb3ModalTheme,
  useWeb3ModalEvents,
} from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { shortenAddress } from "@/utils";

export default function Hooks() {
  const { open, close } = useWeb3Modal();
  // https://docs.walletconnect.com/appkit/next/core/hooks
  // open({ view: 'Account' })

  const { disconnect } = useDisconnect();
  // disconnect()

  const { walletInfo } = useWalletInfo();
  //   console.log(walletInfo);

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  const [isMounted, setIsMounted] = useState(false);

  // if (isConnecting) return <div>Connecting…</div>
  // if (isDisconnected) return <div>Disconnected</div>
  // return <div>{address}</div>

  const { signMessage } = useSignMessage();

  // Track modal state
  const { open: openState, selectedNetworkId } = useWeb3ModalState();

  // We can also setup theming in layout.tsx file instead?
  const { themeMode, themeVariables, setThemeMode, setThemeVariables } =
    useWeb3ModalTheme();
  //   setThemeMode("dark");
  //   setThemeVariables({
  //     "--w3m-color-mix": "#00BB7F",
  //     "--w3m-color-mix-strength": 40,
  //   });

  // Set theme variables
  useEffect(() => {
    setThemeMode("dark");
    // setThemeVariables({
    //   "--w3m-color-mix": "#00BB7F",
    //   "--w3m-color-mix-strength": 40,
    // });
    setIsMounted(true);
  }, []);

  // Track modal events
  const events = useWeb3ModalEvents();

  if (!isMounted) {
    // Ensures no hydration issues
    return null;
  }

  const handleConnect = () => {
    open();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    // <div>
    //   <button>Connect Wallet</button>
    //   <button onClick={() => signMessage({ message: 'hello world' })}>Sign message</button>
    // </div>
    <div
    // className="flex justify-center items-center h-screen"
    >
      {!isConnected ? (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`px-6 py-2 bg-green-600 text-white rounded-md transition-all duration-300 ${
            isConnecting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-700"
          }`}
        >
          {isConnecting ? "Loading..." : "Connect Wallet"}
        </button>
      ) : (
        <div className="flex items-center space-x-4">
          <span
            className="px-4 py-2 bg-gray-800 text-white rounded-md cursor-pointer hover:bg-gray-700 transition-all duration-300"
            onClick={() => open({ view: "Account" })}
          >
            {shortenAddress(address)}
          </span>
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

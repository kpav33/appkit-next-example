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

// All of the available hooks are presented here with also two different implementation for a custom Connect Button
export default function Hooks() {
  // const { open, close } = useWeb3Modal();
  // // https://docs.walletconnect.com/appkit/next/core/hooks
  // // open({ view: 'Account' })

  // const { disconnect } = useDisconnect();
  // // disconnect()

  // const { walletInfo } = useWalletInfo();
  // //   console.log(walletInfo);

  // const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  // const [isMounted, setIsMounted] = useState(false);
  // const [loading, setLoading] = useState(true);

  // // if (isConnecting) return <div>Connecting…</div>
  // // if (isDisconnected) return <div>Disconnected</div>
  // // return <div>{address}</div>

  // const { signMessage } = useSignMessage();

  // // Track modal state
  // const { open: openState, selectedNetworkId } = useWeb3ModalState();

  // // We can also setup theming in layout.tsx file instead? Yes in createWeb3Modal function.
  // const { themeMode, themeVariables, setThemeMode, setThemeVariables } =
  //   useWeb3ModalTheme();
  // //   setThemeMode("dark");
  // //   setThemeVariables({
  // //     "--w3m-color-mix": "#00BB7F",
  // //     "--w3m-color-mix-strength": 40,
  // //   });

  // // Set theme variables
  // useEffect(() => {
  //   setThemeMode("dark");
  //   // setThemeVariables({
  //   //   "--w3m-color-mix": "#00BB7F",
  //   //   "--w3m-color-mix-strength": 40,
  //   // });
  //   setIsMounted(true);
  // }, []);

  // // Track modal events
  // const events = useWeb3ModalEvents();

  // First example Button implementation
  // useEffect(() => {
  //   // If the wallet is connected, set loading to false
  //   if (isConnected || isDisconnected) {
  //     setLoading(false);
  //   }
  // }, [isConnected, isDisconnected]);

  // // if (!isMounted) {
  // //   // Ensures no hydration issues
  // //   return null;
  // // }

  // // console.log(isMounted, loading);
  // if (
  //   !isMounted
  //   // || loading
  // ) {
  //   return null; // Ensure no hydration issues or loading issues
  // }

  // const handleConnect = () => {
  //   setLoading(true);
  //   open();
  // };

  // const handleDisconnect = () => {
  //   disconnect();
  // };

  // Second example Button implementation
  const [mounted, setMounted] = useState(false);
  // const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { open } = useWeb3Modal();
  const { address, status, isConnected, isConnecting } = useAccount();
  // Check if modal is open in addition to the status === "connecting" check, to fix issues with connecting status causing issues in production
  // Using open check with status check together fixes the issues with Connect button stuck on Loading... in production, this would work with both this implementation of the custom Connect Button and with the other implementation that is also present in this file
  const { open: modalOpen, selectedNetworkId } = useWeb3ModalState();

  // console.log("STATUS ", status);
  // console.log("IS CONNECTED ", isConnected);
  // console.log("IS CONNECTING ", isConnecting);
  // console.log("MODAL OPEN ", modalOpen);

  // useEffect(() => {
  //   if (status === "connecting") {
  //     setShowLoading(true);
  //   } else {
  //     setShowLoading(false);
  //   }
  // }, [status]);

  // Second example
  // If we want to use the Loading... text in the custom button then on initial load the loading message will also show up for a couple of seconds, since for some reason the account status gets set to connecting in an attempt to auto connect or something like that for some reason?
  if (!address && mounted) {
    return (
      <button
        onClick={() => open()}
        disabled={status === "connecting" && modalOpen}
        className={`px-6 py-2 bg-green-600 text-white rounded-md transition-all duration-300 ${
          status === "connecting" && modalOpen
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-green-700"
        }`}
      >
        {status === "connecting" && modalOpen ? "Loading..." : "Connect Wallet"}
      </button>
    );
  }

  // First example
  // return (
  //   // <div>
  //   //   <button>Connect Wallet</button>
  //   //   <button onClick={() => signMessage({ message: 'hello world' })}>Sign message</button>
  //   // </div>
  //   <div
  //   // className="flex justify-center items-center h-screen"
  //   >
  //     {!isConnected ? (
  //       <button
  //         onClick={handleConnect}
  //         // disabled={isConnecting}
  //         // className={`px-6 py-2 bg-green-600 text-white rounded-md transition-all duration-300 ${
  //         //   isConnecting
  //         //     ? "opacity-50 cursor-not-allowed"
  //         //     : "hover:bg-green-700"
  //         // }`}
  //         disabled={isConnecting || loading}
  //         className={`px-6 py-2 bg-green-600 text-white rounded-md transition-all duration-300 ${
  //           isConnecting || loading
  //             ? "opacity-50 cursor-not-allowed"
  //             : "hover:bg-green-700"
  //         }`}
  //       >
  //         {/* {isConnecting ? "Loading..." : "Connect Wallet"} */}
  //         {isConnecting || loading ? "Loading..." : "Connect Wallet"}
  //       </button>
  //     ) : (
  //       <div className="flex items-center space-x-4">
  //         <span
  //           className="px-4 py-2 bg-gray-800 text-white rounded-md cursor-pointer hover:bg-gray-700 transition-all duration-300"
  //           onClick={() => open({ view: "Account" })}
  //         >
  //           {shortenAddress(address)}
  //         </span>
  //         <button
  //           onClick={handleDisconnect}
  //           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300"
  //         >
  //           Disconnect
  //         </button>
  //       </div>
  //     )}
  //   </div>
  // );

  // Second example
  return (
    mounted &&
    address && (
      <div className="flex items-center space-x-4">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-md cursor-pointer hover:bg-gray-700 transition-all duration-300"
          onClick={() => open({ view: "Account" })}
        >
          {shortenAddress(address)}
        </button>
      </div>
    )
  );
}

"use client";

import React from "react";

import {
  useNotifications,
  usePrepareRegistration,
  useRegister,
  useSubscribe,
  useSubscription,
  useUnsubscribe,
  useWeb3InboxAccount,
  useWeb3InboxClient,
} from "@web3inbox/react";
import { useCallback, useEffect } from "react";
import { useSignMessage, useAccount } from "wagmi";

//   import Notifications from './Notifications'
import Notifications from "./Notifications";

export default function NotificationsContainer() {
  // Wagmi Hooks
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // W3I Hooks
  const { prepareRegistration } = usePrepareRegistration();
  const { register, isLoading: isRegistering } = useRegister();
  const { data: w3iClient, isLoading: w3iClientIsLoading } =
    useWeb3InboxClient();
  // console.log(w3iClient);
  // console.log(w3iClientIsLoading);
  const { isRegistered } = useWeb3InboxAccount(`eip155:1:${address}`);
  // console.log("IS REGISTERED ", isRegistered);

  // Registration of your address to allow notifications
  // This is done via a signature of a message (SIWE) and the
  // signMessageAsync function from wagmi
  const handleRegistration = async () => {
    try {
      const { message, registerParams } = await prepareRegistration();
      const signature = await signMessageAsync({ message: message });
      await register({ registerParams, signature });
    } catch (registerIdentityError: any) {
      console.error(registerIdentityError);
    }
  };

  // Subscription to dapp notifications
  // Subscribe can be called as a function post registration
  // Can be moved above but shown for example clarity
  const { subscribe, isLoading: isSubscribing } = useSubscribe();
  const { unsubscribe, isLoading: isUnsubscribing } = useUnsubscribe();
  const { data: subscription } = useSubscription();
  // console.log("DATA SUBSCRIPTION ", subscription);
  const isSubscribed = Boolean(subscription);

  //   Object { context: "notifyClient" }
  //  Failed to fetch dapp's DID doc from https://https://kpav-appkit-next-example.netlify.app/.well-known/did.json. Error: Network Error
  // But we need to use https when setting up in the cloud?
  const handleSubscribe = useCallback(async () => {
    if (isRegistered) {
      // console.log("HELLO SUBSCRIBE!");
      // return await subscribe(undefined, "kpav-appkit-next-example.netlify.app");
      return subscribe();
    }
  }, [subscribe, isRegistered]);

  // Note: We are using AppKit for the dapp <> wallet connection.
  // The <w3m-button /> module is from AppKit. Check AppKit Docs for further info.
  return (
    // <>
    //   <main>
    //     {w3iClientIsLoading ? (
    //       <div>Loading W3I Client</div>
    //     ) : (
    //       <div>
    //         <h1>W3I QuickStart</h1>
    //         <w3m-button />
    //         <div>
    //           <button onClick={handleRegistration} disabled={isRegistered}>
    //             {isRegistered ? "Registered" : "Register"}
    //           </button>
    //           <button
    //             onClick={isSubscribed ? unsubscribe : subscribe}
    //             disabled={isSubscribing || isUnsubscribing}
    //           >
    //             {isSubscribed ? "Unsubscribe" : "Subscribe"}
    //           </button>
    //           <hr />
    //           {isSubscribed ? <Notifications /> : null}
    //         </div>
    //       </div>
    //     )}
    //   </main>
    // </>
    <main
    // className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      {w3iClientIsLoading ? (
        <div className="text-xl font-semibold text-gray-700">
          Loading W3I Client...
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-6 text-blue-600">
            W3I QuickStart
          </h1>
          <w3m-button />
          <div className="space-y-4">
            <button
              onClick={handleRegistration}
              disabled={isRegistered}
              className={`px-4 py-2 rounded-md text-white ${
                isRegistered
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isRegistered ? "Registered" : "Register"}
            </button>
            <button
              // onClick={isSubscribed ? unsubscribe : subscribe}
              onClick={isSubscribed ? unsubscribe : handleSubscribe}
              disabled={isSubscribing || isUnsubscribing}
              className={`px-4 py-2 rounded-md text-white ${
                isSubscribing || isUnsubscribing
                  ? "bg-gray-500 cursor-not-allowed"
                  : isSubscribed
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
            <hr className="my-4" />
            {isSubscribed ? <Notifications /> : null}
          </div>
        </div>
      )}
    </main>
  );
}

"use client";

import { useEffect } from "react";
import { initWeb3InboxClient } from "@web3inbox/react";

// This way it works, otherwise web3client doesnt get loaded
export default function InitWeb3Client({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   useEffect(() => {
  //     console.log("Client-side effect triggered");
  //   });

  // domain defaults to window.location.host and must be set to the domain setup in Cloud Setup. For example app.example.com. Do not add the scheme (https://)!
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
    const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN!;

    initWeb3InboxClient({
      projectId,
      domain: appDomain,
      // The allApps setting controls whether an app can access all of a user's subscriptions or only those hosted on its domain. When set to true, it allows setting the domain to something other than the app's host (useful during development for accessing subscriptions from a different domain). This is generally not needed in production, where apps usually access only their own subscriptions. Enabling allApps requires the user to sign a SIWE (Sign-In with Ethereum) message, granting additional permissions, which demands careful consideration.
      //   allApps: process.env.NODE_ENV !== "production",
    });

    console.log("Init web3 inbox clietn");
  }, []);

  return children;
}

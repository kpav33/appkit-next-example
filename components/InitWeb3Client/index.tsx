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

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
    const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN!;

    initWeb3InboxClient({
      projectId,
      domain: appDomain,
      //   allApps: process.env.NODE_ENV !== "production",
    });

    console.log("Init web3 inbox clietn");
  }, []);

  return children;
}

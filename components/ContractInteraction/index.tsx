"use client";

import { useReadContract } from "wagmi";
import USDTAbi from "@/abi/USDTAbi.json";

const USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

import React from "react";

export default function ContractInteraction() {
  //   const result = useReadContract({
  //     abi: USDTAbi,
  //     address: USDTAddress,
  //     functionName: "totalSupply",
  //   });

  //   console.log(result);

  const { data, isError, isLoading } = useReadContract({
    abi: USDTAbi,
    address: USDTAddress,
    functionName: "totalSupply",
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error fetching total supply</div>;
  }

  //   console.log(data);
  // Convert data to a readable format
  const totalSupply = data ? parseFloat(data.toString()) : 0;

  //   // Format the total supply into billions
  //   const totalSupplyInBillions = data
  //     ? parseFloat(data.toString()) / 10 ** 6 / 10 ** 3 // convert to billions
  //     : 0;

  //   // Use Intl.NumberFormat to format the number
  //   const formattedTotalSupply = new Intl.NumberFormat("en-US", {
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2,
  //   }).format(totalSupplyInBillions);

  return (
    <div className="mt-2 mb-2">
      <div>
        USDT total supply: {totalSupply}
        {/* {formattedTotalSupply} */}
      </div>
    </div>
  );
}

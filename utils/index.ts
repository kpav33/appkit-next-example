// Utility function to shorten the address
export const shortenAddress = (address: string | undefined): string => {
  if (!address) return ""; // Return an empty string if address is undefined
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

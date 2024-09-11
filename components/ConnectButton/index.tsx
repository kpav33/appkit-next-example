// Using web3 components, we can also build our own with hooks
// Web components are global html elements that don't require importing.

export default function ConnectButton() {
  return (
    <w3m-button
    //   disabled={false}
    //   balance="show"
    //   size="md"
    //   label="Connect your wallet"
    //   loadingLabel="Loading"
    />
  );
}

// Additional available components
{
  /* 

<w3m-account-button disabled={false} balance="hide"/>

<w3m-connect-button size="md" label="Connect" loadingLabel="Loading..." />

<w3m-network-button disabled={false}/> 

*/
}

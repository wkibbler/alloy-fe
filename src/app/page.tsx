"use client";

import { WagmiConfig, createConfig } from "wagmi";
import Header from "./components/header";
import Panel from "./components/panel";
import { WalletProvider } from "./contexts/wallet-context";
import { Toaster } from "react-hot-toast";
import { ContractProvider } from "./contexts/contract-context";
import { publicClient } from "./config";

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient: publicClient,
});

export default function Home() {
  return (
    <div>
      <WagmiConfig config={wagmiConfig}>
        <WalletProvider>
          <ContractProvider>
            <Header />
            <Panel />
          </ContractProvider>
        </WalletProvider>
      </WagmiConfig>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

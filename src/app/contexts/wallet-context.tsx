import { PropsWithChildren, createContext } from "react";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { CHAIN_ID, tokens } from "../assets-config";

interface WalletContext {
  isConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  address?: string;
  balances: {
    IUSD: number;
    USDC: number;
    USDT: number;
    BUSD: number;
    DAI: number;
  };
}

const WalletContext = createContext<WalletContext>({
  isConnected: false,
  address: "",
  connectWallet: () => null,
  disconnectWallet: () => null,
  balances: {
    IUSD: 0,
    USDC: 0,
    USDT: 0,
    BUSD: 0,
    DAI: 0,
  },
});

const tokenContractAddresses: any = tokens.reduce((a, b) => {
  return { ...a, [b.name]: b.tokenAddress };
}, {});

function WalletProvider({ children }: PropsWithChildren) {
  const { isConnected, address } = useAccount();
  const IUSDBalance = useBalance({
    address,
    token: tokenContractAddresses.IUSD,
    watch: true,
  });
  const USDCBalance = useBalance({
    address,
    token: tokenContractAddresses.USDC,
    watch: true,
  });
  const USDTBalance = useBalance({
    address,
    token: tokenContractAddresses.USDT,
    watch: true,
  });
  const BUSDBalance = useBalance({
    address,
    token: tokenContractAddresses.BUSD,
    watch: true,
  });
  const DAIBalance = useBalance({
    address,
    token: tokenContractAddresses.DAI,
    watch: true,
  });

  const { connect } = useConnect({
    connector: new InjectedConnector(),
    chainId: CHAIN_ID,
  });
  const { disconnect } = useDisconnect();

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        connectWallet: connect,
        disconnectWallet: disconnect,
        balances: {
          IUSD: Number(IUSDBalance.data?.formatted || 0),
          USDC: Number(USDCBalance.data?.formatted || 0),
          USDT: Number(USDTBalance.data?.formatted || 0),
          BUSD: Number(BUSDBalance.data?.formatted || 0),
          DAI: Number(DAIBalance.data?.formatted || 0),
        },
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { WalletProvider, WalletContext };

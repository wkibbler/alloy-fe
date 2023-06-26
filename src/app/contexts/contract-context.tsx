import { PropsWithChildren, createContext, useState } from "react";
import { toast } from "react-hot-toast";
import { tokens } from "../assets-config";
import BN from "bignumber.js";
import { useEthersProvider } from "../hooks/use-ethers-provider";
import { Contract } from "ethers";
import { erc20ABI, useBalance } from "wagmi";
import { publicClient, walletClient } from "../config";
import { iusdAbi } from "./abis";

interface ContractContext {
  deposit: (token: string, amount: string) => void;
  approveTokens: (token: string, amount: string) => void;
  hasApproved: boolean;
  resetApproval: () => void;
  withdraw: (token: string, amount: string) => void;
}

const ContractContext = createContext<ContractContext>({
  deposit: () => null,
  hasApproved: false,
  resetApproval: () => null,
  approveTokens: () => null,
  withdraw: () => null,
});

const tokenToContractAddressMap: any = tokens.reduce((a, b) => {
  // @ts-ignore
  a[b.name] = b.tokenAddress;
  return a;
}, {});

const tokenToTokenIdMap: any = {
  USDC: 0,
  USDT: 1,
  BUSD: 2,
  DAI: 3,
};

const amountToWAD = (amount: string) => {
  return BigInt(new BN(amount).times("1000000000000000000").toString());
};

function ContractProvider({ children }: PropsWithChildren) {
  const [hasApproved, setHasApproved] = useState(false);
  const contractUSDCBalance = useBalance({
    address: tokenToContractAddressMap.IUSD,
    token: tokenToContractAddressMap.USDC,
  });
  const contractUSDTBalance = useBalance({
    address: tokenToContractAddressMap.IUSD,
    token: tokenToContractAddressMap.USDT,
  });
  const contractBUSDBalance = useBalance({
    address: tokenToContractAddressMap.IUSD,
    token: tokenToContractAddressMap.BUSD,
  });
  const contractDAIBalance = useBalance({
    address: tokenToContractAddressMap.IUSD,
    token: tokenToContractAddressMap.USDC,
  });

  const contractBalances: any = {
    USDC: contractUSDCBalance?.data?.formatted,
    USDT: contractUSDTBalance?.data?.formatted,
    BUSD: contractBUSDBalance?.data?.formatted,
    DAI: contractDAIBalance?.data?.formatted,
  };

  const sendAndConfirmTx = async (request: any) => {
    const txid = await walletClient.writeContract(request);
    await publicClient
      .waitForTransactionReceipt({
        hash: txid,
        timeout: 300000, // 5 mins
      })
      .catch((err) => console.log("err: ", err));
  };

  const approveTokens = async (token: string, amount: string) => {
    const [account] = await walletClient.getAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: tokenToContractAddressMap[token],
      abi: erc20ABI,
      functionName: "approve",
      args: [tokenToContractAddressMap.IUSD, amountToWAD(amount)],
    });
    toast
      .promise(sendAndConfirmTx(request), {
        loading: "approving tokens",
        success: "tokens approved",
        error: "unable to approve tokens",
      })
      .then(() => {
        setHasApproved(true);
      });
  };

  const deposit = async (token: string, amount: string) => {
    const [account] = await walletClient.getAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: tokenToContractAddressMap.IUSD,
      abi: iusdAbi,
      functionName: "deposit",
      args: [tokenToTokenIdMap[token], amountToWAD(amount)],
    });
    toast.promise(sendAndConfirmTx(request), {
      loading: `depositing ${amount} ${token}`,
      success: `${amount} ${token} deposited`,
      error: "unable to deposit funds",
    });
  };

  const withdraw = async (token: string, amount: string) => {
    const contractsBalance = contractBalances[token];
    if (Number(amount) >= Number(contractsBalance)) {
      toast.error(`max ${token} withdrawal is ${contractsBalance}`);
      return;
    }
    const [account] = await walletClient.getAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: tokenToContractAddressMap.IUSD,
      abi: iusdAbi,
      functionName: "withdraw",
      args: [tokenToTokenIdMap[token], amountToWAD(amount)],
    });
    toast.promise(sendAndConfirmTx(request), {
      loading: `withdrawing ${amount} ${token}`,
      success: `${amount} ${token} withdrawn`,
      error: "unable to withdraw funds",
    });
  };

  return (
    <ContractContext.Provider
      value={{
        deposit,
        hasApproved,
        resetApproval: () => setHasApproved(false),
        approveTokens,
        withdraw,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export { ContractContext, ContractProvider };

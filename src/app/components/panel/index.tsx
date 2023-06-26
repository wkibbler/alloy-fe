import { useEffect, useState } from "react";
import styles from "./panel.module.css";
import Toggle from "./toggle";
import TokenInput from "./token-input";
import Spacer from "../spacer";
import Stats from "./stats";
import ActionButton from "./action-button";
import Socials from "./socials";
import { useWallet } from "@/app/hooks/use-wallet";
import { useContract } from "@/app/hooks/use-contract";

function Panel() {
  const [action, setAction] = useState("Deposit");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [buttonDisableReason, setButtonDisableReason] = useState<
    string | undefined
  >("Enter valid amount");
  const { balances } = useWallet();
  const { isConnected } = useWallet();
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("USDC");
  const { deposit, resetApproval, hasApproved, approveTokens, withdraw } =
    useContract();

  useEffect(() => {
    resetApproval();
  }, [amount, token, action]);

  useEffect(() => {
    const numberAmount = Number(amount);
    // @ts-ignore
    const userBalance = action === "Deposit" ? balances[token] : balances.IUSD;
    if (numberAmount <= 0) {
      setButtonDisableReason("Enter valid amount");
      setIsButtonDisabled(true);
    } else if (!isConnected) {
      setButtonDisableReason("Connect your wallet");
      setIsButtonDisabled(true);
    } else if (numberAmount > userBalance) {
      setButtonDisableReason("Insufficient funds");
      setIsButtonDisabled(true);
    } else {
      setButtonDisableReason(undefined);
      setIsButtonDisabled(false);
    }
  }, [amount, isConnected, action, token]);

  const onSubmit = () => {
    if (action === "Deposit") {
      if (hasApproved) {
        deposit(token, amount);
      } else {
        approveTokens(token, amount);
      }
    } else if (action === "Withdraw") {
      if (hasApproved) {
        withdraw(token, amount);
      } else {
        approveTokens("IUSD", amount);
      }
    }
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.panel} inline-block`}>
        <Spacer height={8} />
        <h1 className="text-3xl">ALLOY</h1>
        <Spacer height={16} />
        <Toggle action={action} setAction={setAction} />
        <Spacer height={18} />
        <TokenInput
          amount={amount}
          onAmountChange={setAmount}
          token={token}
          onTokenChange={setToken}
          action={action}
        />
        <Spacer height={15} />
        <Stats
          values={
            action === "Deposit"
              ? [{ label: "Network fee", value: "~0.0015 ETH" }]
              : [
                  { label: "Withdrawal fee", value: "0.2%" },
                  { label: "Network fee", value: "~0.0015 ETH" },
                ]
          }
        />
        <Spacer height={30} />
        <ActionButton
          label={
            buttonDisableReason || (hasApproved ? action : "Approve tokens")
          }
          isDisabled={isButtonDisabled}
          onClick={onSubmit}
        />
        <Spacer height={5} />
      </div>
    </div>
  );
}

export default Panel;

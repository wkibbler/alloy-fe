import { tokens } from "@/app/assets-config";
import Button from "../button";
import styles from "./header.module.css";
import Image from "next/image";
import { useWallet } from "@/app/hooks/use-wallet";

function Header() {
  const { connectWallet, disconnectWallet, isConnected, address, balances } =
    useWallet();

  const onButtonPress = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={`${styles["balance-row"]}`}>
        {tokens.map((token, index) => (
          <div
            className={`${styles["balance-card"]} ${index !== 0 && "ml-2"}`}
            key={token.name}
          >
            <Image src={token.logo} alt={token.name} height={40} width={40} />
            <div className="ml-3">
              <h3 className="text-xs opacity-70">{token.name}</h3>
              <h1 className="text-xl">
                {/* @ts-ignore */}
                {balances[token.name].toLocaleString()}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button
          label={
            isConnected ? `${address?.substring(0, 10)}...` : "Connect wallet"
          }
          onClick={onButtonPress}
        />
      </div>
    </div>
  );
}

export default Header;

import { useEffect, useState } from "react";
import styles from "./token-input.module.css";
import { tokens } from "@/app/assets-config";
import Image from "next/image";
import Spacer from "../spacer";

interface Props {
  amount: string;
  onAmountChange: (amount: string) => void;
  token: string;
  onTokenChange: (token: string) => void;
  action: string;
}

function TokenInput({
  amount,
  onAmountChange,
  token,
  action,
  onTokenChange,
}: Props) {
  const [selectedToken, setSelectedToken] = useState("");
  const [selectedTokenIcon, setSelectedTokenIcon] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSelectedToken(token);
    const asset = tokens.find((item) => item.name === token);
    setSelectedTokenIcon(asset?.logo);
  }, [token]);

  const selectAToken = (token: string) => {
    onTokenChange(token);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`${styles.container}`}>
        <div
          className={`${styles["token-selector"]} pr-2 transform active:translate-y-0.5 select-none`}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <Image
            src={selectedTokenIcon}
            width={35}
            height={35}
            alt={selectedToken}
          />
          <h1 className="text-xl ml-2">{selectedToken}</h1>
        </div>
        <input
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className={`${styles["input"]} ml-3`}
          placeholder="0.00"
        />
      </div>
      {isModalOpen && (
        <div className={`${styles["modal"]}`}>
          <div className={`${styles["modal-content"]}`}>
            <h1 className="text-xl">
              Select a token to {action.toLowerCase()}
            </h1>
            <Spacer height={12} />
            {tokens
              .filter((item) => item.name !== "IUSD")
              .map((item) => (
                <div
                  className={`${styles["token-row"]} select-none`}
                  onClick={() => selectAToken(item.name)}
                  key={item.name}
                >
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={30}
                    height={30}
                  />
                  <h1 className="text-lg ml-3">{item.name}</h1>
                </div>
              ))}
            <Spacer height={12} />
            <h1
              className={`${styles["close-modal"]}`}
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </h1>
          </div>
        </div>
      )}
    </>
  );
}

export default TokenInput;

import styles from "./toggle.module.css";

interface Props {
  action: string;
  setAction: (action: string) => void;
}

function Toggle({ action, setAction }: Props) {
  const commonClassName =
    "select-none transform active:translate-y-0.5 transition-colors duration-300 ease-in-out";

  return (
    <div className={`${styles["container"]}`}>
      <div
        className={`${styles["button"]} ${
          action === "Deposit" && styles["active"]
        } ${commonClassName}`}
        onClick={() => setAction("Deposit")}
      >
        <h1 className="text-lg">Deposit</h1>
      </div>
      <div
        className={`${styles["button"]} ${
          action === "Withdraw" && styles["active"]
        } ${commonClassName}`}
        onClick={() => setAction("Withdraw")}
      >
        <h1 className="text-lg">Withdraw</h1>
      </div>
    </div>
  );
}

export default Toggle;

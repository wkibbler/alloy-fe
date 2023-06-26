import styles from "./action-button.module.css";

interface Props {
  label: string;
  onClick?: () => void;
  isDisabled: boolean;
}

function ActionButton({ label, onClick, isDisabled }: Props) {
  const disabledStyle = "select-none opacity-70";
  const activeStyle = "transform active:translate-y-0.5";

  const handleOnClick = () => {
    if (!isDisabled) {
      onClick?.();
    }
  };

  return (
    <div
      className={`select-none ${isDisabled ? disabledStyle : activeStyle} ${
        styles["button"]
      }`}
      onClick={handleOnClick}
    >
      <h1 className="text-xl">{label}</h1>
    </div>
  );
}

export default ActionButton;

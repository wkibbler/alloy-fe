import styles from "./button.module.css";

interface Props {
  label: string;
  onClick?: () => void;
}

function Button({ label, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`${styles["button"]} select-none transform active:translate-y-0.5`}
    >
      <h1 className="text-lg">{label}</h1>
    </div>
  );
}

export default Button;

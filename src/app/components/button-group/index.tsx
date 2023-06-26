import { useState } from "react";
import styles from "./button-group.module.css";

interface Props {
  options: string[];
  value: string;
  onChange: (tab: string) => void;
}

function ButtonGroup({ options, value, onChange }: Props) {
  return (
    <div className={`flex ${styles["container"]}`}>
      {options.map((button, index) => (
        <button
          key={index}
          className={`px-10 py-2 transition-colors duration-300 ease-in-out 
            ${
              value === button ? "bg-blue-500 text-white" : styles["not-active"]
            }`}
          onClick={() => onChange(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
}

export default ButtonGroup;

import { useContext } from "react";
import { ContractContext } from "../contexts/contract-context";

function useContract() {
  const context = useContext(ContractContext);
  return context;
}

export { useContract };

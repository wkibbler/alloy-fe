import USDCLogo from "../assets/usdc.svg";
import USDTLogo from "../assets/usdt.svg";
import DAILogo from "../assets/dai.svg";
import IUSDLogo from "../assets/iusd.svg";
import BUSDLogo from "../assets/busd.webp";

const CHAIN_ID = 5;

const tokens = [
  {
    name: "IUSD",
    logo: IUSDLogo,
    tokenAddress: "0x269CF7c1f6B55183c293FD779F432Dc2CDb9D784",
  },
  {
    name: "USDC",
    logo: USDCLogo,
    tokenAddress: "0xC0eD55D66Eed2F8A025F142aaF721133D0bE1510",
  },
  {
    name: "USDT",
    logo: USDTLogo,
    tokenAddress: "0x5F8A2C517B88A63912c8BFeA4E06175110C112cd",
  },
  {
    name: "BUSD",
    logo: BUSDLogo,
    tokenAddress: "0x87d78245b22DE054277A188CcA5161Ff40911A76",
  },
  {
    name: "DAI",
    logo: DAILogo,
    tokenAddress: "0x6Eb32cc8526A9F9Cc1d978fb81B97312015ebEAF",
  },
];

export { tokens, CHAIN_ID };

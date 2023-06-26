import WebsiteIcon from "../../../assets/website.svg";
import TwitterIcon from "../../../assets/twitter.svg";
import Discord from "../../../assets/discord.svg";
import Image from "next/image";
import styles from "./socials.module.css";

function Socials() {
  return (
    <div className={`${styles["container"]}`}>
      <Image
        src={WebsiteIcon}
        width={20}
        height={20}
        alt="web"
        className={`${styles["icon"]}`}
      />
      <Image src={TwitterIcon} width={20} height={20} alt="twitter" />
      <Image src={Discord} width={20} height={20} alt="discord" />
    </div>
  );
}

export default Socials;

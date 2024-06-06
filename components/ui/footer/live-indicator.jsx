import Image from "next/image";
import styles from "./live-indicator.module.css";

export default function LiveIndicator() {
  return (
    <div
      className={`${styles["indicator-container"]} text-mono-2 text-color-secondary`}
    >
      <div className={`${styles["indicator-icon"]}`}>
        <Image src="/img/icons/live.svg" alt="Live Icon" fill sizes="26px" />
      </div>
      <p>Live</p>
    </div>
  );
}

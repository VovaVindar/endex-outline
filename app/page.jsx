import LatestArticle from "@/components/ui/navbar/latest-article";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import ThreeScene from "@/components/ui/three-scene";

export default function Home() {
  return (
    <>
      <main>
        <div className={`${styles["hero-container"]}`}>
          <LatestArticle className={`${styles["root-path-article"]}`} />
          <div className={`${styles["hero-left"]}`}>
            <h1
              className={`${styles["hero-title"]} text-heading-1 text-color-primary`}
            >
              Generative AI for Financial Firms
            </h1>
            <p
              className={`${styles["hero-description"]} text-mono-1 text-color-primary`}
            >
              AI-Native applications built for the future, powered by
              domain-specific Models Optimized for Financial Services.
            </p>
            <div className={`${styles["hero-btn-container"]}`}>
              <Button variant="primary">Join Waitlist</Button>
              <Button variant="secondary">Custom Deployment</Button>
            </div>
            <div className={`${styles["hero-divider"]} border-divider`}></div>
            <p className="text-mono-1 text-color-primary">
              <span className="text-color-secondary">Our products lines —</span>
              <br />
              <br />
              <span className="text-mono-1-bold">Nova:</span> Autonomous
              Financial Analyst
              <br />
              <br />
              <span className="text-mono-1-bold">Forge:</span> AI-Native
              Financial Intelligence Layer
            </p>
          </div>
          <div className={`${styles["hero-right"]}`}>
            <ThreeScene />
          </div>
        </div>
      </main>
    </>
  );
}

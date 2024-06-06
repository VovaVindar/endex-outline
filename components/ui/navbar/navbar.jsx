"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import LatestArticle from "./latest-article";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer/footer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className={`${styles["navbar"]}`}>
      <div className={`${styles["navbar-left"]}`}>
        <Link href="/">
          <div className={`${styles["navbar-logo"]}`}>
            {Array.from({ length: 25 }).map((_, index) => (
              <div key={index}></div>
            ))}
          </div>
        </Link>
        {pathname !== "/blog" && (
          <div>
            <LatestArticle />
          </div>
        )}
      </div>
      <div
        className={`${styles["navbar-links"]} text-mono-2 text-color-primary`}
      >
        <div className={`${styles["desktop"]}`}>
          <Link href="/blog">Blog</Link>
          <Link href="">Careers</Link>
          <Link href="https://app.endex.ai/">Sign In</Link>
        </div>
        <div
          className={`${styles["mobile"]} ${
            isOpen ? styles["mobile-open"] : ""
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${styles["burger-menu"]}`}
          >
            <div className={`${styles["icon-container"]}`}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
          <div className={`${styles["mobile-links-container"]}`}>
            <div className={`${styles["navbar-logo"]}`}>
              {Array.from({ length: 25 }).map((_, index) => (
                <div key={index}></div>
              ))}
            </div>
            <Link href="/blog">Blog</Link>
            <Link href="">Careers</Link>
            <Link href="https://app.endex.ai/">Sign In</Link>
            <Link href="/deployment">Custom Deployment</Link>
            <Button variant="primary">Join Waitlist</Button>
            {/*<Footer />*/}
          </div>
        </div>
      </div>
      <div className={`${styles["navbar-border"]} border-divider`}></div>
    </nav>
  );
}

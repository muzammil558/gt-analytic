/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import classNames from "classnames";

import styles from "../styles/Footer.module.scss";

const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className={styles.footer}>
      <div className="container">
        <div className={styles.footer__top}>
          <Link href="/" scroll={true} className={styles.footer__logo}>
            <img src="/assets/imgs/logo-secondary.png" alt="Golden Tides" />
          </Link>
          <div className={styles.footer__social}>
            <a
              href="https://discord.com/invite/goldentides"
              target="_blank"
              rel="noreferrer"
              className={styles.footer__link}
            >
              <img src="/assets/icons/socials/discord.svg" alt="Discord" />
            </a>
            <a
              href="https://twitter.com/GoldenTides_gg"
              target="_blank"
              rel="noreferrer"
              className={styles.footer__link}
            >
              <img src="/assets/icons/socials/x.svg" alt="X" />
            </a>
            <div
              className={classNames(
                styles.footer__link,
                styles.footer__link_yellow
              )}
            >
              <img
                src="/assets/icons/socials/arrow.svg"
                alt="Arrow"
                onClick={handleScrollTop}
              />
            </div>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <p className={styles.footer__text}>
            All trademarks referenced herein are the properties of their
            respective owners.
            <br />
            ©2024 Psychedelic Games.
            <br /> All rights reserved.
          </p>
          <img
            src="/assets/imgs/psychedelic.png"
            alt="Psychedelic"
            className={styles.footer__psychedelic}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

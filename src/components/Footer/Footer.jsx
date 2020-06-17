import React from 'react';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerwrapper}>
        <div className={styles.footer__container}>
          <a href="https://www.google.com" className={styles.footerlinkaboutUs}>
            About us
          </a>
          <a href="https://www.google.com" className={styles.footerlinkAboutprogram}>
            About the program
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={styles['footer-wrapper']}>
        <div className={styles['footer-container']}>
          <a href="https://www.google.com" className={styles['footer-link-about-us']}>
            About us
          </a>
          <a href="https://www.google.com" className={styles['footer-link-about-program']}>
            About the program
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

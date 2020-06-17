import React from 'react';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerwrapper}>
        <div className={styles.footercontainer}>
          <a href="https://www.google.com" className={styles.footerlinkaboutus}>
            About us
          </a>
          <a href="https://www.google.com" className={styles.footerlinkaboutprogram}>
            About the program
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

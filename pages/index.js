import Spline from '@splinetool/react-spline';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import TGIcon from '/public/assets/TGlogo.svg';
import XIcon from '/public/assets/Xlogo.svg';

export default function Home() {
  const [visible, setVisible] = useState(false)
  return (
    <div className={styles.container}>
      <div className={styles.SplineContainer}>
      <Spline
        scene="https://prod.spline.design/4hP5r0iNFz0e7Vwr/scene.splinecode" className={styles.Spline}
      />
      </div>
      <div className={styles.Slogan}>Destined for 2.147B MCAP since 2001</div>
      <div className={styles.Address}>3oU51xU5yz7wKLRMMKAqvVVpzfuvXLKUScqyht8q2PKd</div>
      <div className={styles.VerticalButtonsContainer}>
        <button className={`${styles.button}  ${styles.VisionButton}`} onClick={() => setVisible(true)}>Read about the vision</button>
        <button className={`${styles.button}  ${styles.VisionButton}`} onClick={() => setVisible(true)}>How to buy?</button>
        <button className={`${styles.button}  ${styles.VisionButton}`} onClick={() => setVisible(true)}>Project Roadmap</button>
      </div>
      <Dialog visible={visible} className={styles.Dialog} onHide={() => setVisible(false)}>
        
        {/* Scroll Top */}
        <img
            src="/assets/scrollTop.gif"
            alt="Scroll Top"
            className={styles.scrollTop}
          />
        <div className={styles.scrollContainer}>
          

          {/* Scroll Body */}
          <div className={styles.scrollBody}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>Additional scrollable content here...</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>Additional scrollable content here...</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>Additional scrollable content here...</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>Additional scrollable content here...</p>
          </div>
        </div>
        {/* Inverted Scroll Top */}
        <img
            src="/assets/scrollTop.gif"
            alt="Inverted Scroll Top"
            className={`${styles.invertedScrollTop}`}
          />
      </Dialog>
      <div className={styles.ButtonContainer}>
        <a href="https://t.me/+1TgHpKCdkaAyM2Zh" target="_blank" rel="noopener noreferrer">
          <button className={styles.button}>
            <TGIcon className={styles.TGIcon} />
          </button>
        </a>
        <a href="https://x.com/rsgoldonsol" target="_blank" rel="noopener noreferrer">
          <button className={styles.button}>
            <div className={styles.XIconContainer}>
              <XIcon className={styles.XIcon} />
            </div>
          </button>
        </a>
      </div>
    </div>
  );
}

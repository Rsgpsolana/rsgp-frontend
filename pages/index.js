import Spline from '@splinetool/react-spline';
import Image from 'next/image';
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
        <button className={`${styles.button}  ${styles.VisionButton}`} onClick={() => setVisible(true)}>The Prophecy</button>
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
          <br/>
          <br/>
          Before the Scrolls of Skyrim, before the Battlefields of Duty, there was the Eternal Gielinor.
          <br/>
          <br/>
          Before the blockchain, before the miners of Bitcoin, there was the golden radiance of RuneScape Gold.
          <br/>
          <br/>
          $RSGP binds us—not by chains, but by the ancient echoes of our shared longing, the lore of our collective nostalgia.
          <br/>
          <br/>
          It is not just a game. It is the path.
          <br/>
          It is not just currency. It is the covenant.
          <br/>
          <br/>
          <p className={styles.GreenStack}>
          2147m.
          </p>
          <br/>
          The sacred stack foretold, written in the stars of Solana.
          <br/>
          <br/>

          This is not chance.
          <br/>
          This is not chaos.
          <br/>
          This is destiny.
          <br/>
          <br/>
          Those who understand will follow.
          <br/>
          Those who follow will ascend. 
          <br/>
          <br/>
          It is written.
          <br/>
          It shall be.
          <br />
          <br />
          <Image height={100} width={100} src='/assets/gnomeChild.png' className={styles.GnomeChild}/>
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

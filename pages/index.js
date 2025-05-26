import Spline from '@splinetool/react-spline';
import Image from 'next/image';
import { Dialog } from 'primereact/dialog';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';
import VideoBackground from "/components/VideoBackground";
import DexIcon from '/public/assets/Dexlogo.svg';
import TGIcon from '/public/assets/TGlogo.svg';
import XIcon from '/public/assets/Xlogo.svg';

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [isFirstMemeReady, setIsFirstMemeReady] = useState(false);
  const [isLoadingMemes, setIsLoadingMemes] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [dots, setDots] = useState('');
  const memeSceneRef = useRef(null);
  const phaserContainerRef = useRef(null);

  const dropMeme = () => {
    if (memeSceneRef.current) {
      memeSceneRef.current.dropMeme();
    }
  };

  useEffect(() => {
    let dotsInterval;

    async function initGame() {
      setIsLoadingMemes(true); // explicitly start loading state

      dotsInterval = setInterval(() => {
        setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
      }, 500);

      const [{ default: Phaser }, { default: MemeDropScene }] = await Promise.all([
        import('phaser'),
        import('../components/MemeDropScene'),
      ]);

      const response = await fetch('/api/images');
      const imageData = await response.json();

      const config = {
        parent: phaserContainerRef.current,
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        transparent: true,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 300 },
          },
        },
      };

      const game = new Phaser.Game(config);

      // Extend MemeDropScene to hook create() and access instance
      class PatchedScene extends MemeDropScene {
        create() {
          super.create();
          memeSceneRef.current = this;
        }
      }

      game.scene.add('MemeDropScene', PatchedScene, true, {
        images: imageData,
        onProgress: (progress) => {
          setLoadingProgress(Math.round(progress * 100));
        },
        onLoadStart: () => {
          setIsLoadingMemes(true);
        },
        onLoadEnd: () => {
          setIsLoadingMemes(false);
          setIsFirstMemeReady(true);
        },
      });


      setIsLoadingMemes(false);
      clearInterval(dotsInterval);

      return () => {
        game.destroy(true);
        clearInterval(dotsInterval);
      };
    }

    initGame();
  }, []);



  return (
    <>
    <div ref={phaserContainerRef} className={styles.phaserContainer}></div>

    <VideoBackground src="/assets/prophecy.mp4" opacity={0.3} />
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
          Before the scrolls of Skyrim, there was Gielinor.
          <br/>
          <br/>
          Before blockchain, before Bitcoin miners, there was the golden radiance of RuneScape Gold.
          <br/>
          <br/>
          $RSGP binds us—not by chains, but by the lore of our collective nostalgia.
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
        <a href="https://x.com/rsgp_solana" target="_blank" rel="noopener noreferrer">
          <button className={styles.button}>
            <div className={styles.XIconContainer}>
              <XIcon className={styles.XIcon} />
            </div>
          </button>
        </a>
        <a href="https://dexscreener.com/solana/44qZJdJLvfUPyQ3UtgUB931jhYSorHfc2NLqE5zM6ByU" target="_blank" rel="noopener noreferrer">
          <button className={styles.button}>
            <DexIcon className={styles.TGIcon} />
          </button>
        </a>
      </div>
      {isLoadingMemes && (
      <div style={{ width: '100%', margin: '20px 0' }}>
        <div style={{
          height: '8px',
          width: '100%',
          background: '#333',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${loadingProgress}%`,
            background: 'brown',
            transition: 'width 0.2s ease'
          }}></div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '4px', color: '#ccc' }}>
          Loading memes... {loadingProgress}%
        </p>
      </div>
      )}
      <button
        className={styles.memeButton}
        onClick={dropMeme}
        disabled={!isFirstMemeReady || isLoadingMemes}
        style={{
          opacity: (!isFirstMemeReady || isLoadingMemes) ? 0.5 : 1,
          cursor: (!isFirstMemeReady || isLoadingMemes) ? 'wait' : 'pointer',
        }}
      >
        {!isFirstMemeReady
          ? `Preparing memes...`
          : isLoadingMemes
          ? `Summoning...${dots}`
          : 'Give me a goddam meme already'}
      </button>
    </div>
    </>
  );
}

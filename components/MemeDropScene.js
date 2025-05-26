'use client';

import Phaser from 'phaser';

export default class MemeDropScene extends Phaser.Scene {
  constructor() {
    super('MemeDropScene');
    this.imageList = [];
  }

  init(data) {
    if (!Array.isArray(data.images)) {
      console.error('No images passed to scene');
      return;
    }

    this.imageList = data.images;
    this.progressCallback = data.onProgress;
    this.onLoadStart = data.onLoadStart;
    this.onLoadEnd = data.onLoadEnd;
  }

  preload() {
    this.load.on('progress', (value) => {
      if (this.progressCallback) {
        this.progressCallback(value); // value to float 0.0–1.0
      }
    });

    this.imageList.forEach((img, index) => {
      console.log(`Preloading: ${img.name}`);
      let key = `${index + 1}`;
      img.name = key;
      this.load.image(img.name, img.url + `&t=init`);
    });

    this.load.once('complete', () => {
      if (this.progressCallback) {
        this.progressCallback(1); // 100% for sure
      }
    });
  }

  create() {
    console.log('All images loaded');
    this.physics.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
    this.dropMeme();
  }

  dropMeme() {
    if (!this.imageList || this.imageList.length === 0) return;

    if (this.onLoadStart) this.onLoadStart();

    const x = Phaser.Math.Between(0, window.innerWidth);
    const y = -100;

    const randomImage = Phaser.Utils.Array.GetRandom(this.imageList);

    const textureKey = `${randomImage.name}_${Date.now()}`;

    if (this.textures.exists(randomImage.name)) {
      const meme = this.physics.add.image(x, y, randomImage.name);
      this.prepareMeme(meme);
      if (this.onLoadEnd) this.onLoadEnd();
      return;
    }

    this.load.image(textureKey, `${randomImage.url}?t=${Date.now()}`);
    this.load.once('complete', () => {
      const meme = this.physics.add.image(x, y, textureKey);
      this.prepareMeme(meme);
      if (this.onLoadEnd) this.onLoadEnd();
    });
    if (this.onLoadEnd) this.onLoadEnd();
    this.load.start();
  }

  prepareMeme(meme) {
    const scale = Math.min(window.innerWidth / 800, 0.35);
    meme.setScale(scale);
    meme.setOrigin(0.5, 1);
    meme.setBounce(0.8);
    meme.setCollideWorldBounds(true);
    meme.body.setSize(meme.width, meme.height, true);
    meme.body.setMaxVelocity(1000);

    meme.body.world.on('worldbounds', (body) => {
      if (body.velocity.y > 800) {
        body.setVelocityY(800);
      }
    });
  }
}

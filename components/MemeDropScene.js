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
  }

  preload() {
    this.imageList.forEach((img, index) => {
      console.log(`Preloading: ${img.name}`);
      let key = `meme_${index}`;
      img.name = key;
      this.load.image(img.name, img.url);
    });
  }

  create() {
    console.log('All images loaded');
    this.physics.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
  }

  dropMeme() {
    if (this.imageList.length === 0) return;

    const x = Phaser.Math.Between(0, window.innerWidth);
    const y = -100;

    console.log('Available images:', this.imageList.map(i => i.name));

    const randomImage = Phaser.Utils.Array.GetRandom(this.imageList);
    const meme = this.physics.add.image(x, y, randomImage.name);

    const scale = Math.min(window.innerWidth / 800, 0.35);
    meme.setScale(scale);
    meme.setBounce(0.8);
    meme.setCollideWorldBounds(true);
    meme.body.setSize(meme.width * scale, meme.height * scale, true);
    meme.body.setMaxVelocity(1000);
  }
}

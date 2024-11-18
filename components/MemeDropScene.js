'use client';

import Phaser from 'phaser';

export default class MemeDropScene extends Phaser.Scene {
  constructor() {
    super('MemeDropScene');
    this.memeKeys = []; // Store keys for loaded memes
  }

  async preload() {
    for (let i = 1; i <= 33; i++) {
        this.load.image(`${i}`, `https://storage.googleapis.com/rsgp-memes/${i}.jpg`);
      }
      
  }

  create() {
    // Set the bounds of the physics world to match the screen
    this.physics.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
  }
  dropMeme() {
    const x = Phaser.Math.Between(0, window.innerWidth);
    const y = -100; // Start above the screen
    const randomNumber = Phaser.Math.Between(1, 33); // Generate a random number between 1 and 33
    const meme = this.physics.add.image(x, y, randomNumber.toString()); // Use the random number as the key
    
    meme.setScale(0.5);
    meme.setBounce(0.8); // Add bounce effect
    meme.setCollideWorldBounds(true); // Ensure memes don't leave the screen
  }
}

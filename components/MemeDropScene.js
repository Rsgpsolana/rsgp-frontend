'use client';

import Phaser from 'phaser';

export default class MemeDropScene extends Phaser.Scene {
  constructor() {
    super('MemeDropScene');
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

    // Scale meme based on screen size
    const scale = Math.min(window.innerWidth / 800, 0.35); // Adjust 800 to tweak relative size
    meme.setScale(scale);

    meme.setBounce(0.8); // Add bounce effect
    meme.setCollideWorldBounds(true); // Ensure memes don't leave the screen

    // Ensure physics body matches the scaled meme
    meme.body.setSize(meme.width * scale, meme.height * scale, true);

    // Clamp bounce velocity to avoid infinite bouncing
    meme.body.setMaxVelocity(1000); // Set maximum velocity for safety
    meme.body.world.on('worldbounds', (body) => {
      if (body.velocity.y > 800) {
        body.setVelocityY(800); // Clamp the vertical velocity
      }
    });
  }
}

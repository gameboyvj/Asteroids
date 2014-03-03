Asteroids
=========

Classic arcade game build using Javascript and HTML 5 Canvas.

The game uses inheritance organize ships, bullets and asteroids as movingObjects. All code is under the Asteroids namespace to avoid diluting the global namespace. The only exception is the keymaster.js library I used which attaches key bindings at the global namespace. The game uses vector algebra to calculate velocity of the ship. Collision detection occurs after every frame in the game to makes sure we know immediately when asteroids are destroyed or the game has ended.

To do:

Update graphics to have actual ships, asteroids and bullets

Incorporate a game end message on the game rather than an alert message

Split asteroids into multiple pieces when hit

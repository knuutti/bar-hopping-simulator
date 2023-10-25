let game;
let isDoubleJumping = false;
let isSingleJumping = false;

let levelScores = [null, null, null]

const gameOptions = {
    dudeGravity: 800,
    dudeSpeed: 300
}

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: "#000000",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 1000
        },
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 0
                }
            }
        },
        scene: StartScreen
    }

    game = new Phaser.Game(gameConfig);
    game.scene.add('LevelSelector', LevelSelector);
    game.scene.add('Level1', Level1);
    game.scene.add('Level2', Level2);
    game.scene.add('Level3', Level3);
    window.focus();
}
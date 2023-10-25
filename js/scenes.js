// Starting screen
class StartScreen extends Phaser.Scene {

    constructor() {
        super("StartScreen");
    }

    preload() {

    }


    create() {
        this.add.text(this.cameras.main.centerX -300, this.cameras.main.centerY - 440, 'Bar Hopping \nSimulator', { fill: '#ffffff', fontSize: "100px", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10})
        this.add.text(this.cameras.main.centerX -300, this.cameras.main.centerY - 150, 'Take shots and return\nto the bartender', { fill: '#ffffff', fontSize: "50px", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10})
        this.add.text(this.cameras.main.centerX -300, this.cameras.main.centerY + 150, 'Be fast, the next bar awaits!', { fill: '#ffffff', fontSize: "50px", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10})
        this.add.text(this.cameras.main.centerX -300, this.cameras.main.centerY, 'Watch out for guards! \nThey don\'t like drunk students', { fill: '#ffffff', fontSize: "50px", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10})


        const helloButton = this.add.text(this.cameras.main.centerX -200, this.cameras.main.centerY+300, 'Start Game', { fill: '#00ffff', fontSize: "80px", fontFamily: "Calibri" })
        helloButton.setInteractive()
        helloButton.on('pointerdown', () => {this.scene.start("LevelSelector")});
    }

    update() {
     
    }

    

}

// Level selector scene
class LevelSelector extends Phaser.Scene {

    constructor() {
        super("LevelSelector");
    }

    preload() {
        this.load.image("checkmark", "assets/sprites/checkmark.png");
        this.load.image("lukko", "assets/sprites/lukko.png");
    }


    create() {
        this.add.text(this.cameras.main.centerX -250, this.cameras.main.centerY - 440, 'Level Selector', { fill: '#029785', fontSize: "60px", fontFamily: "Calibri"})
        if (levelScores[2]) {
            this.add.text(this.cameras.main.centerX -250, this.cameras.main.centerY - 350, 'Congrats! You are a bar hopping\nCHAMPION!\n\nYou can try to beat your high scores still', { fill: '#ffffff', fontSize: "30px", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10})
        }
        else {
            this.add.text(this.cameras.main.centerX -250, this.cameras.main.centerY - 350, 'Get stamps from all three bars\nin order to become the bar \nhopping champion!', { fill: '#ffffff', fontSize: "30px", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10})
        }

        const lvl1Button = this.add.text(this.cameras.main.centerX -200, this.cameras.main.centerY-100, 'Level 1 - Gemmi', { fill: '#00ffff', fontSize: "50px", fontFamily: "Calibri" })
        lvl1Button.setInteractive()
        lvl1Button.on('pointerdown', () => {this.scene.start("Level1")});
        if (!levelScores[0]) {
            this.add.text(this.cameras.main.centerX - 200, this.cameras.main.centerY-20, 'High score: --.--', { fill: "#00ffff", fontSize: "30px", fontFamily: "Calibri"})
        }
        else {
            this.add.text(this.cameras.main.centerX - 200, this.cameras.main.centerY-20, 'High score: ' + levelScores[0], { fill: "#00ffff", fontSize: "30px", fontFamily: "Calibri"})
        }

        const lvl2Button = this.add.text(this.cameras.main.centerX -200, this.cameras.main.centerY+100, 'Level 2 - Palmas', { fill: '#00ffff', fontSize: "50px", fontFamily: "Calibri" })
        if (!levelScores[0]) {
            lvl2Button.setFill("#FFFFFF")
            this.add.text(this.cameras.main.centerX - 200, this.cameras.main.centerY+180, 'Complete Gemmi first', { fontSize: "30px", fontFamily: "Calibri"})
            this.add.image(150, 650,"lukko")
        }
        else {
            if (!levelScores[1]) {
                this.add.text(this.cameras.main.centerX - 200, this.cameras.main.centerY+180, 'High score: --.--', {fill: "#00ffff", fontSize: "30px", fontFamily: "Calibri"})
            }
            else {
                this.add.text(this.cameras.main.centerX - 200, this.cameras.main.centerY+180, 'High score: ' + levelScores[1], {fill: "#00ffff", fontSize: "30px", fontFamily: "Calibri"})
            }
            lvl2Button.setInteractive()
            lvl2Button.on('pointerdown', () => {this.scene.start("Level2")});
        }

        const lvl3Button = this.add.text(this.cameras.main.centerX -200, this.cameras.main.centerY+300, 'Level 3 - Valta', { fill: '#00ffff', fontSize: "50px", fontFamily: "Calibri" })
        if (!levelScores[1]) {
            lvl3Button.setFill("#FFFFFF")
            this.add.text(this.cameras.main.centerX - 200, this.cameras.main.centerY+380, 'Complete Palmas first', { fontSize: "30px", fontFamily: "Calibri"})
            this.add.image(150, 850,"lukko")
        }
        else {
            if (!levelScores[2]) {
                this.add.text(this.cameras.main.centerX - 200, this.cameras.main.centerY+380, 'High score: --.--', { fill: "#00ffff", fontSize: "30px", fontFamily: "Calibri"})
            }
            else {
                this.add.text(this.cameras.main.centerX - 200, this.cameras.main.centerY+380, 'High score: ' + levelScores[2], { fill: "#00ffff", fontSize: "30px", fontFamily: "Calibri"})
            }
            lvl3Button.setInteractive()
            lvl3Button.on('pointerdown', () => {this.scene.start("Level3")});
        }
        
    }

    update() {
        
    }

    

}

// Level 1 - Gemmi
class Level1 extends Phaser.Scene {

    constructor() {
        super("Level1");
        this.score = 0;
        this.allPoints = false;
        this.isPaused = false;
        this.timerIsStopped = false;
        this.timerIsRunning = false
        this.timer = 0.0;
        this.timerInterval;
    }

    preload() {
        this.load.image("top_bar", "assets/sprites/top_bar.png");
        this.load.image("platform_80", "assets/platforms/white_160x32.png");
        this.load.image("background", "assets/backgrounds/gemmi.png");
        this.load.image("star", "assets/sprites/shot_glass_50.png");
        this.load.spritesheet("dude", "assets/sprites/dude.png", {frameWidth: 50, frameHeight: 100})
        this.load.spritesheet("bartender", "assets/sprites/bartender.png", {frameWidth: 50, frameHeight: 100})
        this.load.spritesheet("enemy", "assets/sprites/enemy.png", {frameWidth: 50, frameHeight: 100})

        // Music files
        this.load.audio("music", "assets/audio/music.mp3")
        this.load.audio("fail", "assets/audio/fail.mp3")
        this.load.audio("victory", "assets/audio/victory.mp3")
        this.load.audio("collect", "assets/audio/collect.mp3")
    }

    create() {

        // Setting background
        this.background = this.physics.add.sprite
        (400,500,'background');

        this.music = this.sound.add("music");
        this.music.play();

        this.victorySound = this.sound.add("victory");
        this.failSound = this.sound.add("fail");
        this.collectSound = this.sound.add("collect");

        
        this.add.image(400,40,"top_bar");

        // Header
        this.add.text(this.cameras.main.centerX -100, this.cameras.main.centerY - 490, '1 - Gemmi', { fill: '#ffffff', fontSize: "50px", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10})

        // Generating dude
        this.dude = this.physics.add.sprite(760, 900, "dude");
        this.dude.body.gravity.y = gameOptions.dudeGravity;

        this.bartender = this.physics.add.sprite(700, 900, "bartender");
        this.bartender.body.gravity.y = gameOptions.dudeGravity;
        this.bartender.disableBody(true,true);

        this.enemyGroup = this.physics.add.group({})

        this.enemy1 = this.enemyGroup.create(500,325,"enemy")
        this.enemy1.body.velocity.x = 100;
        this.enemy1.body.gravity.y = gameOptions.dudeGravity;

        this.enemy2 = this.enemyGroup.create(600,650,"enemy")
        this.enemy2.body.velocity.x = 100;
        this.enemy2.body.gravity.y = gameOptions.dudeGravity;

        this.hasStarted = true;

        this.groundGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        })

        this.starGroup = this.physics.add.group({});
        this.physics.add.collider(this.starGroup, this.groundGroup);
        this.physics.add.collider(this.bartender, this.groundGroup);
        this.physics.add.collider(this.enemyGroup, this.groundGroup);

        this.physics.add.overlap(this.dude, this.starGroup, this.collectStar, null, this);

        this.physics.add.overlap(this.dude, this.enemyGroup, this.die, null, this);

        this.physics.add.overlap(this.dude, this.bartender, this.getStamped, null, this);


        // Generating ground
        for(let i = 0; i < 7; i++) {
            this.groundGroup.create(i*160, game.config.height- 10, "platform_80");
        }

        // Platform generation (non-active)
        this.groundGroup.create(180, 830, "platform_80")
        this.groundGroup.create(230, 830, "platform_80")
        this.groundGroup.create(230, 650, "platform_80")
        this.groundGroup.create(70, 650, "platform_80")
        this.groundGroup.create(600, 750, "platform_80")
        this.groundGroup.create(500, 400, "platform_80")
        this.groundGroup.create(600, 550, "platform_80")
        this.groundGroup.create(750, 750, "platform_80")
        this.groundGroup.create(200, 400, "platform_80")
        this.groundGroup.create(350, 400, "platform_80")


        // Spawning stars
        this.starGroup.create(180, 940, "star")
        this.starGroup.create(60, 400, "star")
        this.starGroup.create(600, 500, "star")
        this.starGroup.create(200, 605, "star")
        this.starGroup.create(450, 350, "star")


        // Dude-ground collision
        this.physics.add.collider(this.dude, this.groundGroup);


        // Scoreboard
        this.add.image(40,40, "star");
        this.scoreText = this.add.text(70, 16, "0", {fontSize: "40px", fill: "#FFFFFF", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10}, );
        this.add.text(500, 80, "SPACE = RESTART\nSHIFT = MENU", {fontSize: "40px", fill: "#FFFFFF", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10}, );

        this.timerText = this.add.text(680, 16, "0.00", {fontSize: "40px", fill: "#FFFFFF", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10}, );

        this.cursors = this.input.keyboard.createCursorKeys();


    }

    collectStar(dude, star) {

        this.collectSound.play();

        star.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText(this.score);
    }

    restart() {
        this.scene.start("Level1");
        this.music.stop()
        this.score = 0;
        this.allPoints = false;
        this.timer = 0.00;
        this.isPaused = false;
        this.timerIsRunning = false;
        this.timerIsStopped = false;
        clearInterval(this.timerInterval);

    }

    getStamped(dude, bartender) {

        if (!levelScores[0] || this.timer < levelScores[0]) {
            levelScores[0] = Math.round(100*this.timer) / 100;
        }

        this.victorySound.play();
        
        this.timerIsStopped = true;
        this.timerIsRunning = true;
        dude.disableBody(true, true);
        this.add.text(this.cameras.main.centerX -150, this.cameras.main.centerY, 'You Won! Epic!\nFinal time: '+ Math.round(100*this.timer)/100, { fill: '#0f0', fontSize: "50px", fontFamily: "Calibri" })
        const levelButton = this.add.text(this.cameras.main.centerX -150, this.cameras.main.centerY+100, 'Back to level selector', { fill: '#0f0', fontSize: "50px", fontFamily: "Calibri" })
        levelButton.setInteractive()
        levelButton.on('pointerdown', () => {this.exitToLevel()});
        
    }

    exitToLevel() {
        this.victorySound.stop();
        this.music.stop();
        this.score = 0;
        this.allPoints = false;
        this.timer = 0.00;
        this.isPaused = false;
        this.timerIsRunning = false;
        this.timerIsStopped = false;
        clearInterval(this.timerInterval);
        this.scene.start("LevelSelector");
    }

    die(dude, enemy) {

        this.failSound.play();

        dude.disableBody(true, true);
        const helloButton = this.add.text(this.cameras.main.centerX -150, this.cameras.main.centerY, 'Guard threw you out\nTry again?', { fill: '#0f0', fontSize: "50px", fontFamily: "Calibri" })
        helloButton.setInteractive()
        helloButton.on('pointerdown', () => {this.restart()});
    }

    pause_game() {
        this.isPaused = true;

    }

    update() {
        if(this.cursors.left.isDown && this.dude.body.position.x > 0) {
            this.dude.body.velocity.x = -gameOptions.dudeSpeed;
        }
        else if(this.cursors.right.isDown && this.dude.body.position.x < 760) {
            this.dude.body.velocity.x = gameOptions.dudeSpeed;
        }
        else {
            this.dude.body.velocity.x = 0;
        }

        if(this.cursors.up.isDown && !isSingleJumping) {
            if (this.dude.body.touching.down) {
                isSingleJumping = true
                isDoubleJumping = false;
                this.dude.body.velocity.y = -gameOptions.dudeGravity / 1.6;
            }
            else if (!isDoubleJumping) {
                isDoubleJumping = true;
                this.dude.body.velocity.y = -gameOptions.dudeGravity / 2.4;
            }
        }

        if (!this.cursors.up.isDown) {
            isSingleJumping = false;
        }

        if (this.dude.body.velocity.y == 0) {
            isSingleJumping = false;
            isDoubleJumping = false;
        }

        // Vihollisen liikkeet
        if (this.enemy1.body.velocity.x > 0 && this.enemy1.body.position.x > 530) {
            this.enemy1.body.velocity.x = -100;
        }
        else if (this.enemy1.body.velocity.x < 0 && this.enemy1.body.position.x < 130) {
            this.enemy1.body.velocity.x = 100;
        }

        if (this.enemy2.body.velocity.x > 0 && this.enemy2.body.position.x > 750) {
            this.enemy2.body.velocity.x = -100;
        }
        else if (this.enemy2.body.velocity.x < 0 && this.enemy2.body.position.x < 550) {
            this.enemy2.body.velocity.x = 100;
        }
 
        // Baarimikko ilmestyy kun kaikki kerätty
        if (this.score == 5 && !this.allPoints) {
            this.allPoints = true;
            this.bartender.enableBody(true, 725, 900, true, true);
        }        

        // Timer
        if (!this.timerIsStopped && !this.timerIsRunning) {
            this.timerIsRunning = true;
            this.timerInterval = setInterval(() => {
                this.timer += 0.01;
                this.timerText.setText(Math.round(this.timer*100)/100);
                if (this.timerIsStopped) {
                    return;
                }
            }, 10);
        }

        if (this.timerIsRunning && this.timerIsStopped) {
            clearInterval(this.timerInterval)
        }

        if (this.cursors.space.isDown) {
            this.restart()
        }

        if (this.cursors.shift.isDown) {
            this.exitToLevel();
        }


    }
}

// Level 2 - Palmas
class Level2 extends Phaser.Scene {

    constructor() {
        super("Level2");
        this.score = 0;
        this.allPoints = false;
        this.isPaused = false;
        this.timerIsStopped = false;
        this.timerIsRunning = false
        this.timer = 0.0;
        this.timerInterval;
    }

    preload() {
        // Image files
        this.load.image("top_bar", "assets/sprites/top_bar.png");
        this.load.image("platform_80", "assets/platforms/white_160x32.png");
        this.load.image("bg_palmas", "assets/backgrounds/palmas.png");
        this.load.image("star", "assets/sprites/shot_glass_50.png");
        this.load.spritesheet("dude", "assets/sprites/dude.png", {frameWidth: 50, frameHeight: 100})
        this.load.spritesheet("bartender", "assets/sprites/bartender.png", {frameWidth: 50, frameHeight: 100})
        this.load.spritesheet("enemy", "assets/sprites/enemy.png", {frameWidth: 50, frameHeight: 100})

        // Music files
        this.load.audio("music", "assets/audio/music.mp3")
        this.load.audio("fail", "assets/audio/fail.mp3")
        this.load.audio("victory", "assets/audio/victory.mp3")
        this.load.audio("collect", "assets/audio/collect.mp3")
    }

    create() {

        // Setting background
        this.background = this.physics.add.sprite
        (400,500,'bg_palmas');

        this.music = this.sound.add("music");
        this.music.play();

        this.victorySound = this.sound.add("victory");
        this.failSound = this.sound.add("fail");
        this.collectSound = this.sound.add("collect");

        
        this.add.image(400,40,"top_bar");

        // Header
        this.add.text(this.cameras.main.centerX -100, this.cameras.main.centerY - 490, '2 - Palmas', { fill: '#ffffff', fontSize: "50px", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10})

        // Generating dude
        this.dude = this.physics.add.sprite(760, 900, "dude");
        this.dude.body.gravity.y = gameOptions.dudeGravity;

        this.bartender = this.physics.add.sprite(700, 900, "bartender");
        this.bartender.body.gravity.y = gameOptions.dudeGravity;
        this.bartender.disableBody(true,true);

        this.enemyGroup = this.physics.add.group({})

        this.enemy1 = this.enemyGroup.create(500,325,"enemy")
        this.enemy1.body.velocity.x = 100;
        this.enemy1.body.gravity.y = gameOptions.dudeGravity;

        this.enemy2 = this.enemyGroup.create(200,525,"enemy")
        this.enemy2.body.velocity.x = 100;
        this.enemy2.body.gravity.y = gameOptions.dudeGravity;
    
        this.enemy3 = this.enemyGroup.create(200,900,"enemy")
        this.enemy3.body.velocity.x = 100;
        this.enemy3.body.gravity.y = gameOptions.dudeGravity;

        this.hasStarted = true;

        this.groundGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        })

        this.starGroup = this.physics.add.group({});
        this.physics.add.collider(this.starGroup, this.groundGroup);
        this.physics.add.collider(this.bartender, this.groundGroup);
        this.physics.add.collider(this.enemyGroup, this.groundGroup);

        this.physics.add.overlap(this.dude, this.starGroup, this.collectStar, null, this);

        this.physics.add.overlap(this.dude, this.enemyGroup, this.die, null, this);

        this.physics.add.overlap(this.dude, this.bartender, this.getStamped, null, this);


        // Generating ground
        for(let i = 0; i < 7; i++) {
            this.groundGroup.create(i*160, game.config.height- 10, "platform_80");
        }

        // Platform generation (non-active)
        this.groundGroup.create(-30, 800, "platform_80")
        this.groundGroup.create(230, 800, "platform_80")
        this.groundGroup.create(230, 650, "platform_80")
        this.groundGroup.create(70, 650, "platform_80")
        this.groundGroup.create(700, 700, "platform_80")
        this.groundGroup.create(500, 400, "platform_80")
        this.movingPlatform = this.groundGroup.create(800, 500, "platform_80")
        this.movingPlatform.body.velocity.x = 60;
        this.groundGroup.create(700, 700, "platform_80")
        this.groundGroup.create(100, 300, "platform_80")

        this.groundGroup.create(500, 900, "platform_80").setRotation(3.14/2).setSize(32,160)


        // Spawning stars
        this.starGroup.create(100, 800, "star")
        this.starGroup.create(400, 940, "star")
        this.starGroup.create(700, 650, "star")
        this.starGroup.create(40, 600, "star")
        this.starGroup.create(450, 350, "star")


        // Dude-ground collision
        this.physics.add.collider(this.dude, this.groundGroup);


        // Scoreboard
        this.add.image(40,40, "star");
        this.scoreText = this.add.text(70, 16, "0", {fontSize: "40px", fill: "#FFFFFF", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10}, );
        this.add.text(500, 80, "SPACE = RESTART\nSHIFT = MENU", {fontSize: "40px", fill: "#FFFFFF", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10}, );

        this.timerText = this.add.text(680, 16, "0.00", {fontSize: "40px", fill: "#FFFFFF", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10}, );

        this.cursors = this.input.keyboard.createCursorKeys();


    }

    collectStar(dude, star) {

        this.collectSound.play();

        star.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText(this.score);
    }

    restart() {
        this.scene.start("Level2");
        this.music.stop()
        this.score = 0;
        this.allPoints = false;
        this.timer = 0.00;
        this.isPaused = false;
        this.timerIsRunning = false;
        this.timerIsStopped = false;
        clearInterval(this.timerInterval);

    }

    getStamped(dude, bartender) {

        if (!levelScores[1] || this.timer < levelScores[1]) {
            levelScores[1] = Math.round(100*this.timer) / 100;
        }

        this.victorySound.play();
        
        this.timerIsStopped = true;
        this.timerIsRunning = true;
        dude.disableBody(true, true);
        this.add.text(this.cameras.main.centerX -150, this.cameras.main.centerY, 'You Won! Epic!\nFinal time: '+ Math.round(100*this.timer)/100, { fill: '#0f0', fontSize: "50px", fontFamily: "Calibri" })
        const levelButton = this.add.text(this.cameras.main.centerX -150, this.cameras.main.centerY+100, 'Back to level selector', { fill: '#0f0', fontSize: "50px", fontFamily: "Calibri" })
        levelButton.setInteractive()
        levelButton.on('pointerdown', () => {this.exitToLevel()});
        
    }

    exitToLevel() {
        this.victorySound.stop();
        this.music.stop();
        this.score = 0;
        this.allPoints = false;
        this.timer = 0.00;
        this.isPaused = false;
        this.timerIsRunning = false;
        this.timerIsStopped = false;
        clearInterval(this.timerInterval);
        this.scene.start("LevelSelector");
    }

    die(dude, enemy) {

        this.failSound.play();

        dude.disableBody(true, true);
        const helloButton = this.add.text(this.cameras.main.centerX -150, this.cameras.main.centerY, 'Guard threw you out\nTry again?', { fill: '#0f0', fontSize: "50px", fontFamily: "Calibri" })
        helloButton.setInteractive()
        helloButton.on('pointerdown', () => {this.restart()});
    }

    pause_game() {
        this.isPaused = true;

    }

    update() {
        if(this.cursors.left.isDown && this.dude.body.position.x > 0) {
            this.dude.body.velocity.x = -gameOptions.dudeSpeed;
        }
        else if(this.cursors.right.isDown && this.dude.body.position.x < 760) {
            this.dude.body.velocity.x = gameOptions.dudeSpeed;
        }
        else {
            this.dude.body.velocity.x = 0;
        }

        if(this.cursors.up.isDown && !isSingleJumping) {
            if (this.dude.body.touching.down) {
                isSingleJumping = true
                isDoubleJumping = false;
                this.dude.body.velocity.y = -gameOptions.dudeGravity / 1.6;
            }
            else if (!isDoubleJumping) {
                isDoubleJumping = true;
                this.dude.body.velocity.y = -gameOptions.dudeGravity / 2.4;
            }
        }

        if (!this.cursors.up.isDown) {
            isSingleJumping = false;
        }

        if (this.dude.body.velocity.y == 0) {
            isSingleJumping = false;
            isDoubleJumping = false;
        }

        // Moving platform
        if (this.movingPlatform.body.velocity.x > 0 && this.movingPlatform.body.position.x > 800) {
            this.movingPlatform.body.velocity.x = -80;
        }
        else if (this.movingPlatform.body.velocity.x < 0 && this.movingPlatform.body.position.x < 700) {
            this.movingPlatform.body.velocity.x = 80;
        }

        // Vihollisen liikkeet
        if (this.enemy1.body.velocity.x > 0 && this.enemy1.body.position.x > 530) {
            this.enemy1.body.velocity.x = -100;
        }
        else if (this.enemy1.body.velocity.x < 0 && this.enemy1.body.position.x < 420) {
            this.enemy1.body.velocity.x = 100;
        }

        if (this.enemy2.body.velocity.x > 0 && this.enemy2.body.position.x > 250) {
            this.enemy2.body.velocity.x = -100;
        }
        else if (this.enemy2.body.velocity.x < 0 && this.enemy2.body.position.x < 0) {
            this.enemy2.body.velocity.x = 100;
        }

        if (this.enemy3.body.velocity.x > 0 && this.enemy3.body.position.x > 400) {
            this.enemy3.body.velocity.x = -100;
        }
        else if (this.enemy3.body.velocity.x < 0 && this.enemy3.body.position.x < 0) {
            this.enemy3.body.velocity.x = 100;
        }
        
        // Baarimikko ilmestyy kun kaikki kerätty
        if (this.score == 5 && !this.allPoints) {
            this.allPoints = true;
            this.bartender.enableBody(true, 100, 200, true, true);
        }        

        // Timer
        if (!this.timerIsStopped && !this.timerIsRunning) {
            this.timerIsRunning = true;
            this.timerInterval = setInterval(() => {
                this.timer += 0.01;
                this.timerText.setText(Math.round(this.timer*100)/100);
                if (this.timerIsStopped) {
                    return;
                }
            }, 10);
        }

        if (this.timerIsRunning && this.timerIsStopped) {
            clearInterval(this.timerInterval)
        }

        if (this.cursors.space.isDown) {
            this.restart()
        }

        if (this.cursors.shift.isDown) {
            this.exitToLevel();
        }

    }
}

// Level 3 - Valta
class Level3 extends Phaser.Scene {

    constructor() {
        super("Level3");
        this.score = 0;
        this.allPoints = false;
        this.isPaused = false;
        this.timerIsStopped = false;
        this.timerIsRunning = false
        this.timer = 0.0;
        this.timerInterval;
    }

    preload() {
        this.load.image("top_bar", "assets/sprites/top_bar.png");
        this.load.image("platform_80", "assets/platforms/white_160x32.png");
        this.load.image("bg_valta", "assets/backgrounds/valta.png");
        this.load.image("star", "assets/sprites/shot_glass_50.png");
        this.load.spritesheet("dude", "assets/sprites/dude.png", {frameWidth: 50, frameHeight: 100})
        this.load.spritesheet("bartender", "assets/sprites/bartender.png", {frameWidth: 50, frameHeight: 100})
        this.load.spritesheet("enemy", "assets/sprites/enemy.png", {frameWidth: 50, frameHeight: 100})

        // Music files
        this.load.audio("music", "assets/audio/music.mp3")
        this.load.audio("fail", "assets/audio/fail.mp3")
        this.load.audio("victory", "assets/audio/victory.mp3")
        this.load.audio("collect", "assets/audio/collect.mp3")
    }

    create() {

        // Setting background
        this.background = this.physics.add.sprite
        (400,500,'bg_valta');

        this.music = this.sound.add("music");
        this.music.play();

        this.victorySound = this.sound.add("victory");
        this.failSound = this.sound.add("fail");
        this.collectSound = this.sound.add("collect");
        
        this.add.image(400,40,"top_bar");

        // Header
        this.add.text(this.cameras.main.centerX -100, this.cameras.main.centerY - 490, '3 - Valta', { fill: '#ffffff', fontSize: "50px", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10})

        // Generating dude
        this.dude = this.physics.add.sprite(760, 900, "dude");
        this.dude.body.gravity.y = gameOptions.dudeGravity;

        this.bartender = this.physics.add.sprite(750, 250, "bartender");
        this.bartender.body.gravity.y = gameOptions.dudeGravity;
        this.bartender.disableBody(true,true);

        this.enemyGroup = this.physics.add.group({})

        this.enemy1 = this.enemyGroup.create(500,325,"enemy")
        this.enemy1.body.velocity.x = 100;
        this.enemy1.body.gravity.y = gameOptions.dudeGravity;

        this.enemy2 = this.enemyGroup.create(200,535,"enemy")
        this.enemy2.body.velocity.x = 100;
        this.enemy2.body.gravity.y = gameOptions.dudeGravity;
    
        this.enemy3 = this.enemyGroup.create(200,900,"enemy")
        this.enemy3.body.velocity.x = 100;
        this.enemy3.body.gravity.y = gameOptions.dudeGravity;

        this.hasStarted = true;

        this.groundGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        })

        this.starGroup = this.physics.add.group({});
        this.physics.add.collider(this.starGroup, this.groundGroup);
        this.physics.add.collider(this.bartender, this.groundGroup);
        this.physics.add.collider(this.enemyGroup, this.groundGroup);

        this.physics.add.overlap(this.dude, this.starGroup, this.collectStar, null, this);

        this.physics.add.overlap(this.dude, this.enemyGroup, this.die, null, this);

        this.physics.add.overlap(this.dude, this.bartender, this.getStamped, null, this);


        // Generating ground
        for(let i = 0; i < 7; i++) {
            this.groundGroup.create(i*160, game.config.height- 10, "platform_80");
        }

        // Platform generation (non-active)
        this.groundGroup.create(-30, 800, "platform_80")
        this.groundGroup.create(230, 800, "platform_80")
        this.groundGroup.create(230, 650, "platform_80")
        this.groundGroup.create(70, 650, "platform_80")
        this.groundGroup.create(500, 800, "platform_80")
        this.groundGroup.create(500, 400, "platform_80")
        this.groundGroup.create(800, 700, "platform_80")
        this.groundGroup.create(500, 530, "platform_80")
        this.groundGroup.create(100, 300, "platform_80")
        
        this.groundGroup.create(750, 300, "platform_80")

        this.groundGroup.create(500, 900, "platform_80").setRotation(3.14/2).setSize(32,160)
        this.groundGroup.create(500, 750, "platform_80").setRotation(3.14/2).setSize(32,160)
        this.groundGroup.create(500, 600, "platform_80").setRotation(3.14/2).setSize(32,160)

        this.groundGroup.create(250, 400, "platform_80").setRotation(3.14/2).setSize(32,160)
        this.groundGroup.create(100, 300, "platform_80").setRotation(3.14/2).setSize(32,160)

        // Spawning stars
        this.starGroup.create(100, 800, "star")
        this.starGroup.create(60, 250, "star")
        this.starGroup.create(450, 580, "star")
        this.starGroup.create(40, 600, "star")
        this.starGroup.create(450, 350, "star")


        // Dude-ground collision
        this.physics.add.collider(this.dude, this.groundGroup);


        // Scoreboard
        this.add.image(40,40, "star");
        this.scoreText = this.add.text(70, 16, "0", {fontSize: "40px", fill: "#FFFFFF", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10}, );
        this.add.text(500, 80, "SPACE = RESTART\nSHIFT = MENU", {fontSize: "40px", fill: "#FFFFFF", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10}, );

        this.timerText = this.add.text(680, 16, "0.00", {fontSize: "40px", fill: "#FFFFFF", fontFamily: "Calibri", stroke: "#000000", strokeThickness: 10}, );

        this.cursors = this.input.keyboard.createCursorKeys();


    }

    collectStar(dude, star) {

        this.collectSound.play();

        star.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText(this.score);
    }

    restart() {
        this.scene.start("Level3");
        this.music.stop()
        this.score = 0;
        this.allPoints = false;
        this.timer = 0.00;
        this.isPaused = false;
        this.timerIsRunning = false;
        this.timerIsStopped = false;
        clearInterval(this.timerInterval);

    }

    getStamped(dude, bartender) {

        if (!levelScores[2] || this.timer < levelScores[2]) {
            levelScores[2] = Math.round(100*this.timer) / 100;
        }

        this.victorySound.play();
        
        this.timerIsStopped = true;
        this.timerIsRunning = true;
        dude.disableBody(true, true);
        this.add.text(this.cameras.main.centerX -150, this.cameras.main.centerY, 'You Won! Epic!\nFinal time: '+ Math.round(100*this.timer)/100, { fill: '#0f0', fontSize: "50px", fontFamily: "Calibri" })
        const levelButton = this.add.text(this.cameras.main.centerX -150, this.cameras.main.centerY+100, 'Back to level selector', { fill: '#0f0', fontSize: "50px", fontFamily: "Calibri" })
        levelButton.setInteractive()
        levelButton.on('pointerdown', () => {this.exitToLevel()});
        
    }

    exitToLevel() {
        this.victorySound.stop();
        this.music.stop();
        this.score = 0;
        this.allPoints = false;
        this.timer = 0.00;
        this.isPaused = false;
        this.timerIsRunning = false;
        this.timerIsStopped = false;
        clearInterval(this.timerInterval);
        this.scene.start("LevelSelector");
    }

    die(dude, enemy) {

        this.failSound.play();

        dude.disableBody(true, true);
        const helloButton = this.add.text(this.cameras.main.centerX -150, this.cameras.main.centerY, 'Guard threw you out\nTry again?', { fill: '#0f0', fontSize: "50px", fontFamily: "Calibri" })
        helloButton.setInteractive()
        helloButton.on('pointerdown', () => {this.restart()});
    }

    pause_game() {
        this.isPaused = true;

    }

    update() {
        if(this.cursors.left.isDown && this.dude.body.position.x > 0) {
            this.dude.body.velocity.x = -gameOptions.dudeSpeed;
        }
        else if(this.cursors.right.isDown && this.dude.body.position.x < 760) {
            this.dude.body.velocity.x = gameOptions.dudeSpeed;
        }
        else {
            this.dude.body.velocity.x = 0;
        }

        if(this.cursors.up.isDown && !isSingleJumping) {
            if (this.dude.body.touching.down) {
                isSingleJumping = true
                isDoubleJumping = false;
                this.dude.body.velocity.y = -gameOptions.dudeGravity / 1.6;
            }
            else if (!isDoubleJumping) {
                isDoubleJumping = true;
                this.dude.body.velocity.y = -gameOptions.dudeGravity / 2.4;
            }
        }

        if (!this.cursors.up.isDown) {
            isSingleJumping = false;
        }

        if (this.dude.body.velocity.y == 0) {
            isSingleJumping = false;
            isDoubleJumping = false;
        }

        // Vihollisen liikkeet
        if (this.enemy1.body.velocity.x > 0 && this.enemy1.body.position.x > 530) {
            this.enemy1.body.velocity.x = -100;
        }
        else if (this.enemy1.body.velocity.x < 0 && this.enemy1.body.position.x < 420) {
            this.enemy1.body.velocity.x = 100;
        }

        if (this.enemy2.body.velocity.x > 0 && this.enemy2.body.position.x > 250) {
            this.enemy2.body.velocity.x = -100;
        }
        else if (this.enemy2.body.velocity.x < 0 && this.enemy2.body.position.x < 0) {
            this.enemy2.body.velocity.x = 100;
        }

        if (this.enemy3.body.velocity.x > 0 && this.enemy3.body.position.x > 400) {
            this.enemy3.body.velocity.x = -100;
        }
        else if (this.enemy3.body.velocity.x < 0 && this.enemy3.body.position.x < 0) {
            this.enemy3.body.velocity.x = 100;
        }
        
        // Baarimikko ilmestyy kun kaikki kerätty
        if (this.score == 5 && !this.allPoints) {
            this.allPoints = true;
            this.bartender.enableBody(true, 725, 200, true, true);
        }        

        // Timer
        if (!this.timerIsStopped && !this.timerIsRunning) {
            this.timerIsRunning = true;
            this.timerInterval = setInterval(() => {
                this.timer += 0.01;
                this.timerText.setText(Math.round(this.timer*100)/100);
                if (this.timerIsStopped) {
                    return;
                }
            }, 10);
        }

        if (this.timerIsRunning && this.timerIsStopped) {
            clearInterval(this.timerInterval)
        }

        if (this.cursors.space.isDown) {
            this.restart()
        }

        if (this.cursors.shift.isDown) {
            this.exitToLevel();
        }


    }
}

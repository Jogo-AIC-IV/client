class Game {
    app;
    ticker;
    background;

    constructor(html_dom) {
        this.start(html_dom);
    }

    start = (html_dom) => {
        this.app = new PIXI.Application({
            view: html_dom,
            width: 800,
            height: 600,
            backgroundColor: '0xeeeeee'
        });
        this.ticker = PIXI.Ticker.shared;
        this.ticker.autoStart = true;
        this.ticker.add((time) => {
            this.app.renderer.render(this.app.stage);
        });
        this.background = PIXI.TilingSprite.from('assets/sprites/grass.png');
        this.background.scale.set(0.5);
        this.background.width = 1600;
        this.background.height = 1200;
        this.addOnStage(this.background);
    };

    addOnStage = (object) => {
        this.app.stage.addChild(object);
    }
}

class Player {
    createPlayer(position_x = Math.random()*800, position_y = Math.random()*600) {
        const player = PIXI.Sprite.from('assets/sprites/player.png');
        
        player.scale.set(0.2);

        player.anchor.set(0.5);
        player.x = position_x;
        player.y = position_y;

        player.interactive = true;
        player.buttonMode = true;

        player.shooting_buffer = 0;
        player.bullets = [];


        player
        .on('pointerdown',      onDragStart)
        .on('pointerup',        onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove',      onDragMove)

        player.setTarget = function(game, target){
            if(target){
                this.target = target;
                game.ticker.add((time) => {

                    if(this.shooting_buffer == 0){
                        let bullet = new PIXI.Graphics();
                        bullet.beginFill(0xFFFF00);
                        bullet.drawCircle(this.x, this.y, 5);
                        bullet.endFill();
                        bullet.life = 300;
                        bullet.target = this.target;
                        this.bullets.push(bullet);
                        game.addOnStage(bullet);


                        this.scale.set(0.21);
                        this.shooting_buffer = 50;
                    }else{
                        this.scale.set(0.2);
                        this.shooting_buffer -= 1;
                    }

                    let abs_x = this.x - this.target.x;
                    let abs_y = this.y - this.target.y;
                    let abs_d = Math.sqrt(Math.pow(abs_x, 2) + Math.pow(abs_y, 2));
                    let cos = abs_x / abs_d;
                    let ang = Math.acos(cos);
                    this.rotation = 3 + Math.sign(this.y - this.target.y)*ang;

                    for(let i = 0; i < this.bullets.length; i++){
                        if(this.bullets[i].life <= 0 ){
                            this.bullets[i].destroy();
                            this.bullets.splice(i, 1);
                        }else{
                            this.bullets[i].y -= 20 * Math.sin(ang);
                            this.bullets[i].x -= 20 * Math.cos(ang);
                        }
                    }
                });
            }
        };

        return player;
    }
}

class Enemy {
    createEnemy(position_x = -100, position_y = 50) {
        const enemy = PIXI.Sprite.from('assets/sprites/enemy.png');
        
        enemy.scale.set(0.2);

        enemy.anchor.set(0.5);
        enemy.x = position_x;
        enemy.y = position_y;

        enemy.setDestination = function(game, destination_x = 850, destination_y = 50){
            game.ticker.add((time) =>{
                if(this.x >= destination_x){
                    this.x = -50;
                }else{
                    this.x += 3;
                }
            });
        }

        return enemy;
    }
}


function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
}

function onDragMove() {
    if(this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}


function main() {
    const HTML_DOM = document.getElementById('game');

    const game = new Game(HTML_DOM);
    const player = new Player();
    const ENEMY = new Enemy();

    let enemy = ENEMY.createEnemy();
    game.addOnStage(enemy);
    enemy.setDestination(game);


    let enemy2 = ENEMY.createEnemy();
    game.addOnStage(enemy2);
    enemy2.setDestination(game);
    enemy2.x = -300;

    let i = 0;
    let shooters = [];
    while(i < 4){
        let new_player = player.createPlayer(100 + 150*i, 450);
        let target = i <= 1 ? enemy : enemy2;
        setTimeout(() => {
            new_player.setTarget(game, target);
        }, Math.random()*300);
        shooters.push(new_player);
        game.addOnStage(shooters[i]);
        i++;
    }
}

main();
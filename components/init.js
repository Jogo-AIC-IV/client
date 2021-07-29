class Game {
    app;

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

        player
        .on('pointerdown',      onDragStart)
        .on('pointerup',        onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove',      onDragMove)

        player.setTarget = function(target){
            if(target){
                this.target = target;
                setInterval(() => {
                    let abs_x = this.x - target.x;
                    let abs_y = this.y - target.y;
                    let abs_d = Math.sqrt(Math.pow(abs_x, 2) + Math.pow(abs_y, 2));
                    let cos = abs_x / abs_d;
                    let ang = Math.acos(cos);
                    this.rotation = 3 + Math.sign(this.y - target.y)*ang;
                }, 10); 
            }
        };

        return player;
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

    let i = 0;
    let shooters = [];
    while(i < 5){
        shooters.push(player.createPlayer());
        game.addOnStage(shooters[i]);
        i++;
    }
    while(i >= 0){
        if(i < 5){
            shooters[i].setTarget(shooters[i+1]);
        }
        i--;
    }
}

main();
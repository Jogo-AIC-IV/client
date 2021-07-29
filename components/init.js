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
            backgroundColor: '0xffffff'
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

    const center_position_x = game.app.renderer.width / 2;
    const center_position_y = game.app.renderer.height / 2;

    let i = 10;
    while(i--){
        let new_hero = player.createPlayer();
        game.addOnStage(new_hero);
    }
}

main();
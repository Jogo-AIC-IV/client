class Game {
    app;

    constructor(html_dom) {
        this.start(html_dom);
    }

    start = (html_dom) => {
        this.app = new PIXI.Application({
            view: html_dom,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: '0xffffff'
        });
    };

    addOnStage = (object) => {
        this.app.stage.addChild(object);
    }
}

class Player {
    createPlayer(position_x, position_y) {
        const player = PIXI.Sprite.from('../assets/sprites/player.png');
        player.anchor.set(0.5);
        player.x = position_x;
        player.y = position_y;
        return player;
    }
}

function main() {
    const HTML_DOM = document.getElementById('game');

    const game = new Game(HTML_DOM);
    const player = new Player();

    const center_position_x = game.app.renderer.width / 2;
    const center_position_y = game.app.renderer.height / 2;
    const hero = player.createPlayer(center_position_x, center_position_y);

    game.addOnStage(hero);
}

main();
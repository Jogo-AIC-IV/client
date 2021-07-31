class Game {
    constructor(html_dom){
        this.intialize(html_dom);
    }

    intialize = (html_dom) => {
        // PIXI App
        this.app = new PIXI.Application({
            view: html_dom,
            width: WINDOW_SIZE.width,
            height: WINDOW_SIZE.height,
            backgroundColor: '0xeeeeee'
        });
        // Background
        this.background = PIXI.TilingSprite.from(WINDOW_BACKGROUND);
        this.background.scale.set(0.5);
        this.background.width = WINDOW_SIZE.width*2;
        this.background.height = WINDOW_SIZE.height*2;
        this.addOnStage(this.background);
        // Enemies
        this.enemies = [];
        // Towers
        this.towers = [];
        // Main ticker
        this.ticker = PIXI.Ticker.shared;
        this.ticker.autoStart = true;
        this.ticker.add((time) => {
            this.app.renderer.render(this.app.stage);
            this.towers.forEach((tower) => {
                tower.update(this, this.enemies);
            });
        });
    }

    addOnStage = (object) => {
        this.app.stage.addChild(object);
    }

    addTower = (tower) => {
        this.towers.push(tower); 
        this.addOnStage(tower);
    }

    addEnemy = (enemy) => {
        this.enemies.push(enemy);
        this.addOnStage(enemy);
    }
}
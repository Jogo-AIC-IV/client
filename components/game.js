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
        this.background.width = 1600;
        this.background.height = 1200;
        this.addOnStage(this.background);
        // Enemies
        this.enemies = [];
        // Turrets
        this.turrets = [];
        // Main ticker
        this.ticker = PIXI.Ticker.shared;
        this.ticker.autoStart = true;
        this.ticker.add((time) => {
            this.app.renderer.render(this.app.stage);
            this.turrets.forEach((turret) => {
                turret.update(this, this.enemies);
            });
        });
    }

    addOnStage = (object) => {
        this.app.stage.addChild(object);
    }

    addTurret = (turret) => {
        this.turrets.push(turret); 
        this.addOnStage(turret);
    }

    addEnemy = (enemy) => {
        this.enemies.push(enemy);
        this.addOnStage(enemy);
    }
}
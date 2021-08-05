/*
Estrutura que vem da API

match = [
    {
        money: 100,
        unit_price: 100,
        enemies: [
            {
                color:      [255, 255, 255],
                life:       6,
                position:   {
                    x: 400,
                    y: 400
                }
            },
            ...
        ],
        towers:  {
            types: [
                {
                    color: [255, 255, 255],
                    range: 500,
                    bullets: {
                        color:          [255, 255, 255],
                        size:           10,
                        speed:          10,
                        damage:         1,
                        buffer_curr:    0,
                        buffer_max:     50
                    }
                },
                ...
            ],
            list: [
                {
                    id:         123,
                    tier:       1,
                    type:       0,
                    position:   {
                        x:      400,
                        y:      400,
                        angle:  0,
                    },
                },
                ...
            ],
            total_tier: 1
        }
    }
]

*/

class Game {
    app;
    background;
    enemies;
    towers;
    ticker;
    total_tier;

    constructor(html_dom){
        this.intialize(html_dom);
    }

    intialize = (html_dom) => {
        // PIXI App
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.app = new PIXI.Application({
            view: html_dom,
            width: 500,
            height: 250,
            backgroundColor: '0xeeeeee'
        });

        this.app.loader.baseUrl = "assets/sprites"
        this.app.loader
            .add("archer_0", "archer_0.png")
            .add("archer_1", "archer_1.png")
            .add("archer_2", "archer_2.png")
            .add("archer_3", "archer_3.png")
            .add("warrior_0", "warrior_0.png")
            .add("warrior_1", "warrior_1.png")
            .add("warrior_2", "warrior_2.png")
            .add("warrior_3", "warrior_3.png")
            .add("lancer_0", "lancer_0.png")
            .add("lancer_1", "lancer_1.png")
            .add("lancer_2", "lancer_2.png")
            .add("lancer_3", "lancer_3.png")
        this.app.loader.load();

        // Background
        this.background = PIXI.TilingSprite.from("assets/sprites/grass.png");
        this.background.width = 250;
        this.background.height = 125;
        this.background.scale.set(2);
        this.addOnStage(this.background);
        this.tower = PIXI.Sprite.from("assets/sprites/tower.png");
        this.tower.x = 400;
        this.tower.y = 100;
        this.tower.scale.set(2);
        this.addOnStage(this.tower);
        // Enemies
        this.enemies = [];
        // Towers
        this.towers = [];
        this.total_tier = 0;
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
        this.total_tier += 0.25;
    }

    addEnemy = (enemy) => {
        this.enemies.push(enemy);
        this.addOnStage(enemy);
    }

    combine = (id_first, id_second) => {
        let id_destroy = this.towers.findIndex((tower) => (tower.hash == id_first));
        let id_upgrade = this.towers.findIndex((tower) => (tower.hash == id_second));
        let destroy    = this.towers[id_destroy];
        let upgrade    = this.towers[id_upgrade];
        if(destroy && upgrade){
            upgrade.bullets.config.damage += 1;
            upgrade.bullets.config.speed += 3;
            upgrade.bullets.buffer_max *= 0.75;
            upgrade.tier += 1;
            this.total_tier += 0.5;

            upgrade.sprite.texture = this.app.loader.resources[`${upgrade.type}_${upgrade.tier}`].texture;
            // upgrade.sprite.scale.set(2);


            for(let i = 0; i < destroy.bullets.list.length; i++ ){
                destroy.bullets.list[i].destroy();
                destroy.bullets.list.splice(i, 1);
            }


            destroy.destroy();
            this.towers.splice(id_destroy, 1);
        }
    }
}
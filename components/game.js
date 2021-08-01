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
        console.log(`Combining ${id_first} & ${id_second}`);
        let id_destroy = this.towers.findIndex((tower) => (tower.hash == id_first));
        let id_upgrade = this.towers.findIndex((tower) => (tower.hash == id_second));
        let destroy    = this.towers[id_destroy];
        let upgrade    = this.towers[id_upgrade];
        console.log(id_destroy);
        console.log(id_upgrade);
        if(destroy && upgrade){
            upgrade.bullets.config.damage += 1;
            upgrade.bullets.config.speed += 3;
            upgrade.bullets.config.size += 1;
            upgrade.bullets.buffer_max *= 0.75;
            upgrade.tier += 1;
            upgrade.sprite.tint = PIXI.utils.rgb2hex(TURRET_COLORS[upgrade.tier]);
            this.total_tier += 0.5;

            for(let i = 0; i < destroy.bullets.list.length; i++ ){
                destroy.bullets.list[i].destroy();
                destroy.bullets.list.splice(i, 1);
            }


            destroy.destroy();
            this.towers.splice(id_destroy, 1);
        }
    }
}
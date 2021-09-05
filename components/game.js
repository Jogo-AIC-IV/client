class Game {
    stage;
    renderer;
    background;
    enemies;
    towers;
    total_tier;
    loader;

    constructor(loader, filters, godray){
        this.intialize(loader, filters, godray);
    }

    destroy = () => {
        this.stage.removeChildren();
        this.stage.destroy(true);
        this.stage = null;
    }

    intialize = (filters, godray) => {
        // PIXI App
        this.stage = new PIXI.Container();
        this.stage.filters = [godray];

        // Background
        this.background = PIXI.Sprite.from("assets/sprites/background.png");
        this.background.width = 512;
        this.background.height = 256;
        this.addOnStage(this.background);
        this.tower = PIXI.Sprite.from("assets/sprites/tower.png");
        this.tower.anchor.set(0.5);
        this.tower.x = 415;
        this.tower.y = 120;
        this.tower.scale.set(2);
        this.addOnStage(this.tower);
        this.tower.filters = filters;
        // Enemies
        this.enemies = [];
        // Towers
        this.towers = [];
        this.total_tier = 0;
    }

    addOnStage = (object) => {
        this.stage.addChild(object);
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

    sortSprites = () => {
        this.stage.children.sort((a, b) => {
            if (a.position.y > b.position.y) return 1;
            if (a.position.y < b.position.y) return -1;
            if (a.position.x > b.position.x) return 1;
            if (a.position.x < b.position.x) return -1;
            return 0;
        });
    }

    combine = (loader, id_first, id_second) => {
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

            upgrade.sprite.texture = loader.resources[`${upgrade.type}_${upgrade.tier}`].texture;
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
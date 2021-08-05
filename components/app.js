const TOWER = new Tower();
const ENEMY = new Enemy();

function fakeAPI(){
    return [
        {
            id:         '123123',
            life:       3,
            money:      30,
            unit_price: 10,
            types: {
                'warrior': {
                    buffer_cur: 0,
                    buffer_max: 50,
                    list:       [],
                    config: {
                        life: 6,
                        size:  2,
                        speed: 20,
                        damage: 2.5,
                        color: 0x555555,
                        range: 70
                    },
                },
                'lancer': {
                    buffer_cur: 0,
                    buffer_max: 60,
                    list:       [],
                    config: {
                        life: 6,
                        size:  2,
                        speed: 20,
                        damage: 2,
                        color: 0xFFFFFF,
                        range: 90
                    },
                },
                'archer' :{
                    buffer_cur: 0,
                    buffer_max: 60,
                    list:       [],
                    config: {
                        life: 300,
                        size:  2,
                        speed: 15,
                        damage: 1,
                        color: 0x664400,
                        range: 150
                    },
                }
            },
        },
        {
            id:         '456456',
            life:       3,
            money:      30,
            unit_price: 10,
            types: {
                'warrior': {
                    buffer_cur: 0,
                    buffer_max: 50,
                    list:       [],
                    config: {
                        life: 6,
                        size:  2,
                        speed: 20,
                        damage: 2.5,
                        color: 0x555555,
                        range: 70
                    },
                },
                'lancer': {
                    buffer_cur: 0,
                    buffer_max: 60,
                    list:       [],
                    config: {
                        life: 6,
                        size:  2,
                        speed: 20,
                        damage: 2,
                        color: 0xFFFFFF,
                        range: 90
                    },
                },
                'archer' :{
                    buffer_cur: 0,
                    buffer_max: 60,
                    list:       [],
                    config: {
                        life: 300,
                        size:  2,
                        speed: 15,
                        damage: 1,
                        color: 0x664400,
                        range: 150
                    },
                }
            },
        }
    ];
}

var app = new Vue({
    el: '#app',
    data() {
        return {
            player_id: '123123',
            player_match_id: -1,
            oponent_match_id: -1,
            in_match: false,
            match: [
                {
                    id:         '123123',
                    life:       3,
                    money:      30,
                    unit_price: 10,
                    types: {
                        'warrior': {
                            buffer_cur: 0,
                            buffer_max: 50,
                            list:       [],
                            config: {
                                life: 6,
                                size:  2,
                                speed: 20,
                                damage: 2.5,
                                color: 0x555555,
                                range: 70
                            },
                        },
                        'lancer': {
                            buffer_cur: 0,
                            buffer_max: 60,
                            list:       [],
                            config: {
                                life: 6,
                                size:  2,
                                speed: 20,
                                damage: 2,
                                color: 0xFFFFFF,
                                range: 90
                            },
                        },
                        'archer' :{
                            buffer_cur: 0,
                            buffer_max: 60,
                            list:       [],
                            config: {
                                life: 300,
                                size:  2,
                                speed: 15,
                                damage: 1,
                                color: 0x664400,
                                range: 150
                            },
                        }
                    },
                },
                {
                    id:         '456456',
                    life:       3,
                    money:      30,
                    unit_price: 10,
                    types: {
                        'warrior': {
                            buffer_cur: 0,
                            buffer_max: 50,
                            list:       [],
                            config: {
                                life: 6,
                                size:  2,
                                speed: 20,
                                damage: 2.5,
                                color: 0x555555,
                                range: 70
                            },
                        },
                        'lancer': {
                            buffer_cur: 0,
                            buffer_max: 60,
                            list:       [],
                            config: {
                                life: 6,
                                size:  2,
                                speed: 20,
                                damage: 2,
                                color: 0xFFFFFF,
                                range: 90
                            },
                        },
                        'archer' :{
                            buffer_cur: 0,
                            buffer_max: 60,
                            list:       [],
                            config: {
                                life: 300,
                                size:  2,
                                speed: 15,
                                damage: 1,
                                color: 0x664400,
                                range: 150
                            },
                        }
                    },
                }
            ],

            tower_types: {
                'warrior': {
                    buffer_cur: 0,
                    buffer_max: 50,
                    list:       [],
                    config: {
                        life: 6,
                        size:  2,
                        speed: 20,
                        damage: 2.5,
                        color: 0x555555,
                        range: 70
                    },
                },
                'lancer': {
                    buffer_cur: 0,
                    buffer_max: 60,
                    list:       [],
                    config: {
                        life: 6,
                        size:  2,
                        speed: 20,
                        damage: 2,
                        color: 0xFFFFFF,
                        range: 90
                    },
                },
                'archer' :{
                    buffer_cur: 0,
                    buffer_max: 60,
                    list:       [],
                    config: {
                        life: 300,
                        size:  2,
                        speed: 15,
                        damage: 1,
                        color: 0x664400,
                        range: 150
                    },
                }
            },
            pixi: {
                player:     {},
                oponent:    {}
            },
            pixi_loader: {},
            sprites_loaded: [],
            pixi_initialized: false
        }
    },
    mounted() {
        // this.in_match = true;
    },
    methods: {
        loadPixi(){
            // Carregando sprites
            this.pixi_loader = PIXI.Loader.shared;
            this.pixi_loader.baseUrl = "assets/sprites"

            this.match.forEach((m) => {
                Object.keys(m.types).forEach((type_name) => {
                    if(!this.sprites_loaded.includes(type_name)){
                        this.pixi_loader.add(`${type_name}_0`, `${type_name}_0.png`);
                        this.pixi_loader.add(`${type_name}_1`, `${type_name}_1.png`);
                        this.pixi_loader.add(`${type_name}_2`, `${type_name}_2.png`);
                        this.pixi_loader.add(`${type_name}_3`, `${type_name}_3.png`);
                        this.sprites_loaded.push(type_name);
                    }
                });
            });

            this.pixi_loader.load(this.initializePixi);
        },
        initializePixi() {
            // Inicializando Pixi
            this.player_match_id = this.match.findIndex((match) => { return match.id == this.player_id; });
            this.oponent_match_id = this.match.findIndex((match) => { return match.id != this.player_id; });

            let player_match = this.match[this.player_match_id];
            let oponent_match = this.match[this.oponent_match_id];

            let paths_top = [{x: -100, y:50}, {x: 440, y: 50}, {x: 440, y: 100}];
            let paths_bot = [{x: -100, y:200}, {x: 440, y: 200}, {x: 440, y: 150}];

            // Setting player Canvas
            this.pixi.player = new Game(this.$refs.canvas_player);
            this.pixi.oponent = new Game(this.$refs.canvas_oponent);

            let enemy_top_player = ENEMY.createEnemy({x: -100, y: 50}, 6);
            let enemy_bot_player = ENEMY.createEnemy({x: -100, y: 50}, 6);
            let enemy_top_oponent = ENEMY.createEnemy({x: -100, y: 50}, 6);
            let enemy_bot_oponent = ENEMY.createEnemy({x: -100, y: 50}, 6);

            enemy_top_player.setComplexPath(this.pixi.player, paths_top, 1, () => {this.enemyCompletePath(player_match)}, () => {this.enemyDie(oponent_match)} );
            enemy_bot_player.setComplexPath(this.pixi.player, paths_bot, 1, () => {this.enemyCompletePath(player_match)}, () => {this.enemyDie(oponent_match)} );

            this.pixi.player.addEnemy(enemy_top_player);
            this.pixi.player.addEnemy(enemy_bot_player);

            enemy_top_oponent.setComplexPath(this.pixi.oponent, paths_top, 1, () => {this.enemyCompletePath(oponent_match)}, () => {this.enemyDie(player_match)} );
            enemy_bot_oponent.setComplexPath(this.pixi.oponent, paths_bot, 1, () => {this.enemyCompletePath(oponent_match)}, () => {this.enemyDie(player_match)} );

            this.pixi.oponent.addEnemy(enemy_top_oponent);
            this.pixi.oponent.addEnemy(enemy_bot_oponent);

            this.pixi_initialized = true;
        },
        enemyCompletePath(match){
            match.life -= 0.5;
        },
        enemyDie(match){
            let other = this.match.find((m) => (m != match));
            other.money += 10;
            let pixi = match.id == this.player_id ? this.pixi.player : this.pixi.oponent;

            let paths_top = [{x: -100, y:50}, {x: 440, y: 50}, {x: 440, y: 100}];
            let paths_bot = [{x: -100, y:200}, {x: 440, y: 200}, {x: 440, y: 150}];
            let path = Math.random() > 0.5 ? paths_bot : paths_top;

            console.log(`MatchId = ${match.id} / PlayerId = ${this.player_match_id}`);
            console.log(pixi.towers.map((t) => (t.type)));

            let new_enemy = ENEMY.createEnemy({x: -100, y: 50}, 6);
            new_enemy.setComplexPath(pixi, path, 1, () => {this.enemyCompletePath(match)}, () => {this.enemyDie(other)} );
            pixi.addEnemy(new_enemy);
        },
        buyRandomUnit() {
            if(!this.pixi_initialized) { return; }

            let money = this.match[this.player_match_id].money;
            let price = this.match[this.player_match_id].unit_price;
            if(money >= price){
                let tower_types = this.match[this.player_match_id].types;
                let types = Object.keys(tower_types);
                let type = types[Math.floor(Math.random() * types.length)];
                let config = tower_types[type];
                let tower = TOWER.createTower(this.pixi.player, type, {x: 50+Math.random()*400, y: 50+Math.random()*150}, config);
                this.pixi.player.addTower(tower);
                this.match[this.player_match_id].money -= price;
                this.match[this.player_match_id].unit_price *= 1.5;

                let tower_types_enemy = this.match.find((m) => (m.id != this.player_id)).types;
                let types_enemy = Object.keys(tower_types_enemy);
                let type_enemy = types[Math.floor(Math.random() * types_enemy.length)];
                let config_enemy = tower_types_enemy[type_enemy];
                let tower_enemy = TOWER.createTower(this.pixi.oponent, type_enemy, {x: 50+Math.random()*400, y: 50+Math.random()*150}, config_enemy);
                this.pixi.oponent.addTower(tower_enemy);
            }

        }
    },
    watch: {
        in_match() {
            if(this.in_match){
                this.match = fakeAPI();
                setTimeout(this.loadPixi, 50);
            }else{
                this.pixi.player.app.stage.destroy({children: true, texture: true, baseTexture: true});
                this.pixi.oponent.app.stage.destroy({children: true, texture: true, baseTexture: true});
            }
        }
    }
  })
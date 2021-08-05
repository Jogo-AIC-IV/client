const TOWER = new Tower();
const ENEMY = new Enemy();

var app = new Vue({
    el: '#app',
    data() {
        return {
            player_id: '123123',
            player_match: -1,
            in_match: false,
            match: [
                {
                    id:         '123123',
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
            pixi_initialized: false
        }
    },
    mounted() {
        // this.in_match = true;
    },
    methods: {
        loadPixi(){
            if(this.pixi_initialized) { return this.initializePixi(); }
            // Carregando sprites
            this.pixi_loader = PIXI.Loader.shared;
            this.pixi_loader.baseUrl = "assets/sprites"
            this.pixi_loader
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
            .add("lancer_3", "lancer_3.png");
            this.pixi_loader.load(this.initializePixi);
        },
        initializePixi() {
            // Inicializando Pixi
            this.player_match = this.match.findIndex((match) => { return match.id == this.player_id; });

            let paths_top = [{x: -100, y:50}, {x: 440, y: 50}, {x: 440, y: 100}];
            let paths_bot = [{x: -100, y:200}, {x: 440, y: 200}, {x: 440, y: 100}];

            // Setting player Canvas
            this.pixi.player = new Game(this.$refs.canvas_player);

            let enemy_top_player = ENEMY.createEnemy({x: -100, y: 50}, 6);
            let enemy_bot_player = ENEMY.createEnemy({x: -100, y: 50}, 6);
            enemy_top_player.setComplexPath(this.pixi.player, paths_top, 1, () => {}, () => {});
            enemy_bot_player.setComplexPath(this.pixi.player, paths_bot, 1, () => {}, () => {});

            this.pixi.player.addEnemy(enemy_top_player);
            this.pixi.player.addEnemy(enemy_bot_player);


            // Setting opnent Canvas
            this.pixi.oponent = new Game(this.$refs.canvas_oponent);

            let enemy_top_oponent = ENEMY.createEnemy({x: -100, y: 50}, 6);
            let enemy_bot_oponent = ENEMY.createEnemy({x: -100, y: 50}, 6);
            enemy_top_oponent.setComplexPath(this.pixi.oponent, paths_top, 1, () => {}, () => {});
            enemy_bot_oponent.setComplexPath(this.pixi.oponent, paths_bot, 1, () => {}, () => {});

            this.pixi.oponent.addEnemy(enemy_top_oponent);
            this.pixi.oponent.addEnemy(enemy_bot_oponent);
            this.pixi_initialized = true;
        },
        buyRandomUnit() {
            if(!this.pixi_initialized) { return; }
            let tower_types = this.match[this.player_match].types;
            let types = Object.keys(tower_types);
            let type = types[Math.floor(Math.random() * types.length)];
            let config = tower_types[type];
            let tower = TOWER.createTower(this.pixi.player, type, {x: 50+Math.random()*400, y: 50+Math.random()*150}, config);
            this.pixi.player.addTower(tower);
        }
    },
    watch: {
        in_match() {
            setTimeout(this.loadPixi, 50);
        }
    }
  })
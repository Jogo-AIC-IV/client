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
            // Player data
            player_id:          '123123',
            // Match data
            match:              fakeAPI(),
            in_match:           false,
            player_match_id:    -1,
            oponent_match_id:   -1,
            // Pixi data
            pixi_tower:         new Tower(),
            pixi: {
                loaded_resources:   [],
                godray:     new PIXI.filters.GodrayFilter(),
                filters:    [new PIXI.filters.OutlineFilter(1.8, 0x000000)],
                loaded:     false,
                ticker:     new PIXI.Ticker(),
                loader:     new PIXI.Loader(),
                player:     {
                    renderer:   new PIXI.Renderer({
                        width:  500,
                        height: 250,
                        backgroundColor: 0xeeeeee
                    }),
                    game:      null
                },
                oponent:      {
                    renderer:   new PIXI.Renderer({
                        width:  500,
                        height: 250,
                        backgroundColor: 0xeeeeee
                    }),
                    game:      null
                },
            }
        }
    },
    created() {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.loadPixi();
    },
    methods: {
        loadPixi(){
            this.pixi.loader = new PIXI.Loader();

            // Carregando sprites
            this.pixi.loader.baseUrl = "assets/sprites"

            if(!this.pixi.loaded_resources.includes('enemy')){
                this.pixi.loader.add('enemy', 'enemy.png');
                this.pixi.loaded_resources.push('enemy');
            }

            this.match.forEach((m) => {
                Object.keys(m.types).forEach((type_name) => {
                    if(!this.pixi.loaded_resources.includes(type_name)){
                        this.pixi.loader.add(`${type_name}_0`, `${type_name}_0.png`);
                        this.pixi.loader.add(`${type_name}_1`, `${type_name}_1.png`);
                        this.pixi.loader.add(`${type_name}_2`, `${type_name}_2.png`);
                        this.pixi.loader.add(`${type_name}_3`, `${type_name}_3.png`);
                        this.pixi.loaded_resources.push(type_name);
                    }
                });
            });

            this.pixi.loader.load(() => {
                this.pixi.loaded = true;
            });
        },
        initializePixi() {
            this.player_match_id = this.match.findIndex((m) => (m.id == this.player_id));
            this.oponent_match_id = this.match.findIndex((m) => (m.id != this.player_id));

            this.pixi.player.game = new Game(this.pixi.filters, this.pixi.godray);
            this.pixi.oponent.game = new Game(this.pixi.filters, this.pixi.godray);

            this.pixi.ticker.add((time) => {
                this.pixi.godray.time += 0.01;
                // Player stage
                let player_renderer = this.pixi.player.renderer;
                let player_game = this.pixi.player.game;
                if(player_game.stage) {
                    player_game.sortSprites();
                    player_game.towers.forEach((tower) => {
                        tower.update(player_game.stage, player_game.stage.enemies)
                    })
                    player_renderer.render(player_game.stage);
                }
                // Oponent stage
                let oponent_renderer = this.pixi.oponent.renderer;
                let oponent_game = this.pixi.oponent.game;
                if(oponent_game.stage) {
                    oponent_game.sortSprites();
                    oponent_game.towers.forEach((tower) => {
                        tower.update(oponent_game.stage, oponent_game.stage.enemies)
                    })
                    oponent_renderer.render(oponent_game.stage);
                }
            });

            console.log(this.$refs.canvas_player);
            this.$refs.canvas_player.appendChild(this.pixi.player.renderer.view);
            this.$refs.canvas_oponent.appendChild(this.pixi.oponent.renderer.view);
            this.pixi.ticker.start();
        },
        enemyCompletePath(match){
        },
        enemyDie(match){
        },
        buyRandomUnit() {
            let types       = this.match[this.player_match_id].types;
            let types_name  = Object.keys(types);
            let type_name   = types_name[Math.floor(Math.random() * types_name.length)];
            let type        = types[type_name];
            let x = 50 + Math.random() * 200;
            let y = 50 + Math.random() * 75;
            let new_tower = this.pixi_tower.createTower(this.pixi.loader, this.pixi.filters, this.pixi.player.game, type_name, {x: x, y: y}, type);
            this.pixi.player.game.addTower(new_tower);
        },
        addTower(data) {
            let match = data.player_id == this.player_id ? this.match[this.player_match_id] : this.match[this.oponent_match_id];
            let pixi = data.player_id == this.player_id ? this.pixi.player : this.pixi.oponent;
            let tower_type = match.types[data.tower_type];
            let position = data.position;
            let tower = this.pixi_tower.createTower(this.pixi.loader, this.pixi.filters, pixi.game, data.tower_type, position, tower_type);
            pixi.game.addTower(tower);
        }
    },
    watch: {
        in_match() {
            if(this.in_match){
                this.match = fakeAPI();
                setTimeout(this.initializePixi, 50);
            }else{
                this.pixi.player.game.destroy();
                this.pixi.oponent.game.destroy();
            }
        }
    }
})
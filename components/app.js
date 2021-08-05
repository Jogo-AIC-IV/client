const TOWER = new Tower();
const ENEMY = new Enemy();

var app = new Vue({
    el: '#app',
    data() {
        return {
            in_match: false,
            tower_types: {
                'warrior': {
                    buffer_cur: 0,
                    buffer_max: 50,
                    list:       [],
                    config: {
                        life: 6,
                        size:  10,
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
                        size:  8,
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
                        size:  5,
                        speed: 15,
                        damage: 1,
                        color: 0x664400,
                        range: 150
                    },
                }
            },
            pixi: {},
            pixi_initialized: false
        }
    },
    mounted() {
        // this.in_match = true;
    },
    methods: {
        initializePixi() {
            this.pixi = new Game(this.$refs.canvas);
            let paths = [{x: -100, y:50}, {x: 440, y: 50}, {x: 440, y:430}];
            let enemy = ENEMY.createEnemy({x: -100, y: 50}, 6);
            enemy.setComplexPath(this.pixi, paths, 1, () => {}, () => {});
            this.pixi.addEnemy(enemy);
            this.pixi_initialized = true;
        },
        buyRandomUnit() {
            if(!this.pixi_initialized) { return; }
            let types = Object.keys(this.tower_types);
            let type = types[Math.floor(Math.random() * types.length)];
            let config = this.tower_types[type];
            let tower = TOWER.createTower(this.pixi, type, {x: 50+Math.random()*400, y: 50+Math.random()*400}, config);
            this.pixi.addTower(tower);
        }
    },
    watch: {
        in_match() {
            setTimeout(this.initializePixi, 50);
        }
    }
  })
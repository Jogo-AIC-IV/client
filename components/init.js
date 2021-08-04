const WINDOW_SIZE       = { width: 800, height: 800 };
const WINDOW_BACKGROUND = 'assets/sprites/grass.png';
const TURRET_SPRITES    = [
    'assets/sprites/archer_0.png',
    'assets/sprites/archer_1.png',
    'assets/sprites/archer_2.png',
    'assets/sprites/archer_3.png',
];
const TURRET_COLORS     = [
    [1,     1,      1],
    [1,     1,      .5],
    [1,     .5,      1],
    [1,     .5,      .5],
    [.5,     1,      1],
    [.5,     1,      .5],
    [.5,     .5,      1],
    [.5,     .5,      .5],
]
const TOWER_SPRITE      = 'assets/sprites/tower.png';
const ENEMY_SPRITE      = 'assets/sprites/enemy.png';

const HTML_DOM  = document.getElementById('game');
const TURRET    = new Tower();
const ENEMY     = new Enemy();
const game      = new Game(HTML_DOM);

const PATH = [{x:100, y:100}, {x:700, y:100}, {x:600, y:400}, {x:100, y:400}, {x:100, y:700}, {x:800, y:700}];

let money       = 10900;
let enemy_value = 2;
let enemy_factor = .5;
let money_counter = document.querySelector("#money_counter");
let unit_price  = 5;
let unit_factor = 1.45;
let unit_price_counter = document.querySelectorAll("#unit_price_counter");
let damage_price = 1000;
let damage_factor = 10;
let damage_price_counter = document.querySelector("#damage_price_counter");

function treat_number(number){
    sufix = '';
    while(number > 1000){
        sufix += 'K';
        number = number/1000;
    }
    return number.toFixed(2) + sufix;
}

damage_price_counter.innerHTML = 'R$' + treat_number(damage_price);
unit_price_counter.innerHTML = 'R$' + treat_number(unit_price);
money_counter.innerHTML = treat_number(money);

function buyUnit(type){
    if(money >= unit_price){
        money -= unit_price;
        let tower = TURRET.createTower(game, type, {x: Math.random()*800, y: Math.random()*800}, 300);
        game.addTower(tower);
        unit_price *= unit_factor;
        unit_price_counter.forEach((counter) => counter.innerHTML = 'R$' + treat_number(unit_price));
        money_counter.innerHTML = treat_number(money);
    }
}

function buyDamage(){
    if(money >= damage_price){
        money -= damage_price;
        damage_price *= damage_factor;
        damage_price = damage_price.toFixed();
        damage_price_counter.innerHTML = 'R$' + treat_number(damage_price);
        money_counter.innerHTML = treat_number(money);

        game.towers.forEach((tower) => {
            tower.bullets.config.damage += 1;
        });
    }
}

function enemyDie() {
    money += enemy_value;
    money = Math.ceil(money);
    enemy_value = enemy_value + enemy_factor;
    money_counter.innerHTML = treat_number(money);
    console.log(game.total_tier);
    if(game.enemies.length * 1.65 <= game.total_tier){
        let new_emeny = ENEMY.createEnemy({x: 500, y: 600}, 6);
        new_emeny.setComplexPath(game, [{x:Math.random()*-200, y:100}, {x:600, y:100}, {x:600, y:400}, {x:100, y:400}, {x:100, y:600}, {x:800, y:600}], 3, null, enemyDie);
        new_emeny.rotation = Math.PI/2;
        game.addEnemy(new_emeny);
    }
}

function main() {

    for(let i = 0; i < 1; i++) {
        let enemy = ENEMY.createEnemy({x: 500, y: 600}, 6);
        // enemy.setLinearLoop(game, {x: 400, y: i*-100}, {x:400 , y:900}, 3, null, () => {
        //     money += 100;
        //     money_counter.innerHTML = money;
        // });
        enemy.setComplexPath(game, [{x:i*-100, y:100}, {x:600, y:100}, {x:600, y:400}, {x:100, y:400}, {x:100, y:600}, {x:800, y:600}], 3, null, enemyDie);
        enemy.rotation = +Math.PI/2;
        game.addEnemy(enemy);
    }
}

main();
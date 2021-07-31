const WINDOW_SIZE       = { width: 800, height: 800 };
const WINDOW_BACKGROUND = 'assets/sprites/grass.png';
const TURRET_SPRITE     = 'assets/sprites/player.png';
const ENEMY_SPRITE      = 'assets/sprites/enemy.png';

const HTML_DOM  = document.getElementById('game');
const TURRET    = new Tower();
const ENEMY     = new Enemy();
const game      = new Game(HTML_DOM);

const PATH = [{x:100, y:100}, {x:700, y:100}, {x:600, y:400}, {x:100, y:400}, {x:100, y:700}, {x:800, y:700}];

let money       = 50;
let enemy_value = 50;
let money_counter = document.querySelector("#money_counter");
let unit_price  = 50;
let unit_price_counter = document.querySelector("#unit_price_counter");
let damage_price = 10000;
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

function buyUnit(){
    if(money >= unit_price){
        money -= unit_price;
        let tower = TURRET.createTower({x: Math.random()*800, y: Math.random()*800}, 300);
        game.addTower(tower);
        unit_price *= 2.5;
        unit_price_counter.innerHTML = 'R$' + treat_number(unit_price);
        money_counter.innerHTML = treat_number(money);
    }
}

function buyDamage(){
    if(money >= damage_price){
        money -= damage_price;
        damage_price *= 10;
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
    enemy_value = enemy_value * 1.025;
    money_counter.innerHTML = money;
    if(game.enemies.length * 1.4 < game.towers.length){
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
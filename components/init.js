const WINDOW_SIZE       = { width: 800, height: 800 };
const WINDOW_BACKGROUND = 'assets/sprites/grass.png';
const TURRET_SPRITE     = 'assets/sprites/player.png';
const ENEMY_SPRITE      = 'assets/sprites/enemy.png';

const HTML_DOM  = document.getElementById('game');
const TURRET    = new Tower();
const ENEMY     = new Enemy();
const game      = new Game(HTML_DOM);

let money       = 300;
let money_counter = document.querySelector("#money_counter");
let price  = 200;
let price_counter = document.querySelector("#price_counter");

function buyUnit(){
    if(money >= price){
        money -= price;
        let tower = TURRET.createTower({x: Math.random()*800, y: Math.random()*800}, 300);
        game.addTower(tower);
        price *= 1.25;
        price = price.toFixed();
        price_counter.innerHTML = 'R$' + price;
        money_counter.innerHTML = money;
    }
}

function main() {

    for(let i = 0; i < 10; i++) {
        let enemy = ENEMY.createEnemy({x: 500, y: 600}, 3);
        enemy.setLinearLoop(game, {x: 400, y: i*-100}, {x:400 , y:900}, 3, null, () => {
            money += 100;
            money_counter.innerHTML = money;
        });
        enemy.rotation = +Math.PI/2;
        game.addEnemy(enemy);
    }
}

main();
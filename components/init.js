const WINDOW_SIZE       = { width: 800, height: 600 };
const WINDOW_BACKGROUND = 'assets/sprites/grass.png';
const TURRET_SPRITE     = 'assets/sprites/player.png';
const ENEMY_SPRITE      = 'assets/sprites/enemy.png';

function main() {
    const HTML_DOM  = document.getElementById('game');
    const TURRET    = new Turret();
    const ENEMY     = new Enemy();
    const game      = new Game(HTML_DOM);

    for(let i = 0; i < 4; i++){
        game.addTurret(TURRET.createTurret({x: 100+i*100, y: 200}, 900));
        let enemy = ENEMY.createEnemy({x: 100, y: 0});
        enemy.setLinearLoop(game, {x: i*100-800, y: 100}, {x: 900, y:0}, 3);
        game.addEnemy(enemy);
    }
}

main();
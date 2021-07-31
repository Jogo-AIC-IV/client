const BULLETS_CONFIG = {
    buffer_cur: 0,
    buffer_max: 50,
    list:       [],
    config: {
        size:  7,
        speed: 10,
        damage: 1
    },
};

class Turret {
    createTurret(position, range) {

        // Range
        const sprite_range  = new PIXI.Graphics();
        sprite_range.beginFill(0x000000);
        sprite_range.drawCircle(0, 0, range);
        sprite_range.endFill();
        sprite_range.alpha = 0;

        // Main Sprite
        const sprite        = new PIXI.Sprite.from(TURRET_SPRITE);
        sprite.anchor.set(0.5);
        sprite.scale.set(0.2);
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.on('pointerdown',    function(event) {
            sprite_range.alpha  = 0.5;
            this.dragging       = true;
            this.data           = event.data;
        }).on('pointerup',          function() {
            sprite_range.alpha  = 0;
            this.dragging       = false;
            this.data           = null;
        }).on('pointerupoutside',   function() {
            sprite_range.alpha  = 0;
            this.dragging       = false;
            this.data           = null;
        }).on('pointermove',        function() {
            if(this.dragging) {
                const new_position = this.data.getLocalPosition(this.parent.parent);
                this.parent.x = new_position.x;
                this.parent.y = new_position.y;
            }
        }).on('pointermoveinside', function() {
            console.log('oie');
        })

        // Main Container
        const container     = new PIXI.Container();
        container.x         = position.x;
        container.y         = position.y;
        container.addChild(sprite_range);
        container.addChild(sprite);
        container.hash = (Math.random() * 999999).toFixed();

        // Config
        container.target    = -1;
        container.range     = range;

        // Bullets
        container.bullets   = Object.assign({}, BULLETS_CONFIG);

        container.findEnemy = function(enemies) {
            this.target = enemies.findIndex((enemy) => {
                let distance = Math.sqrt( Math.pow((this.x - enemy.x), 2) + Math.pow((this.y - enemy.y), 2));
                return distance <= this.range;
            });
        } 

        container.newBullet = function(app) {
            let bullet = new PIXI.Graphics();
            bullet.beginFill(0xFFFF00);
            bullet.drawCircle(0, 0, this.bullets.config.size);
            bullet.endFill();
            bullet.position.set(this.x, this.y);
            bullet.life     = 300;
            bullet.target   = JSON.parse(JSON.stringify(this.target));
            this.bullets.list.push(bullet);
            app.addOnStage(bullet);
        }

        container.updateBullets = function(app) {
            for(let i = 0; i < this.bullets.list.length; i++){
                let bullet = this.bullets.list[i];

                let enemy  = app.enemies[bullet.target];
                if(!enemy || bullet.life <= 0 ){
                    bullet.destroy();
                    this.bullets.list.splice(i, 1);
                    return;
                }

                if((Math.abs(enemy.x - bullet.x) < 10 && Math.abs(enemy.y - bullet.y) < 10 )) {
                    enemy.life_curr -= this.bullets.config.damage;
                    bullet.destroy();
                    this.bullets.list.splice(i, 1);
                    return;
                }

                let dist_x = bullet.position.x - enemy.x;
                let dist_y = bullet.position.y - enemy.y;
                let dist_t  = Math.sqrt(Math.pow(dist_x, 2) + Math.pow(dist_y, 2));
                let ang     = Math.PI + Math.acos(dist_x/dist_t) * Math.sign(dist_y);

                let off_x = Math.cos(ang) * this.bullets.config.speed;
                let off_y = Math.sin(ang) * this.bullets.config.speed;

                bullet.position.set(bullet.position.x + off_x, bullet.position.y + off_y);
                bullet.life -= 1;
            }
        }

        container.update = function(app, enemies) {
            this.updateBullets(app);
            if(this.target != 0 && (!this.target || this.target == -1)) { return this.findEnemy(enemies); }

            let enemy   = enemies[this.target];
            let dist_x  = this.x - enemy.x;
            let dist_y  = this.y - enemy.y;
            let dist_t  = Math.sqrt( Math.pow(dist_x, 2) + Math.pow(dist_y, 2));
            let ang     = 3 + Math.acos(dist_x/dist_t) * Math.sign(dist_y);
            if(dist_t <= this.range) { 
                sprite.rotation = ang;
            }

            if(this.bullets.buffer_cur <= 0 && dist_t <= this.range){
                this.newBullet(app);
                this.bullets.buffer_cur = this.bullets.buffer_max;
            }else{
                this.bullets.buffer_cur -= 1;
            }
            

            if(dist_t >= this.range) { 
                this.target = -1;
            }
        }

        return container;
    }
}
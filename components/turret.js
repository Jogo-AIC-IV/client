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
        })

        // Main Container
        const container     = new PIXI.Container();
        container.x         = position.x;
        container.y         = position.y;
        container.addChild(sprite_range);
        container.addChild(sprite);
        container.scale.set(0.2);

        // Config
        container.target    = -1;
        container.range     = range;

        // Bullets
        container.bullets   = {
            buffer_cur: 0,
            buffer_max: 50,
            list:       [],
            config: {
                size:  10,
                speed: 40,
                damage: 1
            },
        };

        container.findEnemy = function(enemies) {
            this.target = enemies.find((enemy) => {
                let distance = Math.sqrt( Math.pow((this.x - enemy.x), 2) + Math.pow((this.y - enemy.y), 2));
                return distance <= this.range*0.2;
            });
        } 

        container.newBullet = function(app) {
            let bullet = new PIXI.Graphics();
            bullet.beginFill(0xFFFF00);
            bullet.drawCircle(this.x, this.y, this.bullets.config.size);
            bullet.endFill();
            bullet.life     = 300;
            bullet.target   = this.target;
            this.bullets.list.push(bullet);
            app.addOnStage(bullet);
        }

        container.update = function(app, enemies) {
            if(!this.target || this.target == -1) { return this.findEnemy(enemies); }
            let enemy   = this.target;
            let dist_x  = this.x - enemy.x;
            let dist_y  = this.y - enemy.y;
            let dist_t  = Math.sqrt( Math.pow(dist_x, 2) + Math.pow(dist_y, 2));
            let ang     = 3 + Math.acos(dist_x/dist_t) * Math.sign(dist_y);
            if(dist_t <= this.range * 0.2) { 
                this.rotation = ang;
            }

            if(this.bullets.buffer_cur <= 0 && dist_t <= this.range * 0.2){
                this.newBullet(app);
                this.bullets.buffer_cur = this.bullets.buffer_max;
            }else{
                this.bullets.buffer_cur -= 1;
            }
            

            for(let i = 0; i < this.bullets.list.length; i++){
                if(this.bullets.list[i].life <= 0 ){
                    this.bullets.list[i].destroy();
                    this.bullets.list.splice(i, 1);
                }else{
                    this.bullets.list[i].y += this.bullets.config.speed * Math.sin(ang);
                    this.bullets.list[i].x += this.bullets.config.speed * Math.cos(ang);
                }
            }

            if(dist_t >= this.range * 0.2) { 
                this.target = -1;
            }
        }

        return container;
    }
}
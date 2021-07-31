class Enemy {
    createEnemy(position, life) {
        const sprite = PIXI.Sprite.from(ENEMY_SPRITE);
        sprite.anchor.set(0.5);
        sprite.scale.set(0.2);
        sprite.x = position.x;
        sprite.y = position.y;
        sprite.life_max = life;
        sprite.life_curr = life;

        sprite.setLinearLoop = function(game, position_start, position_end, speed, callback_success = null, callback_died = null) {
            this.x = position_start.x;
            this.y = position_start.y;

            game.ticker.add((time) => {
                this.x += Math.sign(position_end.x - this.x) * speed;
                this.y += Math.sign(position_end.y - this.y) * speed;

                this.x = (this.x >= position_end.x) ? position_start.x : this.x;
                this.y = (this.y >= position_end.y) ? position_start.y : this.y;

                if(this.life_curr != this.life_max){
                    let tint_factor = this.life_curr/this.life_max;
                    this.tint = PIXI.utils.rgb2hex([1, tint_factor - 1, tint_factor - 1]);
                }else{
                    this.tint = PIXI.utils.rgb2hex([1, 1, 1]);
                }

                
                if(this.life_curr <= 0){
                    this.life_curr = this.life_max;
                    this.x = position_start.x;
                    this.y = position_start.y;
                    if(typeof callback_died === 'function') { callback_died(); }
                    return;
                }

                if(this.x == position_start.x && this.y == position_start.y){
                    this.life_curr = this.life_max;
                    if(typeof callback_success === 'function') { callback_success(); }
                }

            });
        }

        sprite.setComplexPath = function(game, paths, speed, callback_success = null, callback_died = null) {
            this.current_path = 0;
            this.x = paths[this.current_path].x;
            this.y = paths[this.current_path].y;

            game.ticker.add((time) => {
                let position_start = paths[this.current_path];
                let position_end = paths[this.current_path < paths.length - 1 ? this.current_path + 1 : 0];

                if(this.current_path + 1 == paths.length){
                    this.x = position_end.x;
                    this.y = position_end.y;
                    this.life_curr = this.life_max;
                }

                this.x += Math.sign(position_end.x - this.x) * speed;
                this.y += Math.sign(position_end.y - this.y) * speed;

                if(Math.abs(this.x - position_end.x) <= speed && Math.abs(this.y - position_end.y) <= speed){
                    this.x = position_start.x;
                    this.y = position_start.y;
                }

                if(this.life_curr != this.life_max){
                    let tint_factor = this.life_curr/this.life_max;
                    this.tint = PIXI.utils.rgb2hex([1, tint_factor - 1, tint_factor - 1]);
                }else{
                    this.tint = PIXI.utils.rgb2hex([1, 1, 1]);
                }

                
                if(this.life_curr <= 0){
                    this.life_curr = this.life_max;
                    this.current_path = 0;
                    this.x = paths[0].x;
                    this.y = paths[0].y;
                    if(typeof callback_died === 'function') { callback_died(); }
                    return;
                }

                if(this.x == position_start.x && this.y == position_start.y){
                    this.current_path = this.current_path < paths.length - 1 ? this.current_path + 1 : 0;
                    this.x = paths[this.current_path].x;
                    this.y = paths[this.current_path].y;
                    if(typeof callback_success === 'function') { callback_success(); }
                }

            });
        }



        return sprite;
    }
}
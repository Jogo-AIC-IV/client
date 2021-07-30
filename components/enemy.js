class Enemy {
    createEnemy(position) {
        const sprite = PIXI.Sprite.from(ENEMY_SPRITE);
        sprite.anchor.set(0.5);
        sprite.scale.set(0.2);
        sprite.x = position.x;
        sprite.y = position.y;

        sprite.setLinearLoop = function(game, position_start, position_end, speed) {
            this.x = position_start.x;
            this.y = position_start.y;

            game.ticker.add((time) => {
                this.x = this.x > position_end.x ? position_start.x : this.x += speed;
                this.y = this.y > position_end.y ? position_start.y : this.y += speed;
            });
        }

        return sprite;
    }
}
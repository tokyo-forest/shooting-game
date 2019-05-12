import Sprite = PIXI.Sprite;
import {Entity} from "./Entity";

/**
 * 画面に表示される実態を表す.
 */
export default class Bullet implements Entity{
    sprite: PIXI.Sprite;
    vx: number;
    vy: number;
    disable: boolean;

    constructor(sprite: PIXI.Sprite) {
        this.sprite = sprite;
        this.vx = 0;
        this.vy = 0;
        this.disable = false;
    }

    play(): void {
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;

        // 画面表示外判定
        if(this.sprite.y < 20) {
            this.disable = true;
            console.log('bullet disabled')
        }
    }
}

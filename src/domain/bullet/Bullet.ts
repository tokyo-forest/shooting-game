import Sprite = PIXI.Sprite;
import {Entity} from "../entity/Entity";

/**
 * 弾の抽象クラス
 */
export default abstract class Bullet extends Entity{
    constructor(sprite: PIXI.Sprite, radius: number) {
        super(sprite, radius);
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

    // 衝突時は消える
    collided() {
        this.disable = true;
    }
}

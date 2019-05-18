import Sprite = PIXI.Sprite;
import Bullet from "./Bullet";

/**
 * 敵の弾の実装クラス
 */
export default class EnemyBullet extends Bullet{
    // 半径
    static RADIUS: number = 10;

    constructor(sprite: Sprite) {
        super(sprite, EnemyBullet.RADIUS);
    }

    play(): void {
        super.play()
    }
}

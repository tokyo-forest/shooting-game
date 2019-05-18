import Sprite = PIXI.Sprite;
import Bullet from "./Bullet";

/**
 * 味方の弾の実装クラス
 */
export default class MyBullet extends Bullet{
    // 半径
    static RADIUS: number = 10;

    constructor(sprite: Sprite) {
        super(sprite, MyBullet.RADIUS);
    }

    play(): void {
        super.play()
    }
}

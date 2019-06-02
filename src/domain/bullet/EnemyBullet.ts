import Sprite = PIXI.Sprite;
import Bullet from "./Bullet";
import {DamageValue} from "../damage/Damage";

/**
 * 敵の弾の実装クラス
 */
export default class EnemyBullet extends Bullet{
    // 半径
    static RADIUS: number = 10;

    constructor(sprite: Sprite) {
        super(sprite, EnemyBullet.RADIUS);
    }

    bulletDamage(): DamageValue {
        return new DamageValue(1);
    }

    play(): void {
        super.play()
    }
}

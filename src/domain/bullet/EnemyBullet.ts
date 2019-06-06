import Bullet from "./Bullet";
import DamageValue from "../valueObject/DamageValue";

/**
 * 敵の弾の実装クラス
 */
export default class EnemyBullet extends Bullet{
    // 半径
    static RADIUS: number = 10;

    constructor() {
        super(EnemyBullet.RADIUS);
    }

    bulletDamage(): DamageValue {
        return new DamageValue(1);
    }

    play(): void {
        super.play()
    }
}

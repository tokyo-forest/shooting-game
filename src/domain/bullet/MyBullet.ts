import Bullet from "./Bullet";
import DamageValue from "../valueObject/DamageValue";

/**
 * 味方の弾の実装クラス
 */
export default class MyBullet extends Bullet{
    // 半径
    static RADIUS: number = 10;

    constructor() {
        super(MyBullet.RADIUS);
    }

    bulletDamage(): DamageValue {
        return new DamageValue(1);
    }

    play(): void {
        super.play()
    }
}

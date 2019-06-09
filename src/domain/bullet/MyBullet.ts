import Bullet from "./Bullet";
import DamageValue from "../valueObject/DamageValue";
import {Camp} from "../valueObject/Camp";

/**
 * 味方の弾の実装クラス
 */
export default class MyBullet extends Bullet {
    // 半径
    static RADIUS: number = 10;
    camp = Camp.FAMILY;

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

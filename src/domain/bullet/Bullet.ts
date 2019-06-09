import { Entity } from "../entity/Entity";
import DamageValue from "../valueObject/DamageValue";

/**
 * 弾の抽象クラス
 */
export default abstract class Bullet extends Entity {
    constructor(radius: number) {
        super(radius);
    }

    //TODO 弾の実装クラスはここを実装すること
    abstract bulletDamage(): DamageValue;

    play(): void {
        this.position1.x += this.velocity.vx;
        this.position1.y += this.velocity.vy;
    }

    collided(entity: Entity): void {
        super.collided(entity);
        this.disable = true;
    }

    // 相手に与えるダメージを定義する
    defineDamage(): DamageValue {
        return this.bulletDamage();
    }
}

import Sprite = PIXI.Sprite;
import {Entity} from "../entity/Entity";
import {ICollisionObject} from "../collision/Collision";
import {DamageValue} from "../damage/Damage";

/**
 * 弾の抽象クラス
 */
export default abstract class Bullet extends Entity{
    constructor(sprite: PIXI.Sprite, radius: number) {
        super(sprite, radius);
    }

    //TODO 弾の実装クラスはここを実装すること
    abstract bulletDamage(): DamageValue;

    play(): void {
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;
    }

    collided(collisionObject: ICollisionObject): void {
        super.collided(collisionObject);
        this.disable = true;
    }

    // 相手に与えるダメージを定義する
    defineDamage(): DamageValue {
        return this.bulletDamage();
    }
}

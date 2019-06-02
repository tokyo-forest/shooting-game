import Position from "../valueObject/Position"
import IDamage from "../damage/IDamave";
import DamageValue from "../valueObject/DamageValue";

/**
 * 衝突時の振る舞いを定義するIF.
 */
export interface ICollisionObject extends IDamage{
    damageList: Array<DamageValue>
    radius: number
    // 衝突時の振る舞いを定義
    collided(collisionObject: ICollisionObject):void;
    position(): Position
}

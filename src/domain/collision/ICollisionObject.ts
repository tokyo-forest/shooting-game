import Position from "../valueObject/Position"
import { Entity } from "../entity/Entity";

/**
 * 衝突時の振る舞いを定義するIF.
 */
export interface ICollisionObject {
    // 衝突時の振る舞いを定義
    collided(entity: Entity):void;
    position(): Position
}

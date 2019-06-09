import Position from "../valueObject/Position"
import { Entity } from "../entity/Entity";

/**
 * 衝突判定を行う
 */
export default class Collision {
    /**
     * 衝突判定を行い、衝突時のイベントを呼ぶ
     */
    static determine(obj1: Entity, obj2: Entity): boolean {
        const pos1: Position = obj1.position();
        const pos2: Position = obj2.position();

        const totalRadius = obj1.radius + obj2.radius;

        if((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2 < totalRadius ** 2) {
            obj1.collided(obj2);
            obj2.collided(obj1);
            return true;
        }
        return false;
    }

}
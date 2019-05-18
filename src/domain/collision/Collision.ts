// TODO 場所移動
export class Position {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

// TODO 場所移動
export interface ICollisionObject {
    radius: number
    // 衝突時の振る舞いを定義
    collided():void;
    position(): Position
}

/**
 * 衝突判定を行う
 */
export default class Collision {
    /**
     * 衝突判定を行い、衝突時のイベントを呼ぶ
     */
    determine(obj1: ICollisionObject, obj2: ICollisionObject): boolean {
        const pos1: Position = obj1.position();
        const pos2: Position = obj2.position();

        const totalRadius = obj1.radius + obj2.radius;

        if((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2 < totalRadius ** 2) {
            obj1.collided();
            obj2.collided();
            return true;
        }
        return false;
    }


}
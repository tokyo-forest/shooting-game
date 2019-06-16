/**
 * 壁の衝突判定を行う
 */
import Position from "../valueObject/Position"
import {ICollisionObject} from "./ICollisionObject";

/**
 * 壁に衝突したときの振る舞いを定義する
 */
export interface IWallCollision extends ICollisionObject {
    collidedWallUp(): void;
    collidedWallLeft(): void;
    collidedWallRight(): void;
    collidedWallDown(): void;
}

export default class WallCollision {
    // 上
    private up: number;
    // 左端
    private left: number;
    // 右端
    private right: number;
    // 下
    private down: number;

    constructor(upperLeft: Position, lowerRight: Position) {
        this.up = upperLeft.y;
        this.left = upperLeft.x;
        this.right = lowerRight.x;
        this.down = lowerRight.y;
    }

    /**
     * 壁との衝突判定
     */
    determine(obj: IWallCollision): boolean {
        // 画面表示外判定
        let position: Position = obj.position();
        if (position.y < this.up) {
            // 上部との衝突判定
            obj.collidedWallUp();
            return true;
        } else if (position.x < this.left) {
            // 左側との衝突判定
            obj.collidedWallLeft();
            return true;
        } else if (position.x > this.right) {
            // 右側との衝突判定
            obj.collidedWallRight();
            return true;
        } else if (position.y > this.down) {
            // 下側との衝突判定
            obj.collidedWallDown();
            return true;
        }
        return false;
    }

    /**
     * 右下の座標の値を更新する.
     * @param lowerRight 右下座標
     */
    updateLowerRight(lowerRight: Position) {
        this.right = lowerRight.x;
        this.down = lowerRight.y;
    }
}

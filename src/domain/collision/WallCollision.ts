/**
 * 弾の衝突判定を行う
 */
import {ICollisionObject, Position} from "./Collision";

export default class WallCollision {

    /**
     * 画面との衝突判定
     */
    determine(obj: ICollisionObject): boolean {
        // 画面表示外判定
        // TODO 20のマジックナンバーは別クラスで持つ
        let position: Position = obj.position();
        if(position.y < 20) {
            obj.collided();
            return true;
        }
        return false;
    }


}
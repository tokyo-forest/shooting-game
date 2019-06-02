import Position from "./Position"

/**
 * 壁を表現する値オブジェクト.
 */
export default class Wall {
    // 左上の座標
    private upperLeft: Position;
    // 右下の座標
    private lowerRight: Position;

    constructor(upperLeft: Position, lowarRight: Position) {
        this.upperLeft = upperLeft;
        this.lowerRight = lowarRight;
    }

    /**
     * 壁の中にpositionが存在するかどうかを判定する.
     *
     * @param position 座標情報
     */
    public isIn(position: Position): boolean {
        // TODO 判定処理の実装
        return false;
    }
}

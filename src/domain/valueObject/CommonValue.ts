import Position from "./Position"

/**
 * 画面間での値の受け渡しが必要なパラメータ群.
 */
export default class CommonValue {
    score: number;

    windowSize: Position;

    constructor(score: number, windowSize: Position) {
        this.score = score;
        this.windowSize = windowSize;
    }
}
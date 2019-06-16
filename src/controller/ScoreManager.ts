/**
 * スコア表示を管理するマネージャクラス.
 */
import ScoreView from "./view/ScoreView";
import PixiAdapter from "./PixiAdapter";
import CommonValue from "../domain/valueObject/CommonValue";

export default class ScoreManager {
    private scoreView: ScoreView;

    /**
     * スコアを含む情報
     */
    private commonValue: CommonValue;

    constructor(pixiAdapter: PixiAdapter, commonValue: CommonValue) {
        this.scoreView = new ScoreView(pixiAdapter);
        this.commonValue = commonValue;
    }

    /**
     * スコアを更新する.
     *
     * @param diffScore スコア差分
     */
    public updateScore(diffScore: number) {
        this.commonValue.score += diffScore;
        this.scoreView.refreshScore(this.commonValue.score);
    }
}
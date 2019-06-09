/**
 * スコア表示を管理するマネージャクラス.
 */
import ScoreView from "./view/ScoreView";
import PixiAdapter from "./PixiAdapter";

export default class ScoreManager {
    /**
     * スコア.
     */
    private score: number;

    private scoreView: ScoreView;

    constructor(pixiAdapter: PixiAdapter) {
        this.scoreView = new ScoreView(pixiAdapter);
        this.score = 0;
    }

    /**
     * スコアを更新する.
     *
     * @param diffScore スコア差分
     */
    public updateScore(diffScore: number) {
        this.score += diffScore;
        this.scoreView.refreshScore(this.score);
    }
}
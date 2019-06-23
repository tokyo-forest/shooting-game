import * as PIXI from 'pixi.js'
import PixiAdapter from "../PixiAdapter";
import Position from "../../domain/valueObject/Position"

/**
 * スコア表示用のオブジェクト.
 * ここでは表示処理のみを持ち、スコア管理機能の責務は持たない.
 */
export default class ScoreView {
    private textSprite: PIXI.Text;

    constructor(pixiAdapter: PixiAdapter, position: Position) {

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: '24pt',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        this.textSprite = new PIXI.Text(this.formatScoreText(0), style);
        this.textSprite.x = position.x - 200;
        this.textSprite.y = 20;

        pixiAdapter.addChildSprite(this.textSprite);
    }

    /**
     * 表示させる文字列を更新する.
     * @param score スコア
     */
    public refreshScore(score: number): void {
        this.textSprite.text = this.formatScoreText(score);
    }

    /**
     * 画面に表示する文字を作成する.
     * @param score スコア
     */
    private formatScoreText(score: number): string {
        return score + "点"
    }
}
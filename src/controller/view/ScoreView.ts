import * as PIXI from 'pixi.js'
import PixiAdapter from "../PixiAdapter";

/**
 * スコア表示用のオブジェクト.
 * ここでは表示処理のみを持ち、スコア管理機能の責務は持たない.
 */
export default class ScoreView {
    private textSprite: PIXI.Text;

    constructor(pixiAdapter: PixiAdapter) {

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
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

        this.textSprite = new PIXI.Text("", style);
        this.textSprite.x = 400;
        this.textSprite.y = 20;

        pixiAdapter.addChildSprite(this.textSprite);
    }

    /**
     * 表示させる文字列を更新する.
     */
    public refreshScore(score: number) {
        this.textSprite.text = score + "点";
    }
}
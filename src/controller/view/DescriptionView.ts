import * as PIXI from 'pixi.js'
import PixiAdapter from "../PixiAdapter";
import Position from "../../domain/valueObject/Position"

/**
 * 説明文表示用のオブジェクト
 */
export default class DescriptionView {
    private textSprite: PIXI.Text;

    constructor(pixiAdapter: PixiAdapter, title: string, position: Position) {

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

        this.textSprite = new PIXI.Text(title, style);
        this.textSprite.x = position.x;
        this.textSprite.y = position.y;

        pixiAdapter.addChildSprite(this.textSprite);
    }
}
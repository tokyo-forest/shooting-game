import BaseScene from "./BaseScene";
import PixiAdapter from "../PixiAdapter";
import {TickerStore} from "../SceneManager";
import {SceneStatus} from "./SceneStatus";

export default class GameOverScene implements BaseScene {
    tickerStore: TickerStore;

    constructor() {
        this.tickerStore = new TickerStore(SceneStatus.GAMEOVER);
    }

    create(app: PIXI.Application, gamePixiAdapter: PixiAdapter) {
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

        let textSprite: PIXI.Text;
        textSprite = new PIXI.Text("gameover", style);
        textSprite.x = 20;
        textSprite.y = 20;

        gamePixiAdapter.addChildSprite(textSprite);

    }

    destroy(): void {
    }

    getTickerStore(): TickerStore {
        return this.tickerStore;
    }
}
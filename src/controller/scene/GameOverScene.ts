import * as PIXI from 'pixi.js'
import BaseScene from "./BaseScene";
import PixiAdapter from "../PixiAdapter";
import {TickerStore} from "../SceneManager";
import {SceneStatus} from "./SceneStatus";
import KeyboardManager from "../../common/KeyboardManager";
import CommonValue from "../../domain/valueObject/CommonValue";
import ScoreView from "../view/ScoreView";
import InteractionData = PIXI.interaction.InteractionData;

export default class GameOverScene implements BaseScene {
    tickerStore: TickerStore;
    app: PIXI.Application;
    gamePixiAdapter: PixiAdapter;
    keyboardManager: KeyboardManager;
    move: boolean;
    commonValue: CommonValue;

    constructor(app: PIXI.Application, gamePixiAdapter: PixiAdapter, commonValue: CommonValue) {
        this.tickerStore = new TickerStore(SceneStatus.GAMEOVER);
        this.app = app;
        this.gamePixiAdapter = gamePixiAdapter;
        this.keyboardManager = new KeyboardManager();
        this.move = false;
        this.commonValue = commonValue;
    }

    create() {
        this.move = false;
        this.keyboardManager = new KeyboardManager();
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

        this.gamePixiAdapter.addChildSprite(textSprite);

        this.keyboardManager.space.pushPressHandler((event: any) => {
            this.move = true;
        });

        // touchイベントの制御
        if (PIXI.utils.isMobile.any === true) {
            const windowSize = this.commonValue.windowSize;
            const hitArea = new PIXI.Rectangle(0, 0, windowSize.x, windowSize.y);
            const dummy = new PIXI.Graphics();
            dummy.interactive = true;
            dummy.buttonMode = true;
            dummy.hitArea = hitArea;
            this.gamePixiAdapter.addChildSprite(dummy);
            let touchOut = (event: any) => {
                const inter: InteractionData = event.data;
                inter.getLocalPosition(dummy);
                this.move = true;
            };
            dummy.on('touchstart', touchOut);
        }

        // スコア表示させる.
        let scoreView = new ScoreView(this.gamePixiAdapter, this.commonValue.windowSize);
        scoreView.refreshScore(this.commonValue.score);

        this.gamePixiAdapter.showContainer();
    }

    destroy(): void {
        this.gamePixiAdapter.hideContainer();
        this.gamePixiAdapter.removeChildren();
        this.commonValue.score = 0;
    }

    getTickerStore(): TickerStore {
        return this.tickerStore;
    }

    nextScene(): SceneStatus {
        if (this.move === true) {
            return SceneStatus.TOP;
        }
        return SceneStatus.GAMEOVER;
    }
}